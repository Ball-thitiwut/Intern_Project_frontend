<template>
  <div class="min-h-screen px-4">
    <h1 class="text-4xl font-bold text-[#051960] tracking-tight mb-6">Dashboard</h1>
    <div class="mb-6">
      <FilterBar
        :initial-period="currentPeriod"
        :initial-view="currentView"
        :data-start="dashboardStore.dataRangeLimits.minDate"
        :data-end="dashboardStore.dataRangeLimits.maxDate"
        @update:period="handlePeriodChange"
        @update:date-range="handleDateChange"
        @change-view="handleChangeView"
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

// State สำหรับเก็บค่าตัวกรอง filter bar 
const currentView = ref("sales"); 
const currentPeriod = ref("1m"); 
const dateRange = ref([new Date(), new Date()]); 

// ฟังก์ชันดึงข้อมูลจาก API ผ่าน Store
const fetchData = () => {
  dashboardStore.fetchDashboardOverview(currentPeriod.value, dateRange.value);
};

onMounted(() => {
  fetchData();
});

watch([currentPeriod, dateRange], () => {
  fetchData();
});

// เลือกว่าจะดู Tab ไหน (Sales, Bill, Behavior)
const currentComponent = computed(() => {
  switch (currentView.value) {
    case "sales": return DashboardView;
    case "bill": return DashboardBillView;
    case "behavior": return DashboardBehaviorView;
    default: return DashboardView;
  }
});

const handleChangeView = (viewId) => {
  currentView.value = viewId;
};

const handlePeriodChange = (period) => {
  currentPeriod.value = period;
};

// ฟังก์ชันอัปเดตช่วงวันที่
const handleDateChange = (range) => {
  let newStart, newEnd;

  if (range && range.start && range.end) {
    newStart = new Date(range.start);
    newEnd = new Date(range.end);
  } else if (Array.isArray(range) && range.length >= 2) {
    newStart = new Date(range[0]);
    newEnd = new Date(range[1]);
  } else {
    return;
  }

  const currentStart = dateRange.value[0] ? new Date(dateRange.value[0]) : null;
  const currentEnd = dateRange.value[1] ? new Date(dateRange.value[1]) : null;

  const isSameTime = (d1, d2) => {
    if (!d1 || !d2) return false;
    return Math.floor(d1.getTime() / 1000) === Math.floor(d2.getTime() / 1000);
  };

  if (isSameTime(newStart, currentStart) && isSameTime(newEnd, currentEnd)) {
    return;
  }

  dateRange.value = [newStart, newEnd];
};
</script>