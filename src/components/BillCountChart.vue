<template>
  <div class="relative w-full h-full">
    <Line ref="chartRef" :data="chartData" :options="chartOptions" />

    <div
      class="hidden md:block text-center text-sm text-[#64748b] font-medium mt-2 font-['Prompt']"
    >
      <span v-if="isHourlyView">{{
        $t("average_sales_chart.axis.x_hourly") || "รายชั่วโมง (เวลา)"
      }}</span>
      <span v-else-if="isMonthlyView">{{
        $t("average_sales_chart.axis.x_monthly")
      }}</span>
      <span v-else>{{ $t("average_sales_chart.axis.x_daily") }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick } from "vue";
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
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

ChartJS.defaults.font.family = "'Prompt', 'Kanit', 'Sarabun', sans-serif";
ChartJS.defaults.color = "#64748b";

const { t } = useI18n();
const props = defineProps({
  dates: { type: Array, required: true },
  values: { type: Array, required: true },
});

const chartRef = ref(null);
const windowWidth = ref(window.innerWidth);

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", updateWidth);
  nextTick(() => {
    if (chartRef.value && chartRef.value.chart && props.values.length > 0) {
      const chart = chartRef.value.chart;
      const valArray = props.values.map((v) => v.value);
      const maxVal = Math.max(...valArray);
      const maxIndex = valArray.indexOf(maxVal);

      if (maxIndex !== -1 && maxVal > 0) {
        chart.setActiveElements([{ datasetIndex: 0, index: maxIndex }]);
        chart.tooltip.setActiveElements([{ datasetIndex: 0, index: maxIndex }]);
        chart.update();
      }
    }
  });
});

onUnmounted(() => window.removeEventListener("resize", updateWidth));

const isMobile = computed(() => windowWidth.value < 768);

const isHourlyView = computed(() => {
  return props.dates.length > 0 && String(props.dates[0]).includes(":");
});

const isMonthlyView = computed(() => {
  return (
    props.dates.length > 0 && props.dates[0].length > 5 && !isHourlyView.value
  );
});

const getGradient = (ctx, chartArea) => {
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.bottom,
    0,
    chartArea.top,
  );
  gradient.addColorStop(0, "rgba(244, 113, 34, 0.05)");
  gradient.addColorStop(1, "rgba(244, 113, 34, 0.4)");
  return gradient;
};

const chartData = computed(() => {
  return {
    labels: props.dates,
    datasets: [
      {
        data: props.values.map((item) => item.value),
        borderColor: "#F47122",
        borderWidth: 3,
        fill: "start",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          return getGradient(ctx, chartArea);
        },
        pointBackgroundColor: "#F47122",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHitRadius: 20,
        tension: 0.4,
        clip: false,
      },
    ],
  };
});

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      right: 30,
      top: 20,
    },
  },
  interaction: {
    mode: "index",
    intersect: false,
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#051960",
      titleColor: "#fff",
      bodyColor: "#fff",
      padding: isMobile.value ? 8 : 12,
      cornerRadius: 4,
      displayColors: false,
      titleFont: {
        size: isMobile.value ? 12 : 14,
        weight: "bold",
        family: "'Prompt', sans-serif",
      },
      bodyFont: {
        size: isMobile.value ? 12 : 14,
        family: "'Prompt', sans-serif",
      },
      callbacks: {
        title: (context) => {
          let prefix = t("sales_chart.tooltip.time_prefix");
          if (isHourlyView.value) {
            prefix = t("sales_chart.tooltip.hour_prefix");
          } else if (isMonthlyView.value) {
            prefix = t("sales_chart.tooltip.month_year_prefix");
          }
          return `${prefix}: ${context[0].label}`;
        },
        label: (context) => {
          const prefixLabel = t("bill_count_chart.tooltip.unit") || "จำนวนบิล";
          const unit = t("bill_count_chart.units.bill") || "บิล";
          return `${prefixLabel}: ${context.raw.toLocaleString()} ${unit}`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      border: { display: false },
      suggestedMax: Math.max(...props.values.map((v) => v.value), 80) * 1.2,
      title: {
        display: !isMobile.value,
        text: t("bill_count_chart.axis.y_unit"),
        color: "#64748b",
        font: { size: 13, weight: 500 },
        padding: { bottom: 10 },
      },
      grid: {
        color: "#e5e5e5",
        borderDash: [5, 5],
        drawTicks: true,
        tickLength: 8,
        tickColor: "#e5e5e5",
        display: !isMobile.value,
      },
      ticks: {
        display: !isMobile.value,
        color: "#64748b",
        font: { size: 13, weight: 500, family: "'Prompt', sans-serif" },
        padding: 5,
        maxTicksLimit: 8,
        precision: 0,
        callback: (value) => value.toLocaleString(),
      },
    },
    x: {
      border: { display: false },
      grid: {
        display: !isMobile.value,
        color: "#e5e5e5",
        drawTicks: true,
        tickLength: 8,
        tickColor: "#e5e5e5",
      },
      ticks: {
        color: "#64748b",
        font: { size: 13, weight: 500, family: "'Prompt', sans-serif" },
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: isHourlyView.value
          ? isMobile.value
            ? 6
            : 24
          : isMobile.value
            ? 5
            : 12,
      },
    },
  },
}));
</script>
