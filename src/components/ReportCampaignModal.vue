<template>
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <div
        class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        @click="closeModal"
      ></div>

      <div
        class="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div
          class="bg-white px-8 pt-8 pb-2 flex justify-between items-start shrink-0"
        >
          <div>
            <div class="flex items-center gap-3 mb-2">
              <h3 class="text-2xl font-bold text-[#051960]">
                {{ $t("report_campaign_modal.header.title") }}
              </h3>
              <span
                v-if="currentDetail?.status"
                class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                :class="[
                  currentDetail.status === 'completed'
                    ? 'bg-green-50 text-green-600 border-green-100'
                    : currentDetail.status === 'paused'
                      ? 'bg-orange-50 text-orange-600 border-orange-100'
                      : 'bg-gray-50 text-gray-500 border-gray-100',
                ]"
              >
                {{
                  currentDetail.status === "completed"
                    ? $t("report_campaign_modal.header.status.completed")
                    : currentDetail.status === "active"
                      ? "Active"
                      : currentDetail.status === "paused"
                        ? "Paused"
                        : $t("report_campaign_modal.header.status.cancelled")
                }}
              </span>
            </div>

            <p class="text-[#051960] text-base font-medium">
              {{ campaign?.name || $t("report_campaign_modal.header.loading") }}
            </p>

            <div
              class="flex items-center gap-1.5 mt-1 text-xs text-gray-400 font-light"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5"
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
              {{ formatDate(campaign?.startDate) }} -
              {{ formatDate(campaign?.endDate) }}
            </div>
          </div>

          <button
            @click="closeModal"
            class="bg-gray-50 hover:bg-gray-100 p-2.5 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="p-8 pt-6 space-y-8 overflow-y-auto custom-scrollbar pb-10">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div
              class="bg-[#F8FAFC] rounded-[1.5rem] p-5 border border-slate-100 relative group"
            >
              <div class="relative z-10">
                <p
                  class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2"
                >
                  {{ $t("report_campaign_modal.stats.revenue_label") }}
                </p>
                <h4 class="text-2xl font-bold text-[#051960]">
                  ฿{{ formatNumber(currentDetail?.total_revenue) }}
                </h4>
                <div
                  class="flex items-center gap-1 mt-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 w-fit px-2 py-0.5 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span
                    >{{
                      calculateVsTarget(
                        currentDetail?.total_revenue,
                        currentDetail?.target_revenue,
                      )
                    }}%</span
                  >
                  <span class="text-emerald-400 font-medium ml-1">{{
                    $t("report_campaign_modal.stats.vs_target")
                  }}</span>
                </div>
              </div>
            </div>

            <div
              class="bg-[#F8FAFC] rounded-[1.5rem] p-5 border border-slate-100 relative group"
            >
              <div class="relative z-10">
                <p
                  class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2"
                >
                  {{ $t("report_campaign_modal.stats.orders_label") }}
                </p>
                <h4 class="text-2xl font-bold text-[#051960]">
                  {{ currentDetail?.total_matched_bills }}
                  <span class="text-sm font-normal text-slate-400">{{
                    $t("report_campaign_modal.stats.unit_items")
                  }}</span>
                </h4>
                <div
                  class="flex items-center gap-1 mt-2 text-[10px] font-medium text-slate-400 bg-slate-100 w-fit px-2 py-0.5 rounded-full"
                >
                  <span>{{
                    $t("report_campaign_modal.stats.avg_bill_format", {
                      n: averageBill,
                    })
                  }}</span>
                </div>
              </div>
            </div>

            <div
              class="bg-[#FFF7ED] rounded-[1.5rem] p-5 border border-orange-100 relative group"
            >
              <div class="relative z-10">
                <p
                  class="text-[10px] font-bold text-orange-400 uppercase tracking-wider mb-2"
                >
                  {{ $t("report_campaign_modal.stats.roi_label") }}
                </p>
                <h4 class="text-2xl font-bold text-[#051960]">
                  {{ currentDetail?.roi }}%
                </h4>
                <div
                  class="flex items-center gap-1 mt-2 text-[10px] font-bold text-orange-600 bg-orange-100 w-fit px-2 py-0.5 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>{{
                    $t("report_campaign_modal.stats.impact_high")
                  }}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-6">
              <h4 class="font-bold text-[#051960] text-lg">
                {{ $t("report_campaign_modal.chart.title") }}
              </h4>
              <div class="flex gap-2 items-center">
                <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span class="text-xs text-gray-500 font-medium">{{
                  $t("report_campaign_modal.chart.legend_actual")
                }}</span>
              </div>
            </div>

            <div
              class="h-56 flex items-end justify-between gap-3 md:gap-6 pt-6 pb-2 border-b border-gray-100 relative"
            >
              <div
                class="absolute inset-0 flex flex-col justify-between pointer-events-none"
              >
                <div
                  class="w-full h-px bg-gray-50 border-t border-dashed border-gray-200"
                ></div>
                <div
                  class="w-full h-px bg-gray-50 border-t border-dashed border-gray-200"
                ></div>
                <div
                  class="w-full h-px bg-gray-50 border-t border-dashed border-gray-200"
                ></div>
                <div
                  class="w-full h-px bg-gray-50 border-t border-dashed border-gray-200"
                ></div>
              </div>

              <div
                v-for="(val, index) in chartData"
                :key="index"
                class="relative flex-1 flex flex-col items-center group cursor-pointer"
              >
                <div
                  class="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-[#051960] text-white text-[10px] py-1.5 px-3 rounded-lg mb-2 pointer-events-none whitespace-nowrap z-20 shadow-lg translate-y-2 group-hover:translate-y-0"
                >
                  ฿{{ formatNumber(val.value) }}
                  <div
                    class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#051960] rotate-45"
                  ></div>
                </div>

                <div
                  class="w-full max-w-[48px] bg-blue-100 rounded-t-lg group-hover:bg-blue-500 transition-all duration-300 relative z-10"
                  :style="{ height: val.percent + '%' }"
                ></div>

                <div class="mt-3 text-[10px] text-gray-400 font-medium">
                  {{ val.day }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useCampaignStore } from "@/stores/campaign";
