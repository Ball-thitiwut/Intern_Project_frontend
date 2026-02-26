<template>
  <div class="w-full h-full relative">
    <div
      v-if="normalizedPeriod === '1m' && hasForecastData"
      class="absolute top-0 right-0 z-10 flex bg-slate-100 p-0.5 md:p-1 rounded-md md:rounded-lg gap-1"
    >
      <button
        @click="toggleSeries(0)"
        class="flex items-center gap-1 md:gap-2 px-2 py-1 md:px-3 md:py-1.5 rounded-md text-[10px] md:text-xs font-medium transition-all duration-200"
        :class="
          seriesVisibility[0]
            ? 'bg-[#F47122] text-white shadow-sm'
            : 'text-slate-400 hover:bg-slate-200'
        "
      >
        <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
        {{ $t("sales_chart.series.actual") }}
      </button>

      <button
        @click="toggleSeries(1)"
        class="flex items-center gap-1 md:gap-2 px-2 py-1 md:px-3 md:py-1.5 rounded-md text-[10px] md:text-xs font-medium transition-all duration-200"
        :class="
          seriesVisibility[1]
            ? 'bg-[#3b82f6] text-white shadow-sm'
            : 'text-slate-400 hover:bg-slate-200'
        "
      >
        <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
        {{ $t("sales_chart.series.forecast") }}
      </button>
    </div>

    <Line
      ref="chartRef"
      v-if="chartData.labels.length > 0"
      :data="chartData"
      :options="chartOptions"
    />

    <div
      v-else
      class="flex items-center justify-center h-full text-gray-400 font-sans"
    >
      {{ $t("sales_chart.no_data") }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import { useI18n } from "vue-i18n";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

ChartJS.defaults.font.family = "'Prompt', 'Kanit', 'Sarabun', sans-serif";
ChartJS.defaults.color = "#64748b";

const props = defineProps({
  data: { type: Array, default: () => [] },
  forecast: { type: Array, default: () => [] },
  period: { type: String, default: "1m" },
});

const { t } = useI18n();
const chartRef = ref(null);
const seriesVisibility = ref([true, true]);
const windowWidth = ref(window.innerWidth);

// ตรวจจับขนาดหน้าจอเพื่อแยก UI Mobile/Desktop
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", updateWidth);
  nextTick(() => {
    if (
      chartRef.value &&
      chartRef.value.chart &&
      processedData.value.actualValues?.length > 0
    ) {
      const chart = chartRef.value.chart;
      const actualSalesData = processedData.value.actualValues;

      const validData = actualSalesData.map((v) =>
        v === null || v === undefined ? -Infinity : v,
      );
      const maxVal = Math.max(...validData);
      const maxIndex = validData.indexOf(maxVal);

      if (
        maxIndex !== -1 &&
        maxVal > -Infinity &&
        chart.data.datasets[0]?.data[maxIndex] !== undefined
      ) {
        chart.setActiveElements([{ datasetIndex: 0, index: maxIndex }]);
        chart.tooltip.setActiveElements([{ datasetIndex: 0, index: maxIndex }]);
        chart.update();
      }
    }
  });
});

onUnmounted(() => window.removeEventListener("resize", updateWidth));

const isMobile = computed(() => windowWidth.value < 768);

const toggleSeries = (index) => {
  seriesVisibility.value[index] = !seriesVisibility.value[index];
  if (chartRef.value && chartRef.value.chart) {
    chartRef.value.chart.setDatasetVisibility(
      index,
      seriesVisibility.value[index],
    );
    chartRef.value.chart.update();
  }
};

// เพิ่ม Watcher เพื่อดักจับตอนเปลี่ยนช่วงเวลา
watch(
  () => props.period,
  (newPeriod) => {
    if (newPeriod === "1m") {
      seriesVisibility.value[1] = true;
      if (chartRef.value && chartRef.value.chart) {
        chartRef.value.chart.setDatasetVisibility(1, true);
        chartRef.value.chart.update();
      }
    }
  },
);

const normalizedPeriod = computed(() =>
  props.period ? props.period.toLowerCase() : "",
);

const hasForecastData = computed(() => {
  return (
    Array.isArray(props.forecast) &&
    props.forecast.length > 0 &&
    props.data &&
    props.data.some(
      (item) => (item.amount || item.sales || item.total_sales || 0) > 0,
    )
  );
});

