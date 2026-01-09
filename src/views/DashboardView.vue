<template>
  <div class="space-y-6 font-sans text-[#051960] animate-fade-in">
    <div
      v-if="dashboardStore.isLoading"
      class="flex justify-center items-center h-40"
    >
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#051960]"
      ></div>
    </div>

    <div v-else class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          class="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl p-6 flex flex-col justify-between h-40 border border-gray-100"
        >
          <div class="flex justify-between items-center">
            <div class="text-sm font-medium text-gray-500">ยอดขายรวม</div>
            <div class="p-2 bg-blue-50 rounded-lg text-blue-600">
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
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div>
            <div class="text-3xl font-bold text-[#051960] leading-tight">
              ฿{{
                dashboardStore.overviewData?.summary?.total_sales?.toLocaleString() ||
                0
              }}
            </div>
            <div class="flex items-center gap-2 mt-2">
              <span
                class="flex items-center text-xs font-bold px-2 py-0.5 rounded-full"
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
              <span class="text-xs text-gray-400">จากช่วงก่อนหน้า</span>
            </div>
          </div>
        </div>

        <div
          class="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl p-6 flex flex-col justify-between h-40 border border-gray-100"
        >
          <div class="flex justify-between items-center">
            <div class="text-sm font-medium text-gray-500">เมนูขายดีที่สุด</div>
            <div class="p-2 bg-orange-50 rounded-lg text-orange-500">
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
                  stroke-width="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
          </div>
          <div>
            <div
              class="text-2xl font-bold text-[#051960] leading-tight truncate"
              :title="dashboardStore.overviewData?.top_menus?.[0]?.menu_name"
            >
              {{
                dashboardStore.overviewData?.top_menus?.[0]?.menu_name || "-"
              }}
            </div>
            <div class="text-sm text-gray-500 mt-2">
              ขายไปแล้ว
              <span class="text-[#051960] font-bold text-lg ml-1">
                {{
                  dashboardStore.overviewData?.top_menus?.[0]?.total_qty || 0
                }}
              </span>
              <span class="text-xs text-gray-400 ml-1">จาน</span>
            </div>
          </div>
        </div>

        <div
          class="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl p-6 flex flex-col justify-between h-40 border border-gray-100"
        >
          <div class="flex justify-between items-center">
            <div class="text-sm font-medium text-gray-500">ช่วงเวลาพีค</div>
            <div class="p-2 bg-purple-50 rounded-lg text-purple-600">
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
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div>
            <div class="text-3xl font-bold text-[#051960] leading-tight">
              {{
                dashboardStore.overviewData?.busiest_hour?.time_range || "--:--"
              }}
            </div>
            <div class="text-xs text-gray-400 mt-2 flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-red-400"></span>
              ช่วงเวลาที่มีออเดอร์หนาแน่น
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-2xl p-6">
        <div class="text-xl font-bold text-[#051960] mb-4">แนวโน้มยอดขาย</div>
        <div class="w-full h-80 relative">
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

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="space-y-6">
          <div class="bg-white shadow rounded-2xl p-6">
            <div class="mb-4">
              <div class="text-base font-medium text-gray-600 mb-1">
                ยอดขายทั้งหมด
              </div>
              <div class="flex items-baseline gap-2">
                <span class="text-2xl font-bold text-[#051960]">
                  ฿{{
                    dashboardStore.overviewData?.summary?.total_sales?.toLocaleString() ||
                    0
                  }}
                </span>
                <span
                  class="text-sm font-semibold text-green-600 bg-green-100 px-1.5 py-0.5 rounded"
                >
                  +{{
                    dashboardStore.overviewData?.summary?.growth
                      ?.sales_growth_pct || 0
                  }}%
                </span>
              </div>
            </div>
            <div class="bg-gray-50 rounded-lg p-2 text-sm">
              <div class="grid grid-cols-3 text-gray-500 mb-1 px-2">
                <span class="text-left">สถานะ</span
                ><span class="text-center">ราคา</span
                ><span class="text-right">% เปลี่ยนแปลง</span>
              </div>
              <div
                class="grid grid-cols-3 font-medium text-[#051960] bg-white p-2 rounded shadow-sm border border-gray-100"
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

          <div class="bg-white shadow rounded-2xl p-6">
            <div class="mb-4">
              <div class="text-base font-medium text-gray-600 mb-1">
                ค่าเฉลี่ยต่อบิล
              </div>
              <div class="flex items-baseline gap-2">
                <span class="text-2xl font-bold text-[#051960]">
                  ฿{{ dashboardStore.overviewData?.summary?.average_bill || 0 }}
                </span>
              </div>
            </div>
            <div class="bg-gray-50 rounded-lg p-2 text-sm">
              <div class="grid grid-cols-3 text-gray-500 mb-1 px-2">
                <span class="text-left">สถานะ</span
                ><span class="text-center">ราคา</span
                ><span class="text-right">จำนวนออเดอร์</span>
              </div>
              <div
                class="grid grid-cols-3 font-medium text-[#051960] bg-white p-2 rounded shadow-sm border border-gray-100"
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
          class="bg-white shadow rounded-2xl p-6 flex flex-col items-center justify-center relative min-h-[350px] overflow-hidden"
        >
          <div class="w-full text-center mb-4 z-10">
            <h2 class="text-xl font-bold text-[#051960]">
              สัดส่วนยอดขายเมนูโปรโมชั่นต่อเมนูทั้งหมด
            </h2>
          </div>

          <div
            class="relative w-full flex justify-center items-center flex-grow px-4"
          >
            <div
              class="w-72 h-72 relative z-10 flex justify-center items-center"
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
                <span class="text-xl font-bold text-[#002683]">
                  {{
                    (
                      dashboardStore.overviewData?.summary?.total_sales || 0
                    ).toLocaleString()
                  }}
                </span>
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

          <div class="flex gap-4 mt-2 z-10">
            <div
              class="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 shadow-sm"
            >
              <span class="w-4 h-4 rounded-full bg-[#F47122]"></span>
              <span class="text-gray-700 text-sm font-medium">โปรโมชั่น</span>
            </div>
            <div
              class="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 shadow-sm"
            >
              <span class="w-4 h-4 rounded-full bg-[#002683]"></span>
              <span class="text-gray-700 text-sm font-medium">เมนูทั่วไป</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-2xl overflow-hidden">
        <div class="bg-gray-100/70 px-6 py-4 border-b border-gray-100">
          <span class="font-bold text-lg text-[#051960]"
            >เมนูที่ยอดขายสูงที่สุด</span
          >
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-600">
            <thead
              class="text-sm text-[#051960] uppercase bg-white border-b border-gray-200"
            >
              <tr>
                <th class="px-6 py-4">ลำดับ</th>
                <th class="px-6 py-4">เมนู</th>
                <th class="px-6 py-4">ยอดขาย</th>
                <th class="px-6 py-4 text-center">จำนวน</th>
                <th class="px-6 py-4 text-right">% ยอดขาย</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in dashboardStore.overviewData
                  ?.top_menus || []"
                :key="index"
                class="bg-white border-b border-gray-100 hover:bg-gray-50"
              >
                <td class="px-6 py-4 font-medium">{{ index + 1 }}</td>
                <td class="px-6 py-4 font-medium text-[#051960]">
                  {{ item.menu_name }}
                </td>
                <td class="px-6 py-4">
                  ฿{{ item.total_sales.toLocaleString() }}
                </td>
                <td class="px-6 py-4 text-center">{{ item.total_qty }}</td>
                <td class="px-6 py-4 text-right">
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