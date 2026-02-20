<template>
  <div class="space-y-4 md:space-y-6 font-sans text-[#051960] animate-fade-in">
    <div
      v-if="dashboardStore.isLoading"
      class="flex justify-center items-center h-40"
    >
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#051960]"
      ></div>
    </div>

    <div v-else class="space-y-4 md:space-y-6">
      <div class="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
        <div
          class="bg-white shadow-sm rounded-2xl p-3 md:p-6 flex flex-col justify-between md:h-40 border border-gray-100"
        >
          <div class="flex justify-between items-center">
            <div class="text-xs md:text-sm font-medium text-gray-500">
              {{ $t("dashboard_view.cards.sales_title") }}
            </div>
            <div class="p-1.5 md:p-2 bg-blue-50 rounded-lg text-blue-600">
              <svg
                class="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div class="mt-2">
            <div class="text-lg md:text-2xl lg:text-3xl font-bold">
              ฿{{
                dashboardStore.overviewData?.summary?.total_sales?.toLocaleString(
                  undefined,
                  { minimumFractionDigits: 2, maximumFractionDigits: 2 },
                ) || "0.00"
              }}
            </div>
            <div
              :class="[
                'text-[10px] md:text-xs font-bold px-1.5 py-0.5 rounded-full inline-block mt-1',
                dashboardStore.overviewData?.summary?.growth
                  ?.sales_growth_pct >= 0
                  ? 'text-green-700 bg-green-100'
                  : 'text-red-700 bg-red-100',
              ]"
            >
              {{
                (dashboardStore.overviewData?.summary?.growth
                  ?.sales_growth_pct >= 0
                  ? "+"
                  : "") +
                dashboardStore.overviewData?.summary?.growth?.sales_growth_pct
              }}%
            </div>
          </div>
        </div>

        <div
          class="bg-white shadow-sm rounded-2xl p-3 md:p-6 flex flex-col justify-between md:h-40 border border-gray-100"
        >
          <div class="flex justify-between items-center">
            <div class="text-xs md:text-sm font-medium text-gray-500">
              {{ $t("dashboard_view.summary_stats.avg_bill") }}
            </div>
            <div class="p-1.5 md:p-2 bg-green-50 rounded-lg text-green-600">
              <svg
                class="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
          <div class="mt-2">
            <div class="text-lg md:text-2xl lg:text-3xl font-bold">
              ฿{{
                dashboardStore.overviewData?.summary?.average_bill?.toLocaleString(
                  undefined,
                  { minimumFractionDigits: 2, maximumFractionDigits: 2 },
                ) || "0.00"
              }}
            </div>
            <div class="text-[10px] md:text-xs text-gray-400 mt-1">
              {{ dashboardStore.overviewData?.summary?.total_orders || 0 }}
              {{ $t("dashboard_view.summary_stats.table_headers.qty") }}
            </div>
          </div>
        </div>

        <div
          class="bg-white shadow-sm rounded-2xl p-3 md:p-6 flex flex-col justify-between md:h-40 border border-gray-100"
        >
          <div class="flex justify-between items-center">
            <div class="text-xs md:text-sm font-medium text-gray-500">
              {{ $t("dashboard_view.cards.top_menu_title") }}
            </div>
            <div class="p-1.5 md:p-2 bg-orange-50 rounded-lg text-orange-500">
              <svg
                class="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
          </div>
          <div class="mt-1">
            <div class="text-base md:text-xl font-bold truncate">
              {{
                dashboardStore.overviewData?.top_menus?.[0]?.menu_name || "-"
              }}
            </div>
            <div class="text-[10px] md:text-sm text-gray-500">
              {{ $t("dashboard_view.cards.sold_label") }}
              <span class="font-bold text-[#051960]">{{
                dashboardStore.overviewData?.top_menus?.[0]?.total_qty || 0
              }}</span>
            </div>
          </div>
        </div>

        <div
          class="bg-white shadow-sm rounded-2xl p-3 md:p-6 flex flex-col justify-between md:h-40 border border-gray-100"
        >
          <div class="flex justify-between items-center">
            <div class="text-xs md:text-sm font-medium text-gray-500">
              {{ $t("dashboard_view.cards.peak_time_title") }}
            </div>
            <div class="p-1.5 md:p-2 bg-purple-50 rounded-lg text-purple-600">
              <svg
                class="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div class="mt-2 text-xl md:text-2xl lg:text-3xl font-bold">
            {{
              dashboardStore.overviewData?.busiest_hour?.time_range || "--:--"
            }}
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-2xl p-4 md:p-6">
        <div class="text-base md:text-xl font-bold mb-4">
          {{ $t("dashboard_view.sales_trend.title") }}
        </div>
        <div class="w-full h-64 md:h-80">
          <SalesChart
            :data="
              isHourlyView
                ? dashboardStore.overviewData?.sales_by_hour || []
                : dashboardStore.overviewData?.sales_trend || []
            "
            :forecast="dashboardStore.overviewData?.sales_forecast || []"
            :period="period"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-10 gap-4 md:gap-6">
        <div
          class="lg:col-span-4 bg-white shadow rounded-2xl p-4 md:p-6 flex flex-col items-center h-[450px]"
        >
          <div class="text-base md:text-xl font-bold mb-6">
            {{ $t("dashboard_view.promotion_chart.title") }}
          </div>
          <div
            class="relative w-full flex-grow flex items-center justify-center"
          >
            <div class="w-48 h-48 md:w-64 md:h-64">
              <PromotionPieChart
                :promotion-amount="0"
                :regular-amount="
                  dashboardStore.overviewData?.summary?.total_sales || 0
                "
              />
            </div>
          </div>
          <div class="grid grid-cols-1 gap-2 w-full mt-4">
            <div
              class="flex justify-between items-center bg-gray-50 p-2 px-4 rounded-xl border border-gray-100"
            >
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-[#F47122]"></span
                ><span class="text-sm">{{
                  $t("dashboard_view.promotion_chart.promo")
                }}</span>
              </div>
              <span class="font-bold">฿0</span>
            </div>
            <div
              class="flex justify-between items-center bg-gray-50 p-2 px-4 rounded-xl border border-gray-100"
            >
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-[#002683]"></span
                ><span class="text-sm">{{
                  $t("dashboard_view.promotion_chart.regular")
                }}</span>
              </div>
              <span class="font-bold"
                >฿{{
                  dashboardStore.overviewData?.summary?.total_sales?.toLocaleString()
                }}</span
              >
            </div>
          </div>
        </div>

        <div
          class="lg:col-span-6 bg-white shadow rounded-2xl flex flex-col h-[450px] overflow-hidden"
        >
          <div
            class="bg-gray-100/70 px-4 py-4 border-b border-gray-100 flex justify-between items-center"
          >
            <span class="font-bold text-sm md:text-lg">{{
              $t("dashboard_view.top_menu_table.title")
            }}</span>
          </div>
          <div class="overflow-y-auto flex-grow scrollbar-hide">
            <table class="w-full text-sm text-left">
              <thead
                class="sticky top-0 bg-white shadow-sm z-10 uppercase text-[10px] md:text-xs text-gray-500 border-b"
              >
                <tr>
                  <th class="px-4 py-3">
                    {{ $t("dashboard_view.top_menu_table.headers.rank") }}
                  </th>
                  <th class="px-4 py-3">
                    {{ $t("dashboard_view.top_menu_table.headers.menu") }}
                  </th>
                  <th class="px-4 py-3 text-right">
                    {{ $t("dashboard_view.top_menu_table.headers.sales") }}
                  </th>
                  <th class="px-4 py-3 text-center">
                    {{ $t("dashboard_view.top_menu_table.headers.qty") }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr
                  v-for="(item, index) in dashboardStore.overviewData
                    ?.top_menus || []"
                  :key="index"
                  class="hover:bg-gray-50 transition-colors"
                >
                  <td class="px-4 py-4 font-medium text-gray-400">
                    {{ index + 1 }}
                  </td>
                  <td
                    class="px-4 py-4 font-bold text-[#051960] truncate max-w-[150px]"
                  >
                    {{ item.menu_name }}
                  </td>
                  <td class="px-4 py-4 text-right">
                    ฿{{
                      item.total_sales.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })
                    }}
                  </td>
                  <td class="px-4 py-4 text-center">
                    <span
                      class="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium"
                      >{{ item.total_qty }}</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <EmptyStateModal
      :is-open="showEmptyState"
      @close="showEmptyState = false"
      @setup="handleGoToSetup"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, watch, ref } from "vue";
