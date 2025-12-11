<template>
  <div class="w-full h-full relative">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Pie } from 'vue-chartjs';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = ['#F47122', '#002683'];
const dataValues = [2811, 12799]; 

const chartData = computed(() => ({
  labels: ['โปรโมชั่น', 'เมนูทั่วไป'],
  datasets: [
    {
      data: dataValues,
      backgroundColor: colors, 
      borderWidth: 0, 
      hoverOffset: 15 
    }
  ]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  rotation: -120,
  layout: {
    padding: 20 
  },
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false }
  }
};
</script>