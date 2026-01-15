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
      <div class="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
        <div
          class="col-span-1 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl p-3 md:p-6 flex flex-col justify-between h-auto min-h-[100px] md:h-40 border border-gray-100"
        >
          <div class="flex justify-between items-start md:items-center">
            <div class="text-xs md:text-sm font-medium text-gray-500">
              ยอดขาย
            </div>
            <div class="p-1.5 md:p-2 bg-blue-50 rounded-lg text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
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
          <div>
            <div
              class="text-lg md:text-3xl font-bold text-[#051960] leading-tight mt-1 md:mt-0"
            >
              ฿{{
                dashboardStore.overviewData?.summary?.total_sales?.toLocaleString() ||
                0
              }}
            </div>
            <div class="flex items-center gap-2 mt-1 md:mt-2">
              <span
                class="flex items-center text-[10px] md:text-xs font-bold px-1.5 py-0.5 rounded-full"
                :class="
                  parseFloat(
                    dashboardStore.overviewData?.summary?.growth
                      ?.sales_growth_pct
                  ) >= 0
                    ? 'text-green-700 bg-green-100'
                    : 'text-red-700 bg-red-100'
                "
              >
                {{
                  dashboardStore.overviewData?.summary?.growth
                    ?.sales_growth_pct || 0
                }}%
              </span>
              <span class="hidden md:inline text-xs text-gray-400"
                >จากช่วงก่อนหน้า</span
              >
            </div>
          </div>
        </div>

        <div
          class="col-span-1 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl p-3 md:p-6 flex flex-col justify-between h-auto min-h-[100px] md:h-40 border border-gray-100"
        >
          <div class="flex justify-between items-start md:items-center">
            <div class="text-xs md:text-sm font-medium text-gray-500">
              เมนูฮิต
            </div>
            <div class="p-1.5 md:p-2 bg-orange-50 rounded-lg text-orange-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
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
          <div>
            <div
              class="text-base md:text-2xl font-bold text-[#051960] leading-tight truncate mt-1 md:mt-0"
              :title="dashboardStore.overviewData?.top_menus?.[0]?.menu_name"
            >
              {{
                dashboardStore.overviewData?.top_menus?.[0]?.menu_name || "-"
              }}
            </div>
            <div class="text-[10px] md:text-sm text-gray-500 mt-1 md:mt-2">
              <span class="hidden md:inline">ขายไปแล้ว</span>
              <span class="text-[#051960] font-bold text-sm md:text-lg md:ml-1">
                {{
                  dashboardStore.overviewData?.top_menus?.[0]?.total_qty || 0
                }}
              </span>
              <span class="text-[10px] md:text-xs text-gray-400 ml-1">จาน</span>
            </div>
          </div>
        </div>

        <div
          class="col-span-2 md:col-span-1 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl p-3 md:p-6 flex flex-row md:flex-col justify-between items-center md:items-stretch h-auto md:h-40 border border-gray-100"
        >
          <div class="flex items-center md:justify-between gap-3 md:gap-0">
            <div class="p-1.5 md:p-2 bg-purple-50 rounded-lg text-purple-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
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
            <div
              class="text-xs md:text-sm font-medium text-gray-500 md:order-first"
            >
              ช่วงเวลาพีค
            </div>
          </div>
          <div class="text-right md:text-left">
            <div
              class="text-xl md:text-3xl font-bold text-[#051960] leading-tight"
            >
              {{
                dashboardStore.overviewData?.busiest_hour?.time_range || "--:--"
              }}
            </div>
            <div
              class="hidden md:flex text-xs text-gray-400 mt-2 items-center gap-1"
            >
              <span class="w-2 h-2 rounded-full bg-red-400"></span>
              ช่วงเวลาที่มีออเดอร์หนาแน่น
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-2xl p-4 md:p-6">
        <div class="text-base md:text-xl font-bold text-[#051960] mb-4">
          แนวโน้มยอดขาย
        </div>
        <div class="w-full h-56 md:h-80 relative">
          <SalesChart
            :data="
              period === '24h'
                ? dashboardStore.overviewData?.sales_by_hour || []
                : dashboardStore.overviewData?.sales_trend || []
            "
            :forecast="dashboardStore.overviewData?.sales_forecast || []"
            :period="period"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div class="grid grid-cols-1 gap-3 md:block md:space-y-6">
          <div class="bg-white shadow rounded-2xl p-3 md:p-6">
            <div
              class="mb-3 md:mb-4 flex justify-between items-center md:block"
            >
              <div
                class="text-xs md:text-base font-medium text-gray-600 md:mb-1"
              >
                ยอดขายทั้งหมด
              </div>
              <div class="flex items-baseline gap-2">
                <span class="text-lg md:text-2xl font-bold text-[#051960]">
                  ฿{{
                    dashboardStore.overviewData?.summary?.total_sales?.toLocaleString() ||
                    0
                  }}
                </span>
                <span
                  class="text-[10px] md:text-sm font-semibold text-green-600 bg-green-100 px-1.5 py-0.5 rounded"
                >
                  +{{
                    dashboardStore.overviewData?.summary?.growth
                      ?.sales_growth_pct || 0
                  }}%
                </span>
              </div>
            </div>
            <div class="bg-gray-50 rounded-lg p-2">
              <div
                class="grid grid-cols-3 text-gray-500 mb-1 px-1 text-[10px] md:text-sm"
              >
                <span class="text-left">สถานะ</span
                ><span class="text-center">ราคา</span
                ><span class="text-right">% เปลี่ยน</span>
              </div>
              <div
                class="grid grid-cols-3 font-medium text-[#051960] bg-white p-2 rounded shadow-sm border border-gray-100 text-[10px] md:text-base"
              >
                <span class="text-left">แบบขาย</span>
                <span class="text-center"
                  >฿{{
                    dashboardStore.overviewData?.summary?.total_sales?.toLocaleString() ||
                    0
                  }}</span
                >
                <span class="text-right"
                  >{{
                    dashboardStore.overviewData?.summary?.growth
                      ?.sales_growth_pct || 0
                  }}%</span
                >
              </div>
            </div>
          </div>

          <div class="bg-white shadow rounded-2xl p-3 md:p-6">
            <div
              class="mb-3 md:mb-4 flex justify-between items-center md:block"
            >
              <div
                class="text-xs md:text-base font-medium text-gray-600 md:mb-1"
              >
                ค่าเฉลี่ยต่อบิล
              </div>
              <div class="flex items-baseline gap-2">
                <span class="text-lg md:text-2xl font-bold text-[#051960]">
                  ฿{{ dashboardStore.overviewData?.summary?.average_bill || 0 }}
                </span>
              </div>
            </div>
            <div class="bg-gray-50 rounded-lg p-2">
              <div
                class="grid grid-cols-3 text-gray-500 mb-1 px-1 text-[10px] md:text-sm"
              >
                <span class="text-left">สถานะ</span
                ><span class="text-center">ราคา</span
                ><span class="text-right">จำนวน</span>
              </div>
              <div
                class="grid grid-cols-3 font-medium text-[#051960] bg-white p-2 rounded shadow-sm border border-gray-100 text-[10px] md:text-base"
              >
                <span class="text-left">เฉลี่ย</span>
                <span class="text-center"
                  >฿{{
                    dashboardStore.overviewData?.summary?.average_bill || 0
                  }}</span
                >
                <span class="text-right">{{
                  dashboardStore.overviewData?.summary?.total_orders || 0
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-white shadow rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center relative min-h-[300px] md:min-h-[350px] overflow-hidden"
        >
          <div class="w-full text-center mb-4 z-10">
            <h2 class="text-base md:text-xl font-bold text-[#051960]">
              สัดส่วนยอดขายโปรโมชั่น
            </h2>
          </div>
          <div
            class="relative w-full flex justify-center items-center flex-grow px-0 md:px-4"
          >
            <div
              class="w-48 h-48 md:w-72 md:h-72 relative z-10 flex justify-center items-center"
            >
              <PromotionPieChart
                :promotion-amount="0"
                :regular-amount="
                  dashboardStore.overviewData?.summary?.total_sales || 0
                "
              />
            </div>
            <div
              v-if="0 > 0"
              class="absolute left-4 lg:left-5 top-[40%] -translate-y-1/2 z-20 flex items-center hidden md:flex"
            >
              <div
                class="bg-white px-5 py-2 rounded-xl shadow-md flex flex-col items-start min-w-[100px] border-l-4 border-[#F47122]"
              >
                <span class="text-xs font-medium text-gray-400">โปรโมชั่น</span>
                <span class="text-xl font-bold text-[#F47122]"> 0 </span>
              </div>
              <svg width="60" height="40" class="-ml-1">
                <path
                  d="M0,25 L30,25 L55,10"
                  fill="none"
                  stroke="#E5E7EB"
                  stroke-width="2"
                />
                <circle cx="55" cy="10" r="5" fill="#D9D9D9" />
              </svg>
            </div>
            <div
              class="absolute right-4 lg:right-5 top-[55%] -translate-y-1/2 z-20 flex items-center flex-row-reverse hidden md:flex"
            >
              <div
                class="bg-white px-5 py-2 rounded-xl shadow-md flex flex-col items-end min-w-[100px] border-r-4 border-[#002683]"
              >
                <span class="text-xs font-medium text-gray-400"
                  >เมนูทั่วไป</span
                >
                <span class="text-xl font-bold text-[#002683]">{{
                  (
                    dashboardStore.overviewData?.summary?.total_sales || 0
                  ).toLocaleString()
                }}</span>
              </div>
              <svg width="60" height="40" class="-mr-1">
                <path
                  d="M60,20 L30,20 L5,20"
                  fill="none"
                  stroke="#E5E7EB"
                  stroke-width="2"
                />
                <circle cx="5" cy="20" r="5" fill="#D9D9D9" />
              </svg>
            </div>
          </div>
          <div class="flex gap-4 mt-4 md:mt-2 z-10">
            <div
              class="flex items-center gap-2 bg-gray-50 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-gray-100 shadow-sm"
            >
              <span
                class="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#F47122]"
              ></span>
              <span class="text-gray-700 text-xs md:text-sm font-medium"
                >โปรโมชั่น</span
              >
            </div>
            <div
              class="flex items-center gap-2 bg-gray-50 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-gray-100 shadow-sm"
            >
              <span
                class="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#002683]"
              ></span>
              <span class="text-gray-700 text-xs md:text-sm font-medium"
                >เมนูทั่วไป</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-2xl overflow-hidden">
        <div
          class="bg-gray-100/70 px-4 py-3 md:px-6 md:py-4 border-b border-gray-100"
        >
          <span class="font-bold text-sm md:text-lg text-[#051960]"
            >เมนูที่ยอดขายสูงที่สุด</span
          >
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-600">
            <thead
              class="text-[10px] md:text-sm text-[#051960] uppercase bg-white border-b border-gray-200"
            >
              <tr>
                <th
                  class="hidden md:table-cell px-3 py-3 md:px-6 md:py-4 whitespace-nowrap"
                >
                  ลำดับ
                </th>
                <th class="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap">
                  เมนู
                </th>
                <th
                  class="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap text-right md:text-left"
                >
                  ยอดขาย
                </th>
                <th
                  class="px-3 py-3 md:px-6 md:py-4 text-center whitespace-nowrap"
                >
                  จำนวน
                </th>
                <th
                  class="hidden md:table-cell px-3 py-3 md:px-6 md:py-4 text-right whitespace-nowrap"
                >
                  % ยอดขาย
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in dashboardStore.overviewData
                  ?.top_menus || []"
                :key="index"
                class="bg-white border-b border-gray-100 hover:bg-gray-50 text-xs md:text-sm"
              >
                <td
                  class="hidden md:table-cell px-3 py-3 md:px-6 md:py-4 font-medium"
                >
                  {{ index + 1 }}
                </td>
                <td
                  class="px-3 py-3 md:px-6 md:py-4 font-medium text-[#051960] whitespace-nowrap max-w-[120px] md:max-w-none truncate"
                >
                  {{ item.menu_name }}
                </td>
                <td
                  class="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap text-right md:text-left"
                >
                  ฿{{ item.total_sales.toLocaleString() }}
                </td>
                <td class="px-3 py-3 md:px-6 md:py-4 text-center">
                  {{ item.total_qty }}
                </td>
                <td
                  class="hidden md:table-cell px-3 py-3 md:px-6 md:py-4 text-right"
                >
                  {{ item.sales_share_pct }}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { useDashboardStore } from "@/stores/dashboard";
import SalesChart from "@/components/SalesChart.vue";
import PromotionPieChart from "@/components/PromotionPieChart.vue";

// รับ Props จาก MainDashboard (ช่วงวันที่, Period)
const props = defineProps({
  dateRange: { type: Array, default: () => [new Date(), new Date()] },
  period: { type: String, default: "1m" },
});

const dashboardStore = useDashboardStore();

// ดึงข้อมูล Overview
const fetchData = async () => {
  await dashboardStore.fetchDashboardOverview(props.period, props.dateRange);
};

onMounted(() => fetchData());

// ถ้าวันที่ หรือ Period เปลี่ยน ให้ดึงข้อมูลใหม่
watch([() => props.dateRange, () => props.period], async () => {
  await fetchData();
});
</script>