import { useRouter } from "vue-router";
import { useDashboardStore } from "@/stores/dashboard";
import { useI18n } from "vue-i18n";
import SalesChart from "@/components/SalesChart.vue";
import PromotionPieChart from "@/components/PromotionPieChart.vue";
import EmptyStateModal from "@/components/EmptyStateModal.vue";

// รับ Props จาก MainDashboard (ช่วงวันที่, Period)
const props = defineProps({
  dateRange: { type: Array, default: () => [new Date(), new Date()] },
  period: { type: String, default: "1m" },
});

const dashboardStore = useDashboardStore();
const { t } = useI18n();

const router = useRouter();
const showEmptyState = ref(false);

const isHourlyView = computed(() => {
  if (props.period === "24h") return true;

  if (props.dateRange && props.dateRange[0] && props.dateRange[1]) {
    const start = new Date(props.dateRange[0]).setHours(0, 0, 0, 0);
    const end = new Date(props.dateRange[1]).setHours(0, 0, 0, 0);
    return start === end;
  }

  return false;
});

const handleGoToSetup = () => {
  showEmptyState.value = false;
  router.push({ name: "pos-info" });
};

// ดึงข้อมูล Overview
const fetchData = async () => {
  showEmptyState.value = false;

  await Promise.all([
    dashboardStore.fetchDashboardOverview(props.period, props.dateRange),
    dashboardStore.checkImportHistory(),
  ]);

  const totalSales = dashboardStore.overviewData?.summary?.total_sales || 0;
  const hasFile = dashboardStore.hasImportHistory;

  if (totalSales === 0 && !hasFile && !dashboardStore.isLoading) {
    showEmptyState.value = true;
  }
};

onMounted(() => fetchData());

// ถ้าวันที่ หรือ Period เปลี่ยน ให้ดึงข้อมูลใหม่
watch([() => props.dateRange, () => props.period], async () => {
  await fetchData();
});
</script>