// -- Logic การประมวลผลข้อมูล
const processedData = computed(() => {
  const rawData = props.data || [];
  const forecastData = props.forecast || [];
  const p = normalizedPeriod.value;

  let diffDays = 0;
  if (rawData.length > 0) {
    const dates = rawData
      .map((d) => new Date(d.date_iso || d.date).getTime())
      .filter((t) => !isNaN(t));
    if (dates.length > 0) {
      const minDate = Math.min(...dates);
      const maxDate = Math.max(...dates);
      diffDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24));
    }
  }

  const isHourlyData = rawData.length > 0 && !!rawData[0].hour;

  if (p === "24h" || (diffDays <= 1 && isHourlyData)) {
    return {
      labels: rawData.map((item) => item.hour),
      actualValues: rawData.map((item) => item.amount || 0),
      forecastValues: [],
    };
  }

  if (p === "1m" && hasForecastData.value) {
    const dateMap = new Map();
    const getDateKey = (item) => item.date_iso || item.date;

    rawData.forEach((item) => {
      const key = getDateKey(item);
      if (key) {
        if (!dateMap.has(key))
          dateMap.set(key, {
            actual: 0,
            forecast: null,
            dateObj: new Date(key),
          });
        dateMap.get(key).actual +=
          item.amount || item.sales || item.total_sales || 0;
      }
    });

    forecastData.forEach((item) => {
      const key = getDateKey(item);
      if (key) {
        if (!dateMap.has(key))
          dateMap.set(key, {
            actual: null,
            forecast: 0,
            dateObj: new Date(key),
          });
        dateMap.get(key).forecast = item.predicted_sales || 0;
      }
    });

    const sortedKeys = Array.from(dateMap.keys()).sort();
    const combinedData = sortedKeys.map((key) =>
      dateMap.set(key, dateMap.get(key)).get(key),
    );

    let lastActualIndex = -1;
    let lastActualValue = 0;
    for (let i = 0; i < combinedData.length; i++) {
      if (combinedData[i].actual !== null) {
        lastActualIndex = i;
        lastActualValue = combinedData[i].actual;
      }
    }
    if (lastActualIndex !== -1 && lastActualIndex < combinedData.length - 1) {
      combinedData[lastActualIndex].forecast = lastActualValue;
    }

    return {
      labels: sortedKeys.map((key) => {
        const d = dateMap.get(key).dateObj;
        return !isNaN(d.getTime())
          ? `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`
          : key;
      }),
      actualValues: combinedData.map((d) => d.actual),
      forecastValues: combinedData.map((d) => d.forecast),
    };
  }

  // 5. กรณีรายปี (1y) หรือข้อมูลปริมาณมาก
  if (p === "1y" || p === "all" || rawData.length > 35) {
    const groupedData = {};
    rawData.forEach((item) => {
      const dateStr = item.date_iso || item.date;
      if (dateStr) {
        const d = new Date(dateStr);
        if (!isNaN(d.getTime())) {
          const year = d.getFullYear();
          const month = d.getMonth() + 1;
          const key = `${year}-${String(month).padStart(2, "0")}`;
          if (!groupedData[key]) {
            groupedData[key] = {
              total_sales: 0,
              displayLabel: `${String(month).padStart(2, "0")}/${year}`,
            };
          }
          groupedData[key].total_sales +=
            item.amount || item.sales || item.total_sales || 0;
        }
      }
    });
    const sortedKeys = Object.keys(groupedData).sort();
    return {
      labels: sortedKeys.map((key) => groupedData[key].displayLabel),
      actualValues: sortedKeys.map((key) => groupedData[key].total_sales),
      forecastValues: [],
    };
  }

  const labels = rawData.map((item) => {
    const dateStr = item.date_iso || item.date;
    if (dateStr) {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
      }
    }
    return item.label || "";
  });
  const values = rawData.map(
    (item) => item.amount || item.sales || item.total_sales || 0,
  );
  return { labels, actualValues: values, forecastValues: [] };
});

