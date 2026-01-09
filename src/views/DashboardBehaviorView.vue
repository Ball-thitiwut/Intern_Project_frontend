<template>
  <div class="space-y-8 font-sans text-[#051960] animate-fade-in h-full">
    
    <div v-if="dashboardStore.isLoading" class="flex justify-center items-center h-full min-h-[400px]">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-[#051960]"></div>
    </div>

    <div v-else class="space-y-8">
        <GroupSizeChart 
          :chart-data="groupSizeChartData"
          :table-data="groupSizeTableData"
          :total-bills="dashboardStore.customerInsights.total_sample_bills || 0"
        />

        <StatAnalysisChart
          title="ยอดขายเฉลี่ยต่อบิล"
          :stats="salesPerBillStats"
          :chart-data="salesPerBillChartData"
          y-axis-label="จำนวนบิล"
          x-axis-label="ช่วงราคา (บาท)"
          :y-ticks="calcYTicks(salesPerBillChartData)"
        />
        
    </div>

  </div>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import { useDashboardStore } from "@/stores/dashboard";
import GroupSizeChart from '@/components/GroupSizeChart.vue';
import StatAnalysisChart from '@/components/StatAnalysisChart.vue';

const props = defineProps({
  dateRange: {
    type: Array,
    default: () => [new Date(), new Date()]
  },
  period: {
    type: String,
    default: '1m'
  }
});

const dashboardStore = useDashboardStore();

const fetchData = async () => {
    await dashboardStore.fetchDashboardOverview(props.period, props.dateRange);
};

onMounted(() => {
    fetchData();
});

watch([() => props.dateRange, () => props.period], async () => {
    await fetchData();
});

// -- แปลงข้อมูลจาก Store เพื่อใส่กราฟ --
// แปลงข้อมูลสำหรับกราฟขนาดกลุ่มลูกค้า
const groupSizeChartData = computed(() => {
    const raw = dashboardStore.customerInsights.group_size_analysis || [];
    const maxVal = Math.max(...raw.map(i => i.count), 0);
    
    return raw.map(item => {
        const labelShort = item.label.replace(/[^0-9>]/g, '').trim(); 
        return {
            label: labelShort,
            percent: parseFloat(item.percentage),
            value: item.count,
            highlight: item.count === maxVal && item.count > 0
        };
    });
});

// ข้อมูลสำหรับตาราง
const groupSizeTableData = computed(() => {
    const raw = dashboardStore.customerInsights.group_size_analysis || [];
    const sorted = [...raw].sort((a, b) => b.count - a.count);
    
    return sorted.map(item => {
        const labelShort = item.label.replace(/[^0-9>]/g, '').trim();
        return {
            size: labelShort,
            count: item.count,
            percent: parseFloat(item.percentage)
        };
    });
});

// แปลงข้อมูลสำหรับกราฟช่วงยอดขาย
const salesPerBillChartData = computed(() => {
    const raw = dashboardStore.customerInsights.spending_analysis || [];
    const maxVal = Math.max(...raw.map(i => i.count), 0);

    return raw.map(item => ({
        label: item.range,
        height: maxVal > 0 ? (item.count / maxVal) * 100 : 0,
        value: item.count,
        highlight: item.count === maxVal && item.count > 0
    }));
});

// คำนวณสถิติสรุปด้านบนกราฟ
const salesPerBillStats = computed(() => {
    const avgBill = dashboardStore.overviewData.summary.average_bill || 0;
    
    const raw = dashboardStore.customerInsights.spending_analysis || [];
    let mostCommonRange = "-";
    if (raw.length > 0) {
        const maxItem = raw.reduce((prev, current) => (prev.count > current.count) ? prev : current);
        mostCommonRange = maxItem.range;
    }

    return [
        { value: `฿${Number(avgBill).toLocaleString()}`, label: 'ยอดขายต่อบิลเฉลี่ย' },
        { value: mostCommonRange, label: 'ช่วงยอดขายที่พบบ่อยสุด' }
    ];
});

const calcYTicks = (data) => {
    if (!data || data.length === 0) return ['0'];
    const maxVal = Math.max(...data.map(i => i.value), 0);
    if (maxVal === 0) return ['0'];

    const step = Math.ceil(maxVal / 5);
    const ticks = [];
    for (let i = 0; i <= 5; i++) {
        ticks.push((step * i).toString());
    }
    return ticks.reverse();
};
</script>