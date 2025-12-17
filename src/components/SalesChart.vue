<template>
  <div class="w-full h-full">
    <Line v-if="chartData.labels.length > 0" :data="chartData" :options="chartOptions" />
    
    <div v-else class="flex items-center justify-center h-full text-gray-400 font-sans">
        - ไม่มีข้อมูลยอดขายในช่วงเวลานี้ -
    </div>
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

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  period: {
    type: String,
    default: '1m' 
  }
});

const processedData = computed(() => {
    const rawData = props.data || [];
    
    const labels = rawData.map(item => {
        if (props.period === '24h') {
            return item.hour || ''; 
        }

        const dateStr = item.date_iso || item.date;
        if (dateStr) {
            const d = new Date(dateStr);
            
            if (isNaN(d.getTime())) return item.date;

            if (props.period === '1y') {
                return new Intl.DateTimeFormat('th-TH', { month: 'short' }).format(d);
            } else {
                const day = String(d.getDate()).padStart(2, '0');
                const month = String(d.getMonth() + 1).padStart(2, '0');
                return `${day}/${month}`;
            }
        }
        
        return item.label || '';
    });

    const values = rawData.map(item => item.amount || item.sales || item.total_sales || 0);

    return { labels, values };
});

const chartData = computed(() => ({
  labels: processedData.value.labels,
  datasets: [
    {
      label: 'ยอดขาย',
      data: processedData.value.values,
      borderColor: '#F47122',       
      backgroundColor: 'rgba(244, 113, 34, 0.2)', 
      fill: true,
      tension: 0.3, 
      pointRadius: 4, 
      pointBackgroundColor: '#F47122', 
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointHoverRadius: 6, 
    }
  ]
}));

const chartOptions = computed(() => {
    let xAxisLabel = 'ช่วงเวลา';
    if (props.period === '24h') {
        xAxisLabel = 'ช่วงเวลา (นาฬิกา)';
    } else if (props.period === '1y') {
        xAxisLabel = 'ช่วงเวลา (เดือน)';
    } else {
        xAxisLabel = 'ช่วงเวลา (วัน/เดือน)';
    }

    return {
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
                    title: (context) => {
                         return `เวลา: ${context[0].label}`;
                    },
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
                    font: { size: 14, weight: 500 },
                    padding: { bottom: 8 }
                },
                grid: {
                    color: '#f3f4f6', 
                    drawBorder: false, 
                },
                ticks: {
                    color: '#64748b',
                    padding: 10,
                    font: { size: 12, weight: 500 },
                    callback: (value) => value.toLocaleString() 
                },
                border: { display: false } 
            },
            x: {
                title: {
                    display: true,
                    text: xAxisLabel, 
                    align: 'center',
                    color: '#64748b', 
                    font: { size: 14, weight: 500 },
                    padding: { top: 8, bottom: 0 }
                },
                grid: { display: false },
                ticks: {
                    color: '#64748b',
                    padding: 10,
                    font: { size: 12, weight: 500 },
                    maxRotation: 0, 
                    autoSkip: true, 
                    maxTicksLimit: 12 
                },
                border: { display: false }
            }
        }
    };
});
</script>