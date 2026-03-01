<template>
  <div class="relative w-full h-full">
    <Bar :data="chartData" :options="chartOptions" />

    <div
      class="hidden md:block text-center text-sm text-[#64748b] font-medium mt-2 font-['Prompt']"
    >
      <span v-if="isHourlyView">
        {{ $t("average_sales_chart.axis.x_hourly") || "รายชั่วโมง (เวลา)" }}
      </span>
      <span v-else-if="isMonthlyView">
        {{ $t("average_sales_chart.axis.x_monthly") }}
      </span>
      <span v-else>
        {{ $t("average_sales_chart.axis.x_daily") }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

ChartJS.defaults.font.family = "'Prompt', 'Kanit', 'Sarabun', sans-serif";
ChartJS.defaults.color = "#64748b";

const { t } = useI18n();
const props = defineProps({
  dates: { type: Array, required: true },
  values: { type: Array, required: true },
});

// คำนวณว่ากำลังดูมุมมองรายเดือนหรือไม่ (เช็คจากความยาว String ของวันที่)
const windowWidth = ref(window.innerWidth);

// ตรวจจับขนาดจอ
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => window.addEventListener("resize", updateWidth));
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

const chartData = computed(() => {
  return {
    labels: props.dates,
    datasets: [
      {
        data: props.values.map((item) => item.value),
        minBarLength: 2,
        backgroundColor: props.values.map((item) =>
          item.highlight ? "#F47122" : "rgba(0, 38, 131, 0.2)",
        ),
        hoverBackgroundColor: props.values.map((item) =>
          item.highlight ? "#d65f1a" : "rgba(0, 38, 131, 0.4)",
        ),
        borderRadius: 4,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
      },
    ],
  };
});

// ตั้งค่าหน้าตากราฟ
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      right: 30,
      top: 20,
      bottom: 0,
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
      titleFont: {
        size: isMobile.value ? 12 : 14,
        family: "'Prompt', sans-serif",
        weight: "bold",
      },
      bodyFont: {
        size: isMobile.value ? 12 : 14,
        family: "'Prompt', sans-serif",
      },
      padding: isMobile.value ? 8 : 10,
      cornerRadius: 4,
      displayColors: false,
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
          const label =
            t("dashboard_view.summary_stats.avg_bill") || "ค่าเฉลี่ยต่อบิล";
          return `${label}: ฿${context.raw.toLocaleString()}`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      precision: 0,
      border: { display: false },
      suggestedMax:
        Math.max(...props.values.map((item) => item.value || 0), 100) * 1.2,
      title: {
        display: !isMobile.value,
        text: t("average_sales_chart.axis.y_unit"),
        color: "#64748b",
        font: { size: 13.5, weight: 500, family: "'Prompt', sans-serif" },
        padding: { bottom: 10 },
      },
      grid: {
        color: "#e5e5e5",
        borderDash: [5, 5],
        drawTicks: false,
        display: !isMobile.value,
      },
      ticks: {
        display: !isMobile.value,
        color: "#64748b",
        font: { size: 13, weight: 500, family: "'Prompt', sans-serif" },
        padding: 10,
        callback: (value) => "฿" + value.toLocaleString(),
      },
      maxTicksLimit: 8,
    },
    x: {
      border: { display: false },
      grid: { display: false },
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
