<template>
  <div class="w-full h-full">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler, 
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dataValues = [5500, 8800, 7200, 19000, 12200, 10200, 11500, 7000, 24500, 15500, 16500, 14800];

const chartData = computed(() => ({
  labels: labels,
  datasets: [
    {
      label: 'Sales',
      data: dataValues,
      borderColor: '#F47122',       
      backgroundColor: 'rgba(244, 113, 34, 0.2)',
      fill: true,
      tension: 0,
      pointRadius: 4,
      pointBackgroundColor: '#F47122', 
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
    }
  ]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }, 
    tooltip: {
      backgroundColor: '#1e293b',
      padding: 12,
      cornerRadius: 8,
      callbacks: {
        label: (ctx) => `฿${ctx.parsed.y.toLocaleString()}`
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#f3f4f6', 
      },
      ticks: {
        color: '#9ca3af',
        font: { size: 11 },
        callback: (value) => value.toLocaleString() 
      },
      border: { display: false } 
    },
    x: {
      grid: {
        display: false 
      },
      ticks: {
        color: '#9ca3af',
        font: { size: 11 }
      },
      border: { display: false }
    }
  }
};
</script>