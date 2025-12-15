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

ChartJS.defaults.font.family = "'Prompt', 'Kanit', 'Sarabun', sans-serif";
ChartJS.defaults.color = '#64748b'; 

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
      tension: 0.2, 
      pointRadius: 6,
      pointBackgroundColor: '#F47122', 
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointHoverRadius: 8, 
    }
  ]
}));

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
      cornerRadius: 8,
      titleFont: { size: 14, weight: 'bold', family: "'Prompt', sans-serif" },
      bodyFont: { size: 14, family: "'Prompt', sans-serif" },
      displayColors: false, 
      callbacks: {
        label: (ctx) => `ยอดขาย: ฿${ctx.parsed.y.toLocaleString()}`
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      
      title: {
        display: true,
        text: 'ยอดขาย (บาท)', 
        align: 'center',
        color: '#64748b', 
        font: {
            size: 14,   
            weight: 500 
        },
        padding: { bottom: 8 }
      },
      
      grid: {
        color: '#f3f4f6', 
        drawBorder: false, 
      },
      ticks: {
        color: '#64748b',
        padding: 10,
        font: { 
            size: 13,   
            weight: 500 
        },
        callback: (value) => value.toLocaleString() 
      },
      border: { display: false } 
    },
    x: {
      title: {
        display: true,
        text: 'เดือน', 
        align: 'center',
        color: '#64748b', 
        font: {
            size: 14,   
            weight: 500 
        },
        padding: { top: 8, bottom: 0 }
      },
      
      grid: {
        display: false 
      },
      ticks: {
        color: '#64748b',
        padding: 10,
        font: { 
            size: 13,   
            weight: 500 
        }
      },
      border: { display: false }
    }
  }
};
</script>