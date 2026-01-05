<template>
  <div
    class="bg-white border border-gray-200 shadow-sm rounded-full p-2 flex flex-wrap items-center justify-between text-sm"
  >
    <div
      class="flex items-center bg-[#F8FAFC] rounded-full p-1 shadow-sm border border-gray-200"
    >
      <button
        v-for="period in ['24h', '7d', '1m', '1y', 'All']"
        :key="period"
        @click="selectPeriod(period)"
        :class="[
          'px-4 py-1 rounded-full transition duration-200',
          selectedPeriod === period
            ? 'bg-[#051960] font-bold text-white shadow-md'
            : 'text-gray-600 hover:bg-gray-100',
        ]"
      >
        {{ period }}
      </button>
    </div>

    <div class="hidden md:block">
      <VueDatePicker
        v-model="dateRange"
        range
        :enable-time-picker="false"
        @update:model-value="onDateChange"
      >
        <template #trigger>
          <div
            class="flex items-center gap-4 text-[#031350] font-medium cursor-pointer hover:opacity-80 transition"
          >
            <div
              class="flex items-center gap-2 bg-[#F8FAFC] px-4 py-1.5 rounded-full shadow-sm border border-gray-200 hover:ring-1 hover:ring-gray-300"
            >
              <span>{{ displayDateRange.start }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            <span class="text-gray-400">to</span>

            <div
              class="flex items-center gap-2 bg-[#F8FAFC] px-4 py-1.5 rounded-full shadow-sm border border-gray-200 hover:ring-1 hover:ring-gray-300"
            >
              <span>{{ displayDateRange.end }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </template>
      </VueDatePicker>
    </div>

    <div class="relative">
      <div
        @click="isOpen = !isOpen"
        class="min-w-[250px] bg-white px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer flex items-center justify-between"
        :class="[
          isOpen
            ? 'border-orange-500 ring-2 ring-orange-100'
            : 'border-gray-200 hover:border-orange-400 hover:shadow-md',
        ]"
      >
        <span class="font-medium text-[#051960] truncate">{{ currentViewName }}</span>
        <div class="text-gray-400 transition-transform duration-300 pointer-events-none" :class="{ 'rotate-180 text-orange-500': isOpen }">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-if="isOpen" class="absolute right-0 mt-2 w-full bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden py-1 z-50">
          <div
            v-for="item in menuOptions"
            :key="item.id"
            @click="selectMenu(item)"
            class="px-4 py-2 cursor-pointer transition-colors text-sm font-medium flex items-center justify-between"
            :class="[currentView === item.id ? 'bg-orange-50/50 text-orange-600' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600']"
          >
            <span>{{ item.name }}</span>
          </div>
        </div>
      </transition>
      <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0 z-40 bg-transparent cursor-default"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps({
  initialPeriod: { type: String, default: "1m" },
  initialView: { type: String, default: "sales" },
  dataStart: { type: [Date, String], default: null },
  dataEnd: { type: [Date, String], default: null }
});

const emit = defineEmits(["update:period", "update:date-range", "change-view"]);

const selectedPeriod = ref(props.initialPeriod);
const isOpen = ref(false);
const currentView = ref(props.initialView);
const dateRange = ref([new Date(), new Date()]);

const menuOptions = [
  { id: "sales", name: "ยอดขาย" },
  { id: "bill", name: "ยอดขายต่อบิลและจำนวนบิล" },
  { id: "behavior", name: "พฤติกรรมลูกค้า" },
];

watch([() => props.dataStart, () => props.dataEnd], ([newStart, newEnd]) => {
    if (selectedPeriod.value === 'All' && newStart) {
        const start = new Date(newStart);
        const end = newEnd ? new Date(newEnd) : new Date();
        dateRange.value = [start, end];
    }
});

const displayDateRange = computed(() => {
  const formatDate = (date) => {
    if (!date) return "-"; 
    const d = new Date(date);
    if (isNaN(d.getTime())) return "NaN"; 
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return {
    start: formatDate(dateRange.value[0]),
    end: formatDate(dateRange.value[1]),
  };
});

const currentViewName = computed(() => {
  return menuOptions.find((o) => o.id === currentView.value)?.name || "ยอดขาย";
});

const selectPeriod = (period) => {
  selectedPeriod.value = period;
  const end = new Date();
  const start = new Date();

  switch (period) {
    case "24h":
      start.setHours(0, 0, 0, 0);
      break;
    case "7d":
      start.setDate(end.getDate() - 7);
      break;
    case "1m":
      start.setMonth(end.getMonth() - 1);
      break;
    case "1y":
      start.setFullYear(end.getFullYear() - 1);
      break;
    case "All":
      if (props.dataStart) {
          start.setTime(new Date(props.dataStart).getTime());
          if (props.dataEnd) end.setTime(new Date(props.dataEnd).getTime());
      } else {
          start.setFullYear(new Date().getFullYear(), 0, 1);
      }
      break;
  }

  dateRange.value = [start, end];
  emit("update:period", period);
  emit("update:date-range", { start, end });
};

const onDateChange = (newRange) => {
  if (newRange) {
    selectedPeriod.value = null;
    emit("update:date-range", { start: newRange[0], end: newRange[1] });
  }
};

const selectMenu = (item) => {
  currentView.value = item.id;
  isOpen.value = false;
  emit("change-view", item.id);
};

onMounted(() => {
  selectPeriod(props.initialPeriod);
});
</script>