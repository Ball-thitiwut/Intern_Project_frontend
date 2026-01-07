<template>
  <div class="w-full h-full relative">
    <div v-if="normalizedPeriod === '1m'" class="absolute top-0 right-0 z-10 flex bg-slate-100 p-1 rounded-lg gap-1">
      <button 
        @click="toggleSeries(0)"
        class="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200"
        :class="seriesVisibility[0] ? 'bg-[#F47122] text-white shadow-sm' : 'text-slate-400 hover:bg-slate-200'"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
        ยอดขายจริง
      </button>

      <button 
        @click="toggleSeries(1)"
        class="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200"
        :class="seriesVisibility[1] ? 'bg-[#3b82f6] text-white shadow-sm' : 'text-slate-400 hover:bg-slate-200'"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
        คาดการณ์
      </button>
    </div>

    <Line ref="chartRef" v-if="chartData.labels.length > 0" :data="chartData" :options="chartOptions" />
    
    <div v-else class="flex items-center justify-center h-full text-gray-400 font-sans">
        - ไม่มีข้อมูลยอดขายในช่วงเวลานี้ -
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
  forecast: {
    type: Array,
    default: () => []
  },
  period: {
    type: String,
    default: '1m' 
  }
});

const chartRef = ref(null);
const seriesVisibility = ref([true, true]);

const toggleSeries = (index) => {
  seriesVisibility.value[index] = !seriesVisibility.value[index];
  
  if (chartRef.value && chartRef.value.chart) {
    chartRef.value.chart.setDatasetVisibility(index, seriesVisibility.value[index]);
    chartRef.value.chart.update();
  }
};

const normalizedPeriod = computed(() => props.period ? props.period.toLowerCase() : '');

const processedData = computed(() => {
    const rawData = props.data || [];
    const forecastData = props.forecast || [];
    const p = normalizedPeriod.value;
    
    if (p === '1m') {
        const dateMap = new Map();
        const getDateKey = (item) => item.date_iso || item.date;

        rawData.forEach(item => {
            const key = getDateKey(item);
            if(key) {
                if(!dateMap.has(key)) dateMap.set(key, { actual: 0, forecast: null, dateObj: new Date(key) });
                dateMap.get(key).actual += (item.amount || item.sales || item.total_sales || 0);
            }
        });

        forecastData.forEach(item => {
            const key = getDateKey(item);
            if(key) {
                if(!dateMap.has(key)) dateMap.set(key, { actual: null, forecast: 0, dateObj: new Date(key) });
                dateMap.get(key).forecast = (item.predicted_sales || 0);
            }
        });

        const sortedKeys = Array.from(dateMap.keys()).sort();
        
        const combinedData = sortedKeys.map(key => dateMap.get(key));
        
        let lastActualIndex = -1;
        let lastActualValue = 0;

        for (let i = 0; i < combinedData.length; i++) {
            if (combinedData[i].actual !== null) {
                lastActualIndex = i;
                lastActualValue = combinedData[i].actual;
            }
        }

        if (lastActualIndex !== -1 && lastActualIndex < combinedData.length - 1) {
            combinedData[lastActualIndex].forecast = lastActualValue;
        }

        return {
            labels: sortedKeys.map(key => {
                const d = dateMap.get(key).dateObj;
                return !isNaN(d.getTime()) 
                    ? `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
                    : key;
            }),
            actualValues: combinedData.map(d => d.actual),
            forecastValues: combinedData.map(d => d.forecast)
        };
    }

    if (p === '1y' || p === 'all' || rawData.length > 35) {
        const groupedData = {};

        rawData.forEach(item => {
            const dateStr = item.date_iso || item.date;
            if (dateStr) {
                const d = new Date(dateStr);
                if (!isNaN(d.getTime())) {
                    const year = d.getFullYear();
                    const month = d.getMonth() + 1;
                    const key = `${year}-${String(month).padStart(2, '0')}`;
                    
                    if (!groupedData[key]) {
                        groupedData[key] = {
                            total_sales: 0,
                            displayLabel: `${String(month).padStart(2, '0')}/${year}`
                        };
                    }
                    groupedData[key].total_sales += (item.amount || item.sales || item.total_sales || 0);
                }
            }
        });

        const sortedKeys = Object.keys(groupedData).sort();
        return {
            labels: sortedKeys.map(key => groupedData[key].displayLabel),
            actualValues: sortedKeys.map(key => groupedData[key].total_sales),
            forecastValues: [] 
        };
    }

    const labels = rawData.map(item => {
        if (p === '24h') return item.hour || '';
        const dateStr = item.date_iso || item.date;
        if (dateStr) {
            const d = new Date(dateStr);
            if (!isNaN(d.getTime())) {
                return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
            }
        }
        return item.label || '';
    });

    const values = rawData.map(item => item.amount || item.sales || item.total_sales || 0);
    
    return { 
        labels, 
        actualValues: values, 
        forecastValues: [] 
    };
});

const chartData = computed(() => {
  const p = normalizedPeriod.value;
  const isForecastMode = p === '1m';

  return {
    labels: processedData.value.labels,
    datasets: [
      {
        label: 'ยอดขายจริง', 
        data: processedData.value.actualValues,
        borderColor: '#F47122',       
        backgroundColor: 'rgba(244, 113, 34, 0.1)', 
        fill: true,
        tension: 0.3, 
        pointRadius: 4, 
        pointBackgroundColor: '#F47122', 
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        spanGaps: false 
      },
      {
        label: 'คาดการณ์',
        data: processedData.value.forecastValues,
        borderColor: '#3b82f6', 
        backgroundColor: 'rgba(59, 130, 246, 0.05)', 
        borderDash: [4, 4], 
        fill: true,
        tension: 0.3,
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#ffffff',
        pointHoverRadius: 5,
        spanGaps: true, 
        hidden: !isForecastMode 
      }
    ]
  };
});

const chartOptions = computed(() => {
    let xAxisLabel = 'ช่วงเวลา (วัน/เดือน)';
    const p = normalizedPeriod.value;
    
    if (p === '24h') xAxisLabel = 'ช่วงเวลา (นาฬิกา)';
    else if (p === '1y' || p === 'all' || processedData.value.labels.length > 35) xAxisLabel = 'ช่วงเวลา (เดือน/ปี)';

    return {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 40,  
            }
        },
        plugins: {
            legend: { 
                display: false
            },
            tooltip: {
                backgroundColor: '#051960', 
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 12,
                cornerRadius: 8,
                titleFont: { size: 14, weight: 'bold', family: "'Prompt', sans-serif" },
                bodyFont: { size: 14, family: "'Prompt', sans-serif" },
                displayColors: true, 
                callbacks: {
                    title: (context) => `เวลา: ${context[0].label}`,
                    label: (ctx) => {
                        const labelName = ctx.dataset.label || 'ยอดขาย';
                        const val = ctx.parsed.y;
                        if (val === null || val === undefined) return null;
                        return `${labelName}: ฿${val.toLocaleString()}`;
                    }
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
                grid: { color: '#f3f4f6', drawBorder: false },
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