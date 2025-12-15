<template>
  <div class="relative w-full h-full">
    <div class="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-sm text-[#64748b] font-medium tracking-wide font-sans">
      บิล
    </div>

    <Line ref="chartRef" :data="chartData" :options="chartOptions" />

    <div class="text-center text-sm text-[#64748b] font-medium mt-2 font-sans">
      วันที่
    </div>
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

ChartJS.defaults.font.family = "'Prompt', 'Kanit', 'Sarabun', sans-serif";
ChartJS.defaults.color = '#64748b';

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

        tension: 0.2, 
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
      backgroundColor: '#051960',
      titleColor: '#fff',
      bodyColor: '#fff',
      padding: 12,
      cornerRadius: 4,
      displayColors: false,
      titleFont: { size: 14, weight: 'bold', family: "'Prompt', sans-serif" },
      bodyFont: { size: 14, family: "'Prompt', sans-serif" },
      callbacks: {
        label: (context) => `${context.raw.toLocaleString()} บิล` 
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
        color: '#64748b', 
        font: { 
            size: 13,   
            weight: 500  
        },
        padding: 10,
        stepSize: 10,
        callback: (value) => value.toLocaleString()
      }
    },
    x: {
      border: { display: false },
      grid: { display: false },
      ticks: {
        color: '#64748b', 
        font: { 
            size: 13,    
            weight: 500  
        }
      }
    }
  }
};
</script>