<template>
  <div class="relative w-full h-full">
    <div
      class="hidden md:block absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-sm text-[#64748b] font-medium tracking-wide font-sans"
    >
      บาท
    </div>

    <Bar :data="chartData" :options="chartOptions" />

    <div
      class="hidden md:block text-center text-sm text-[#64748b] font-medium mt-2 font-sans"
    >
      {{ isMonthlyView ? "เดือน/ปี" : "วันที่" }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
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
  Legend
);

ChartJS.defaults.font.family = "'Prompt', 'Kanit', 'Sarabun', sans-serif";
ChartJS.defaults.color = "#64748b";

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

const isMonthlyView = computed(() => {
  return props.dates.length > 0 && props.dates[0].length > 5;
});

const chartData = computed(() => {
  return {
    labels: props.dates,
    datasets: [
      {
        data: props.values.map((item) => item.value),
        backgroundColor: props.values.map((item) =>
          item.highlight ? "#F47122" : "rgba(0, 38, 131, 0.2)"
        ),
        hoverBackgroundColor: props.values.map((item) =>
          item.highlight ? "#d65f1a" : "rgba(0, 38, 131, 0.4)"
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
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#051960",
      titleColor: "#fff",
      titleFont: {
        size: isMobile.value ? 12 : 14,
        family: "'Prompt', sans-serif",
      },
      bodyFont: {
        size: isMobile.value ? 12 : 14,
        family: "'Prompt', sans-serif",
      },
      padding: isMobile.value ? 8 : 10,
      cornerRadius: 4,
      displayColors: false,
      callbacks: {
        label: (context) => `฿${context.raw.toLocaleString()}`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      border: { display: false },
      grid: {
        color: "#f3f4f6",
        borderDash: [5, 5],
        drawTicks: false,
        display: !isMobile.value,
      },
      ticks: {
        display: !isMobile.value,
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
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: isMobile.value ? 5 : 12,
      },
    },
  },
}));
</script>
