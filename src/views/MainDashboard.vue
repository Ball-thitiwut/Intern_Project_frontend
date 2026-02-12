<template>
  <div>
    <div class="flex items-center justify-between mb-4 md:mb-6">
      <h1 class="text-2xl md:text-4xl font-bold text-[#051960] tracking-tight">
        {{ $t("main_dashboard.title") }}
      </h1>
      <FilterBar
        :initial-period="currentPeriod"
        :initial-view="currentView"
        :data-start="dashboardStore.dataRangeLimits.minDate"
        :data-end="dashboardStore.dataRangeLimits.maxDate"
        @update:period="currentPeriod = $event"
        @update:date-range="handleDateChange"
        @change-view="currentView = $event"
      />
    </div>

    <KeepAlive>
      <component
        :is="currentComponent"
        :date-range="dateRange"
        :period="currentPeriod"
      />
    </KeepAlive>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useDashboardStore } from "@/stores/dashboard";
import FilterBar from "@/components/FilterBar.vue";
import DashboardView from "@/views/DashboardView.vue";
import DashboardBillView from "@/views/DashboardBillView.vue";
import DashboardBehaviorView from "@/views/DashboardBehaviorView.vue";

const dashboardStore = useDashboardStore();

const currentView = ref("sales");
const currentPeriod = ref("1m");
const dateRange = ref([null, null]);

const fetchData = () => {
  // ดึงข้อมูลโดยเน้นไปที่วันที่จริง
  dashboardStore.fetchDashboardOverview(currentPeriod.value, dateRange.value);
};

onMounted(() => {
  const end = new Date();
  const start = new Date();
  start.setMonth(end.getMonth() - 1);
  dateRange.value = [start, end];
  fetchData();
});

watch([currentView, dateRange], () => {
  fetchData();
});

const currentComponent = computed(() => {
  const views = {
    sales: DashboardView,
    bill: DashboardBillView,
    behavior: DashboardBehaviorView,
  };
  return views[currentView.value] || DashboardView;
});

const handleDateChange = (range) => {
  if (range && range.start && range.end) {
    dateRange.value = [new Date(range.start), new Date(range.end)];
  }
};
</script>
