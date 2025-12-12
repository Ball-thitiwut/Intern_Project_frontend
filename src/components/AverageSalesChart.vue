<template>
  <div class="relative w-full h-full">
    <div class="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-gray-400 font-medium tracking-wide">
      Bath
    </div>

    <Bar :data="chartData" :options="chartOptions" />

    <div class="text-center text-xs text-gray-400 font-medium mt-2">Date</div>
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
      bodyFont: { size: 14 },
      padding: 10,
      cornerRadius: 4,
      displayColors: false,
      callbacks: {
        label: (context) => `฿${context.raw}`
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
        padding: 10
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