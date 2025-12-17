<template>
  <div class="flex flex-col gap-6 rounded-xl font-sans text-[#051960] animate-fade-in h-full">
    
    <div v-if="dashboardStore.isLoading" class="flex justify-center items-center h-full min-h-[400px]">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-[#051960]"></div>
    </div>

    <div v-else class="flex flex-col gap-6 w-full">
        
        <div class="bg-white rounded-3xl p-6 pb-10 shadow-sm w-full">
            <div class="text-xl font-bold text-[#051960] mb-6">ยอดขายเฉลี่ยต่อบิลรายวัน</div>
            
            <div class="h-72 w-full pl-4"> 
                <AverageSalesChart 
                    v-if="dashboardStore.billAnalytics.dates.length > 0"
                    :dates="dashboardStore.billAnalytics.dates" 
                    :values="dashboardStore.billAnalytics.avgBillValues" 
                />
                <div v-else class="flex items-center justify-center h-full text-gray-400">
                    ยังไม่มีข้อมูลสำหรับช่วงเวลานี้
                </div>
            </div>
        </div>

        <div class="bg-white rounded-3xl p-6 pb-10 shadow-sm w-full">
            <div class="text-xl font-bold text-[#051960] mb-6">จำนวนบิลรายวัน</div>

            <div class="h-72 w-full pl-4">
                <BillCountChart 
                    v-if="dashboardStore.billAnalytics.dates.length > 0"
                    :dates="dashboardStore.billAnalytics.dates" 
                    :values="dashboardStore.billAnalytics.billCountValues" 
                />
                <div v-else class="flex items-center justify-center h-full text-gray-400">
                    ยังไม่มีข้อมูลสำหรับช่วงเวลานี้
                </div>
            </div>
        </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useDashboardStore } from '@/stores/dashboard';
import AverageSalesChart from '@/components/AverageSalesChart.vue'; 
import BillCountChart from '@/components/BillCountChart.vue';

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
</script>