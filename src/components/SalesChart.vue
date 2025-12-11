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
  Filler, // ต้องมีเพื่อระบายสีใต้กราฟ
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

// Mock Data ให้เหมือนรูปตัวอย่าง (Jan - Dec)
const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dataValues = [5500, 8800, 7200, 19000, 12200, 10200, 11500, 7000, 24500, 15500, 16500, 14800];

const chartData = computed(() => ({
  labels: labels,
  datasets: [
    {
      label: 'Sales',
      data: dataValues,
      borderColor: '#2563eb',       // สีเส้น (Blue 600)
      backgroundColor: 'rgba(59, 130, 246, 0.2)', // สีพื้นที่ด้านล่าง (จางๆ)
      fill: true,                   // สั่งให้ถมสี
      tension: 0,                   // 0 = เส้นตรง (ตามรูป ref), ถ้าอยากได้โค้งๆ ให้แก้เป็น 0.4
      pointRadius: 4,               // ขนาดจุด
      pointBackgroundColor: '#2563eb',
      pointBorderColor: '#ffffff',  // ขอบจุดสีขาว
      pointBorderWidth: 2,
    }
  ]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }, // ซ่อน Legend
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
        color: '#f3f4f6', // สีเส้น Grid แนวนอน (จางๆ)
      },
      ticks: {
        color: '#9ca3af',
        font: { size: 11 },
        callback: (value) => value.toLocaleString() // ใส่ลูกน้ำให้แกน Y
      },
      border: { display: false } // ซ่อนเส้นแกน Y
    },
    x: {
      grid: {
        display: false // ซ่อนเส้น Grid แนวตั้ง (ตามรูป ref)
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