const chartData = computed(() => {
  const p = normalizedPeriod.value;
  const isForecastMode = p === "1m" && hasForecastData.value;
  const actualData = processedData.value.actualValues;

  const getBackground = (context) => {
    if (!isMobile.value) return "rgba(244, 113, 34, 0.1)";
    const ctx = context.chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "rgba(244, 113, 34, 0.4)");
    gradient.addColorStop(1, "rgba(244, 113, 34, 0.0)");
    return gradient;
  };

  return {
    labels: processedData.value.labels,
    datasets: [
      {
        label: t("sales_chart.series.actual"),
        data: actualData,
        borderColor: "#F47122",
        backgroundColor: (ctx) => getBackground(ctx),
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointBackgroundColor: "#F47122",
        pointBorderColor: "#F47122",
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#FFFFFF",
        pointHoverBorderColor: "#F47122",
        spanGaps: false,
      },
      {
        label: t("sales_chart.series.forecast"),
        data: processedData.value.forecastValues,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.05)",
        borderDash: [4, 4],
        fill: true,
        tension: 0.3,
        borderWidth: 2.5,
        pointRadius: 0,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#ffffff",
        pointHoverRadius: 5,
        spanGaps: true,
        hidden: !isForecastMode,
      },
    ],
  };
});

// -- Config ตัวเลือกกราฟ
const chartOptions = computed(() => {
  const p = normalizedPeriod.value;
  const labels = processedData.value.labels;
  const labelsCount = labels.length;

  const isHourly = labelsCount > 0 && String(labels[0]).includes(":");

  let xAxisLabel = "";
  if (isHourly) {
    xAxisLabel = t("sales_chart.axis.time_hour"); // Time (Hour)
  } else if (p === "1y" || p === "all" || labelsCount > 35) {
    xAxisLabel = t("sales_chart.axis.time_month_year"); // Time (Month/Year)
  } else {
    xAxisLabel = t("sales_chart.axis.time_day_month"); // Time (Day/Month)
  }

  if (p === "1m") xAxisLabel = t("sales_chart.axis.time_day_month");
  if (p === "1y") xAxisLabel = t("sales_chart.axis.time_month_year");

  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    layout: { padding: { top: 40 } },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#051960",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: isMobile.value ? 8 : 12,
        cornerRadius: 8,
        titleFont: {
          size: isMobile.value ? 12 : 14,
          weight: "bold",
          family: "'Prompt', sans-serif",
        },
        bodyFont: {
          size: isMobile.value ? 12 : 14,
          family: "'Prompt', sans-serif",
        },
        displayColors: true,
        boxWidth: isMobile.value ? 8 : 10,
        boxHeight: isMobile.value ? 8 : 10,
        boxPadding: isMobile.value ? 3 : 6,
        callbacks: {
          title: (context) => {
            const dateLabel = context[0].label;
            let prefix = t("sales_chart.tooltip.time_prefix");
            if (isHourly) {
              prefix = t("sales_chart.tooltip.hour_prefix");
            } else if (dateLabel.length > 5 || props.period === "1y") {
              prefix = t("sales_chart.tooltip.month_year_prefix");
            }

            return `${prefix}: ${dateLabel}`;
          },
          label: (ctx) => {
            const labelName =
              ctx.dataset.label || t("sales_chart.series.default_label");
            const val = ctx.parsed.y;
            if (val === null || val === undefined) return null;
            return `${labelName}: ฿${val.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax:
          Math.max(
            ...processedData.value.actualValues.filter((v) => v !== null),
            80,
          ) * 1.2,
        title: {
          display: !isMobile.value,
          text: t("sales_chart.axis.y_label"),
          align: "center",
          color: "#64748b",
          font: { size: 14, weight: 500 },
          padding: { bottom: 8 },
        },
        grid: { color: "#e5e5e5", drawBorder: false, display: true },
        ticks: {
          color: "#64748b",
          padding: 10,
          font: { size: 12, weight: 500 },
          precision: 0,
          maxTicksLimit: 8,
          callback: (value) => {
            const formattedValue = isMobile.value
              ? (value / 1000).toFixed(0) + "k"
              : value.toLocaleString();
            return "฿" + formattedValue;
          },
        },
        border: { display: false },
      },
      x: {
        title: {
          display: !isMobile.value,
          text: xAxisLabel,
          align: "center",
          color: "#64748b",
          font: { size: 14, weight: 500 },
          padding: { top: 8, bottom: 0 },
        },
        grid: { display: true, color: "#e5e5e5", drawBorder: false },
        ticks: {
          color: "#64748b",
          padding: 10,
          font: { size: 12, weight: 500 },
          maxRotation: isHourly ? 0 : 45,
          minRotation: 0,
          autoSkip: true,
          maxTicksLimit: isHourly
            ? isMobile.value
              ? 6
              : 24
            : isMobile.value
              ? 7
              : 20,
          callback: function (value) {
            return this.getLabelForValue(value);
          },
        },
        border: { display: false },
      },
    },
  };
});
</script>
