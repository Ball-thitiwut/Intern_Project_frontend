<template>
  <div>
    <div class="flex items-center justify-between mb-4 md:mb-6 px-0 md:px-0">
      <h1 class="text-2xl md:text-4xl font-bold text-[#051960] tracking-tight">
        Dashboard
      </h1>

      <div class="relative md:hidden">
        <div
          @click="isMobileDropdownOpen = !isMobileDropdownOpen"
          class="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border shadow-sm cursor-pointer transition-all"
          :class="
            isMobileDropdownOpen
              ? 'border-orange-500 ring-1 ring-orange-100'
              : 'border-gray-200'
          "
        >
          <span class="text-xs font-bold text-[#051960]">{{
            currentViewName
          }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3 text-gray-400"
            :class="{ 'rotate-180': isMobileDropdownOpen }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <div
            v-if="isMobileDropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-1 z-50"
          >
            <div
              v-for="item in menuOptions"
              :key="item.id"
              @click="handleMobileMenuSelect(item.id)"
              class="px-4 py-2.5 text-xs font-medium cursor-pointer flex items-center justify-between"
              :class="
                currentView === item.id
                  ? 'bg-orange-50 text-orange-600'
                  : 'text-gray-600 hover:bg-gray-50'
              "
            >
              {{ item.name }}
              <span v-if="currentView === item.id">✓</span>
            </div>
          </div>
        </transition>

        <div
          v-if="isMobileDropdownOpen"
          @click="isMobileDropdownOpen = false"
          class="fixed inset-0 z-40 bg-transparent"
        ></div>
      </div>
    </div>

    <div class="mb-4 md:mb-6 px-0 md:px-0">
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

// Mobile Dropdown State
const isMobileDropdownOpen = ref(false);
const menuOptions = [
  { id: "sales", name: "ยอดขาย" },
  { id: "bill", name: "ยอดขายต่อบิลฯ" },
  { id: "behavior", name: "พฤติกรรมลูกค้า" },
];

const currentViewName = computed(() => {
  return menuOptions.find((o) => o.id === currentView.value)?.name || "ยอดขาย";
});

const handleMobileMenuSelect = (id) => {
  handleChangeView(id);
  isMobileDropdownOpen.value = false;
};

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

// เลือกว่าจะดู Tab ไหน
const currentComponent = computed(() => {
  switch (currentView.value) {
    case "sales":
      return DashboardView;
    case "bill":
      return DashboardBillView;
    case "behavior":
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
