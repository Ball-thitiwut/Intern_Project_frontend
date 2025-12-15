<template>
  <div class="relative w-full h-full">
    <div class="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-sm text-[#64748b] font-medium tracking-wide font-sans">
      บาท
    </div>

    <Bar :data="chartData" :options="chartOptions" />

    <div class="text-center text-sm text-[#64748b] font-medium mt-2 font-sans">
      วันที่
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

ChartJS.defaults.font.family = "'Prompt', 'Kanit', 'Sarabun', sans-serif";
ChartJS.defaults.color = '#64748b';

const props = defineProps({
  dates: { type: Array, required: true },
  values: { type: Array, required: true } 
});

const chartData = computed(() => {
  return {
    labels: props.dates,
    datasets: [
      {
        data: props.values.map(item => item.value),
        backgroundColor: props.values.map(item => 
          item.highlight ? '#F47122' : 'rgba(0, 38, 131, 0.2)'
        ),
        hoverBackgroundColor: props.values.map(item => 
          item.highlight ? '#d65f1a' : 'rgba(0, 38, 131, 0.4)'
        ),
        borderRadius: 4, 
        barPercentage: 0.4, 
        categoryPercentage: 0.8
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
      bodyFont: { size: 14, family: "'Prompt', sans-serif" }, 
      padding: 10,
      cornerRadius: 4,
      displayColors: false,
      callbacks: {
        label: (context) => `฿${context.raw.toLocaleString()}` 
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