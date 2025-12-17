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

const props = defineProps({
  promotionAmount: { type: Number, default: 0 },
  regularAmount: { type: Number, default: 0 }
});

const colors = ['#F47122', '#002683'];

const chartData = computed(() => {
  const hasData = props.promotionAmount > 0 || props.regularAmount > 0;
  
  return {
    labels: ['โปรโมชั่น', 'เมนูทั่วไป'],
    datasets: [
      {
        data: hasData ? [props.promotionAmount, props.regularAmount] : [0, 0.01], 
      
        backgroundColor: colors,
        borderWidth: 0,
        hoverOffset: 15
      }
    ]
  };
});

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