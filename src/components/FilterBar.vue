<template>
  <div
    class="flex flex-col md:flex-row items-stretch md:items-center gap-3 p-0"
  >
    <div class="relative flex-1 md:flex-none">
      <div
        @click="isOpen = !isOpen"
        class="w-full md:min-w-[160px] bg-white px-4 py-2 rounded-full border border-gray-200 transition-all duration-300 cursor-pointer flex items-center justify-between hover:border-orange-400 shadow-sm"
        :class="{ 'border-orange-500 ring-2 ring-orange-100': isOpen }"
      >
        <span class="font-bold text-[#051960] truncate text-xs md:text-sm">
          {{ currentViewName }}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-gray-400 transition-transform"
          :class="{ 'rotate-180 text-orange-500': isOpen }"
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
          v-if="isOpen"
          class="absolute left-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50"
        >
          <div
            v-for="item in menuOptions"
            :key="item.id"
            @click="selectMenu(item)"
            class="px-4 py-2.5 cursor-pointer text-xs md:text-sm font-medium flex items-center justify-between"
            :class="[
              currentView === item.id
                ? 'bg-orange-50 text-orange-600'
                : 'text-gray-700 hover:bg-orange-50',
            ]"
          >
            <span>{{ $t(`filter_bar.views.${item.id}`) }}</span>
          </div>
        </div>
      </transition>

      <div
        v-if="isOpen"
        @click="isOpen = false"
        class="fixed inset-0 z-40 bg-transparent"
      ></div>
    </div>

    <div class="flex-1 md:flex-none">
      <VueDatePicker
        v-model="dateRange"
        range
        :enable-time-picker="false"
        :preset-dates="presetDates"
        vertical
        inline-with-input
        :max-date="new Date()"
        @update:model-value="onDateChange"
        auto-apply
      >
        <template #trigger>
          <div
            class="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 cursor-pointer hover:border-orange-400 transition shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span class="text-[#031350] font-medium text-xs md:text-sm">
              {{ displayDateRange.start }} - {{ displayDateRange.end }}
            </span>
          </div>
        </template>
      </VueDatePicker>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import { subDays, subMonths, subYears, startOfDay, endOfDay } from "date-fns";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps({
  initialPeriod: { type: String, default: "1m" },
  initialView: { type: String, default: "sales" },
  dataStart: { type: [Date, String], default: null },
  dataEnd: { type: [Date, String], default: null },
});

const emit = defineEmits(["update:period", "update:date-range", "change-view"]);
const { t } = useI18n();

const isOpen = ref(false);
const currentView = ref(props.initialView);
const dateRange = ref([null, null]);

const menuOptions = [{ id: "sales" }, { id: "bill" }, { id: "behavior" }];

// สร้างปุ่มลัดภายใน DatePicker
const presetDates = computed(() => [
  {
    label: t("filter_bar.periods.24h"),
    value: [startOfDay(new Date()), endOfDay(new Date())],
  },
  {
    label: t("filter_bar.periods.7d"),
    value: [subDays(new Date(), 7), new Date()],
  },
  {
    label: t("filter_bar.periods.1m"),
    value: [subMonths(new Date(), 1), new Date()],
  },
  {
    label: t("filter_bar.periods.1y"),
    value: [subYears(new Date(), 1), new Date()],
  },
]);

const displayDateRange = computed(() => {
  const formatDate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  };
  return {
    start: formatDate(dateRange.value?.[0]),
    end: formatDate(dateRange.value?.[1]),
  };
});

const currentViewName = computed(() =>
  t(`filter_bar.views.${currentView.value}`),
);

const onDateChange = (newRange) => {
  if (newRange) {
    dateRange.value = newRange;

    const diffTime = Math.abs(newRange[1] - newRange[0]);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    emit("update:date-range", { start: newRange[0], end: newRange[1] });

    if (diffDays >= 28 && diffDays <= 31) {
      emit("update:period", "1m");
    } else {
      emit("update:period", null);
    }
  }
};

const selectMenu = (item) => {
  currentView.value = item.id;
  isOpen.value = false;
  emit("change-view", item.id);
};

onMounted(() => {
  const end = new Date();
  let start = subMonths(end, 1);
  if (props.initialPeriod === "24h") start = startOfDay(end);
  else if (props.initialPeriod === "7d") start = subDays(end, 7);
  else if (props.initialPeriod === "1y") start = subYears(end, 1);

  dateRange.value = [start, end];
});
</script>

<style scoped>
:deep(.dp__preset_dates) {
  padding: 12px 8px;
  min-width: 80px;
  border-right: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

:deep(.dp__preset_date) {
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #475569;
  transition: all 0.2s ease;
  text-align: center;
  cursor: pointer;
}

:deep(.dp__preset_date:hover) {
  background-color: #f1f5f9;
  color: #051960;
}

:deep(.dp__menu) {
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-right: 16px;
}

@media (max-width: 768px) {
  :deep(.dp__menu) {
    margin-right: 8px;
  }
}
</style>
