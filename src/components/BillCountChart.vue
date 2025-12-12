<template>
  <div class="relative w-full h-full">
    <div class="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-gray-400 font-medium tracking-wide">
      Bill
    </div>

    <Line ref="chartRef" :data="chartData" :options="chartOptions" />

    <div class="text-center text-xs text-gray-400 font-medium mt-2">Date</div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'; 
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler 
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const props = defineProps({
  dates: { type: Array, required: true },
  values: { type: Array, required: true }
});

const chartRef = ref(null);

const getGradient = (ctx, chartArea) => {
  const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
  gradient.addColorStop(0, 'rgba(244, 113, 34, 0.05)'); 
  gradient.addColorStop(1, 'rgba(244, 113, 34, 0.6)'); 
  return gradient;
};

const chartData = computed(() => {
  return {
    labels: props.dates,
    datasets: [
      {
        data: props.values.map(item => item.value),
        borderColor: '#F47122', 
        borderWidth: 3,

        fill: 'start', 
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }
          return getGradient(ctx, chartArea);
        },
        
        pointBackgroundColor: '#F47122',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,

        tension: 0, 
      }
    ]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#F47122', 
      titleColor: '#fff',
      bodyColor: '#fff',
      padding: 10,
      cornerRadius: 4,
      displayColors: false,
      callbacks: {
        label: (context) => `${context.raw} Bills`
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      border: { display: false },
      grid: {
        color: '#f3f4f6',
        borderDash: [5, 5],
        drawTicks: false
      },
      ticks: {
        color: '#9ca3af',
        font: { size: 10 },
        padding: 10,
        stepSize: 10
      }
    },
    x: {
      border: { display: false },
      grid: { display: false },
      ticks: {
        color: '#9ca3af',
        font: { size: 10 }
      }
    }
  }
};
</script>