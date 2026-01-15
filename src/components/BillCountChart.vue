<template>
  <div class="relative w-full h-full">
    <div
      class="hidden md:block absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-sm text-[#64748b] font-medium tracking-wide font-sans"
    >
      บิล
    </div>

    <Line ref="chartRef" :data="chartData" :options="chartOptions" />

    <div
      class="hidden md:block text-center text-sm text-[#64748b] font-medium mt-2 font-sans"
    >
      {{ isMonthlyView ? "เดือน/ปี" : "วันที่" }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick } from "vue";
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
  Filler
);

ChartJS.defaults.font.family = "'Prompt', 'Kanit', 'Sarabun', sans-serif";
ChartJS.defaults.color = "#64748b";

const props = defineProps({
  dates: { type: Array, required: true },
  values: { type: Array, required: true },
});

const chartRef = ref(null);
const windowWidth = ref(window.innerWidth);

// ตรวจจับขนาดจอ
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", updateWidth);

  nextTick(() => {
    if (chartRef.value && chartRef.value.chart) {
      const chart = chartRef.value.chart;

      const valArray = props.values.map((v) => v.value);
      const maxVal = Math.max(...valArray);
      const maxIndex = valArray.indexOf(maxVal);

      if (maxIndex !== -1) {
        chart.setActiveElements([{ datasetIndex: 0, index: maxIndex }]);

        chart.tooltip.setActiveElements([{ datasetIndex: 0, index: maxIndex }]);

        chart.update();
      }
    }
  });
});

onUnmounted(() => window.removeEventListener("resize", updateWidth));

const isMobile = computed(() => windowWidth.value < 768);

const isMonthlyView = computed(() => {
  return props.dates.length > 0 && props.dates[0].length > 5;
});

const getGradient = (ctx, chartArea) => {
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.bottom,
    0,
    chartArea.top
  );
  gradient.addColorStop(0, "rgba(244, 113, 34, 0.05)");
  gradient.addColorStop(1, "rgba(244, 113, 34, 0.6)");
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

        // Mobile: ซ่อนจุด (radius 0) เพื่อความ Clean
        pointRadius: isMobile.value ? 0 : 4,
        pointHoverRadius: 6,
        tension: 0.4,
        clip: false,
      },
    ],
  };
});

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
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
        label: (context) => `${context.raw.toLocaleString()} บิล`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      border: { display: false },
      grace: "20%",
      // Mobile: ซ่อน Grid และแกน Y
      grid: {
        color: "#f3f4f6",
        borderDash: [5, 5],
        drawTicks: false,
        display: !isMobile.value,
      },
      ticks: {
        display: !isMobile.value, // Mobile: ซ่อนตัวเลขแกน Y
        color: "#64748b",
        font: { size: 13, weight: 500 },
        padding: 10,
        callback: (value) => value.toLocaleString(),
      },
    },
    x: {
      border: { display: false },
      grid: { display: false },
      ticks: {
        color: "#64748b",
        font: { size: 13, weight: 500 },
        maxTicksLimit: isMobile.value ? 5 : 12, // Mobile: ลดจำนวนป้าย
      },
    },
  },
}));
</script>