import { storeToRefs } from "pinia";

const props = defineProps({
  isOpen: Boolean,
  campaign: Object,
});

const emit = defineEmits(["close"]);
const { t, locale } = useI18n();

const campaignStore = useCampaignStore();
const { currentDetail, isLoading } = storeToRefs(campaignStore);

const chartData = computed(() => {
  if (
    !currentDetail.value?.daily_stats ||
    currentDetail.value.daily_stats.length === 0
  ) {
    return [];
  }

  const stats = currentDetail.value.daily_stats;

  const values = stats.map((s) => parseFloat(s.revenue_generated || 0));
  const maxRev = Math.max(...values, 1); 

  return stats.map((s) => {
    const val = parseFloat(s.revenue_generated || 0);
    return {
      day: formatDateShort(s.stat_date),
      value: val,
      percent: maxRev > 0 ? (val / maxRev) * 100 : 0,
    };
  });
});

const averageBill = computed(() => {
  const rev = parseFloat(currentDetail.value?.total_revenue || 0);
  const bills = parseInt(currentDetail.value?.total_matched_bills || 0);
  if (bills <= 0) return 0;
  return Math.round(rev / bills);
});

watch(
  () => props.isOpen,
  async (newVal) => {
    if (newVal && props.campaign) {
      const id = props.campaign.campaign_id || props.campaign.id;
      await campaignStore.fetchCampaignDetail(id);
    }
  },
);

const closeModal = () => {
  emit("close");
};

const formatNumber = (num) => {
  return new Intl.NumberFormat("en-US").format(num || 0);
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const options = { day: "numeric", month: "short", year: "numeric" };
  return new Date(dateString).toLocaleDateString(locale.value, options);
};

const formatDateShort = (dateString) => {
  return new Date(dateString).toLocaleDateString(locale.value, {
    day: "numeric",
    month: "short",
  });
};

