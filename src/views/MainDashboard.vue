<template>
  <div class="min-h-screen bg-gray-50 p-6">

    <div class="mb-6">
      <FilterBar 
        :initial-period="currentPeriod"
        :initial-view="currentView"
        @update:period="handlePeriodChange"
        @update:date-range="handleDateChange"
        @change-view="handleChangeView"
      />
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6 min-h-[500px]">
      <KeepAlive>
        <component 
          :is="currentComponent" 
          :date-range="dateRange" 
          :period="currentPeriod"
        />
      </KeepAlive>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, shallowRef } from 'vue';

import FilterBar from '@/components/FilterBar.vue'; 
import DashboardView from '@/views/DashboardView.vue';
import DashboardBillView from '@/views/DashboardBillView.vue';
import DashboardBehaviorView from '@/views/DashboardBehaviorView.vue';

const currentView = ref('sales'); 
const currentPeriod = ref('1m');
const dateRange = ref([new Date(), new Date()]);

const currentComponent = computed(() => {
  switch (currentView.value) {
    case 'sales': 
      return DashboardView;
    case 'bill': 
      return DashboardBillView;
    case 'behavior': 
      return DashboardBehaviorView;
    default: 
      return DashboardView;
  }
});

const handleChangeView = (viewId) => {
  currentView.value = viewId; 
};

const handlePeriodChange = (period) => {
  currentPeriod.value = period;
};

const handleDateChange = (range) => {
  dateRange.value = range;
};
</script>