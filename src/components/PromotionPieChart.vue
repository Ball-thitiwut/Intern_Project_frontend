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
      hoverOffset: 15 // ขยายเวลา Hover ให้เห็นชัด (ต้องมี padding รองรับ)
    }
  ]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  rotation: -120, // <--- จุดสำคัญ: หมุนกราฟให้สีส้มมาอยู่ฝั่งซ้าย (ประมาณ 10-11 นาฬิกา)
  layout: {
    padding: 20 // <--- จุดสำคัญ: กันขอบกราฟไม่ให้ตัดเวลา Hover
  },
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false }
  }
};
</script>