// เพิ่มฟังก์ชันคำนวณ % เทียบเป้าหมาย
const calculateVsTarget = (current, target) => {
  const currNum = parseFloat(current || 0);
  const targetNum = parseFloat(target || 0);

  if (targetNum <= 0) return "0.0";

  if (currNum === 0) return "0.0";

  const percentage = ((currNum - targetNum) / targetNum) * 100;

  return percentage > 0 ? `+${percentage.toFixed(1)}` : percentage.toFixed(1);
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.w-full.max-w-\[48px\].bg-blue-100 {
  min-height: 2px;
}

@media (max-width: 767px) {
  .bg-white.rounded-\[2\.5rem\] {
    border-radius: 1.5rem !important;
    width: 95% !important;
    max-height: 85vh !important;
  }

  .bg-white.px-8.pt-8.pb-2 {
    padding-left: 1.25rem !important;
    padding-right: 1.25rem !important;
    padding-top: 1.25rem !important;
    padding-bottom: 0.5rem !important;
  }

  h3.text-2xl {
    font-size: 1.25rem !important;
  }

  .p-8.pt-6.space-y-8 {
    padding: 1.25rem !important;
    padding-top: 1rem !important;
  }

  .p-8.pt-6.space-y-8 > :not([hidden]) ~ :not([hidden]) {
    margin-top: 1.5rem !important;
  }

  .grid.grid-cols-1.md\:grid-cols-3.gap-5 {
    gap: 0.75rem !important;
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
  }

  .grid.grid-cols-1.md\:grid-cols-3.gap-5 > div:last-child {
    grid-column: span 2;
  }

  .rounded-\[1\.5rem\].p-5 {
    padding: 1rem !important;
    border-radius: 1rem !important;
  }

  h4.text-2xl {
    font-size: 1.25rem !important;
  }

  .h-56.flex.items-end {
    height: 10rem !important;
    padding-bottom: 0 !important;
    border-bottom: 1px solid #f3f4f6 !important;
    overflow: visible !important;
    margin-bottom: 1.5rem !important;
  }

  .mt-3.text-\[10px\] {
    font-size: 9px !important;
    position: absolute !important;
    bottom: -1.25rem !important;
    left: 0 !important;
    width: 100% !important;
    text-align: center !important;
    margin-top: 0 !important;
  }

  button.p-2\.5 {
    padding: 0.5rem !important;
  }
  .bg-white.px-8.pt-8.pb-2 > div > .flex.items-center.gap-3.mb-2 {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 0.25rem !important;
    margin-bottom: 0.5rem !important;
  }

  .bg-white.px-8.pt-8.pb-2 > div > .flex.items-center.gap-3.mb-2 span {
    margin: 0 !important;
  }

  .grid.grid-cols-1.md\:grid-cols-3.gap-5
    > div:first-child
    .flex.items-center.gap-1.mt-2 {
    white-space: nowrap !important;
    max-width: 100%;
    overflow: hidden;
  }
  .grid.grid-cols-1.md\:grid-cols-3.gap-5
    > div:first-child
    .flex.items-center.gap-1.mt-2
    span {
    font-size: 0.6rem !important;
  }

  .bg-\[\#FFF7ED\] .relative.z-10 {
    display: flex !important;
    flex-wrap: wrap !important;
    align-items: center !important;
    row-gap: 0.25rem !important;
  }

  .bg-\[\#FFF7ED\] p {
    width: 100% !important;
    margin-bottom: 0 !important;
  }

  .bg-\[\#FFF7ED\] h4 {
    margin-right: 0.5rem !important;
    margin-bottom: 0 !important;
  }

  .bg-\[\#FFF7ED\] .flex.items-center.gap-1.mt-2 {
    margin-top: 0 !important;
  }

  .p-8.pt-6.space-y-8 {
    padding-bottom: 2rem !important;
  }

  .flex.items-center.justify-between.mb-6 {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}
</style>
