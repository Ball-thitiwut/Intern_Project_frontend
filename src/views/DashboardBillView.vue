<template>
  <div
    class="flex flex-col gap-4 md:gap-6 rounded-xl font-sans text-[#051960] animate-fade-in"
  >
    <div
      v-if="dashboardStore.isLoading"
      class="flex justify-center items-center h-[60vh] min-h-[400px]"
    >
      <div
        class="animate-spin rounded-full h-10 w-10 border-b-2 border-[#051960]"
      ></div>
    </div>

    <div v-else class="flex flex-col gap-4 md:gap-6 w-full">
      <div
        class="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 md:pb-10 shadow-sm w-full"
      >
        <div class="text-base md:text-xl font-bold text-[#051960] mb-4 md:mb-6">
          {{ $t('dashboard_bill_view.avg_sales_title') }}
        </div>
        <div class="h-60 md:h-72 w-full pl-0 md:pl-4">
          <AverageSalesChart
            v-if="dashboardStore.billAnalytics.dates.length > 0"
            :dates="dashboardStore.billAnalytics.dates"
            :values="dashboardStore.billAnalytics.avgBillValues"
          />
          <div
            v-else
            class="flex items-center justify-center h-full text-gray-400 text-sm md:text-base"
          >
            {{ $t('dashboard_bill_view.no_data') }}
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 md:pb-10 shadow-sm w-full"
      >
        <div class="text-base md:text-xl font-bold text-[#051960] mb-4 md:mb-6">
          {{ $t('dashboard_bill_view.bill_count_title') }}
        </div>
        <div class="h-60 md:h-72 w-full pl-0 md:pl-4">
          <BillCountChart
            v-if="dashboardStore.billAnalytics.dates.length > 0"
            :dates="dashboardStore.billAnalytics.dates"
            :values="dashboardStore.billAnalytics.billCountValues"
          />
          <div
            v-else
            class="flex items-center justify-center h-full text-gray-400 text-sm md:text-base"
          >
            {{ $t('dashboard_bill_view.no_data') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useDashboardStore } from "@/stores/dashboard";
import AverageSalesChart from "@/components/AverageSalesChart.vue";
import BillCountChart from "@/components/BillCountChart.vue";

const props = defineProps({
  dateRange: {
    type: Array,
    default: () => [new Date(), new Date()],
  },
  period: {
    type: String,
    default: "1m",
  },
});

const dashboardStore = useDashboardStore();
const { t } = useI18n();

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
