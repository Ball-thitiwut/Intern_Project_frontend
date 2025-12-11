<template>
  <div class="space-y-6 font-sans text-[#051960]">
    <FilterBar
      @update:period="handlePeriodChange"
      @change-view="handleViewChange"
      :initialPeriod="currentPeriod"
      :initialView="currentView"
    />

    <div v-if="currentView === 'sales'" class="space-y-6 animate-fade-in">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          class="bg-white shadow rounded-2xl p-10 flex flex-col justify-center gap-3 h-40"
        >
          <div class="text-base font-Regular text-gray-600">
            ยอดขายรวม (วันนี้)
          </div>
          <div>
            <div class="text-3xl font-bold text-[#051960] leading-tight">
              ฿24,500
            </div>
            <div class="text-sm text-gray-500 flex items-center gap-1 mt-3">
              <span class="text-green-600 font-semibold">+12%</span>
              <span>จากเมื่อวาน</span>
            </div>
          </div>
        </div>

        <div
          class="bg-white shadow rounded-2xl p-10 flex flex-col justify-center gap-3 h-40"
        >
          <div class="text-base font-Regular text-gray-600">
            เมนูขายดีที่สุด
          </div>
          <div>
            <div class="text-2xl font-bold text-[#051960] leading-tight truncate">
              ข้าวกะเพราหมูกรอบ
            </div>
            <div class="text-sm text-gray-500 mt-3">
              ขายไปแล้ว <span class="text-[#051960] font-semibold">45 จาน</span>
            </div>
          </div>
        </div>

        <div
          class="bg-white shadow rounded-2xl p-10 flex flex-col justify-center gap-3 h-40 relative overflow-hidden"
        >
          <div class="text-base font-Regular text-gray-600">
            <span>ช่วงเวลาพีค</span>
          </div>
          <div>
            <div class="text-3xl font-bold text-[#051960] leading-tight">
              12:00 - 13:00
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-2xl p-6">
        <div class="text-xl font-bold text-[#051960] mb-4">ยอดขายรายวัน</div>
        <div
          class="w-full h-64 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200 border-dashed relative"
        >
          <div
            class="absolute inset-x-4 bottom-4 top-8 flex items-end justify-between px-2"
          >
            <div class="w-1 h-[20%] bg-[#002683]/40 rounded-t"></div>
            <div class="w-1 h-[40%] bg-[#002683]/60 rounded-t"></div>
            <div class="w-1 h-[35%] bg-[#002683]/50 rounded-t"></div>
            <div class="w-1 h-[70%] bg-[#002683] rounded-t"></div>
            <div class="w-1 h-[50%] bg-[#002683]/70 rounded-t"></div>
            <div class="w-1 h-[45%] bg-[#002683]/60 rounded-t"></div>
            <div class="w-1 h-[55%] bg-[#002683]/75 rounded-t"></div>
            <div class="w-1 h-[30%] bg-[#002683]/50 rounded-t"></div>
            <div class="w-1 h-[80%] bg-[#002683] rounded-t"></div>
            <div class="w-1 h-[60%] bg-[#002683]/80 rounded-t"></div>
            <div class="w-1 h-[65%] bg-[#002683]/85 rounded-t"></div>
            <div class="w-1 h-[55%] bg-[#002683]/75 rounded-t"></div>
          </div>
          <div
            class="absolute inset-0 border-b border-l border-gray-200 m-4"
          ></div>
          <span class="text-gray-400 text-sm"
            >พื้นที่สำหรับวาง Chart Component (Chart.js)</span
          >
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
                <span class="text-2xl font-bold text-[#051960]">฿86,483</span>
                <span
                  class="text-sm font-semibold text-green-600 bg-green-100 px-1.5 py-0.5 rounded"
                  >+12.81%</span
                >
              </div>
            </div>

            <div class="bg-gray-50 rounded-lg p-2 text-sm">
              <div class="grid grid-cols-3 text-gray-500 mb-1 px-2">
                <span class="text-left">สถานะ</span>
                <span class="text-center">ราคา</span>
                <span class="text-right">% ที่เปลี่ยนแปลง</span>
              </div>
              <div
                class="grid grid-cols-3 font-medium text-[#051960] bg-white p-2 rounded shadow-sm border border-gray-100"
              >
                <span class="text-left">แบบขาย</span>
                <span class="text-center">฿86,483</span>
                <span class="text-right">+12.81%</span>
              </div>
            </div>
          </div>

          <div class="bg-white shadow rounded-2xl p-6">
            <div class="mb-4">
              <div class="text-base font-medium text-gray-600 mb-1">
                ค่าเฉลี่ยของยอดต่อวัน
              </div>
              <div class="flex items-baseline gap-2">
                <span class="text-2xl font-bold text-[#051960]"
                  >฿11,536.5</span
                >
                <span
                  class="text-sm font-semibold text-green-600 bg-green-100 px-1.5 py-0.5 rounded"
                  >+12.81%</span
                >
              </div>
            </div>

            <div class="bg-gray-50 rounded-lg p-2 text-sm">
              <div class="grid grid-cols-3 text-gray-500 mb-1 px-2">
                <span class="text-left">สถานะ</span>
                <span class="text-center">ราคา</span>
                <span class="text-right">% ที่เปลี่ยนแปลง</span>
              </div>
              <div
                class="grid grid-cols-3 font-medium text-[#051960] bg-white p-2 rounded shadow-sm border border-gray-100"
              >
                <span class="text-left">แบบขาย</span>
                <span class="text-center">฿11,536.5</span>
                <span class="text-right">+12.81%</span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-white shadow rounded-2xl p-6 flex flex-col items-center justify-center relative min-h-[300px]"
        >
          <div class="absolute top-6 left-6 text-lg font-bold text-[#051960] pr-6">
            สัดส่วนยอดขายเมนูโปรโมชั่นต่อเมนูทั้งหมด
          </div>

          <div class="w-48 h-48 rounded-full bg-gray-100 relative mt-8">
             <div
              class="absolute inset-0 rounded-full border-4 border-white shadow-sm"
              style="
                clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                background: #002683;
                transform: rotate(-45deg);
                width: 100%;
              "
            ></div>
            <div
              class="absolute inset-0 rounded-full"
              style="
                background: #F47122;
                clip-path: polygon(50% 50%, 100% 0, 100% 100%, 20% 100%);
              "
            ></div>
          </div>

          <div
            class="absolute top-1/2 left-8 lg:left-8 transform -translate-y-1/2 bg-[#F47122] text-white text-sm px-3 py-1.5 rounded-lg shadow-md z-10"
          >
            โปรโมชั่น <br />
            <span class="font-bold">2,811</span>
          </div>
           <div
            class="absolute top-1/3 right-8 lg:right-8 bg-[#002683] text-white text-sm px-3 py-1.5 rounded-lg shadow-md z-10"
          >
            เมนูทั่วไป <br />
             <span class="font-bold">12,799</span>
          </div>

          <div class="flex gap-4 mt-8 text-sm font-medium">
            <div class="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
              <span class="w-3 h-3 rounded-full bg-[#F47122]"></span> โปรโมชั่น
            </div>
            <div class="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
              <span class="w-3 h-3 rounded-full bg-[#002683]"></span>
              เมนูทั่วไป
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-2xl overflow-hidden">
        <div
          class="bg-gray-50 px-6 py-4 flex justify-between items-center cursor-pointer border-b border-gray-100"
        >
          <span class="font-bold text-lg text-[#051960]"
            >เมนูที่ยอดขายสูงที่สุด</span
          >
          <svg
            class="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-600">
            <thead
              class="text-sm text-[#051960] uppercase bg-white border-b border-gray-200 [&_th]:font-semibold"
            >
              <tr>
                <th scope="col" class="px-6 py-4">ลำดับที่</th>
                <th scope="col" class="px-6 py-4">เมนู</th>
                <th scope="col" class="px-6 py-4">ยอดขาย</th>
                <th scope="col" class="px-6 py-4 text-center">จำนวน</th>
                <th scope="col" class="px-6 py-4 text-right">% ยอดขาย</th>
                <th scope="col" class="px-6 py-4 text-right">
                  % ที่เปลี่ยนแปลง
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in topMenus"
                :key="index"
                class="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4 font-medium">{{ index + 1 }}</td>
                <td class="px-6 py-4 font-medium text-[#051960]">
                  {{ item.name }}
                </td>
                <td class="px-6 py-4 font-medium">
                  ฿{{ item.sales.toLocaleString() }}
                </td>
                <td class="px-6 py-4 text-center">{{ item.qty }}</td>
                <td class="px-6 py-4 text-right">{{ item.percentSales }}%</td>
                <td
                  class="px-6 py-4 text-right font-medium"
                  :class="
                    item.change > 0 ? 'text-green-600' : 'text-red-600'
                  "
                >
                  {{ item.change > 0 ? "+" : "" }}{{ item.change }}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div
      v-else
      class="p-10 text-center text-gray-500 bg-white shadow rounded-2xl"
    >
      <p class="text-lg">
        แสดงข้อมูล:
        <span class="font-bold text-[#051960]">{{ currentView }}</span>
      </p>
      <p class="text-sm mt-2">ส่วนนี้กำลังพัฒนา...</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import FilterBar from "@/components/FilterBar.vue"; 

// State สำหรับ Filter
const currentPeriod = ref("1m");
const currentView = ref("sales");

const topMenus = ref([
  {
    name: "ส้มตำปลาร้า",
    sales: 1500,
    qty: 23,
    percentSales: 10.53,
    change: -1.05,
  },
  { name: "ส้มตำไทย", sales: 1400, qty: 18, percentSales: 9.12, change: 8.71 },
  { name: "ไก่ย่าง", sales: 1200, qty: 26, percentSales: 7.34, change: -5.14 },
  { name: "ลาบ", sales: 1000, qty: 10, percentSales: 5.76, change: 4.31 },
  { name: "อ่อมหมู", sales: 900, qty: 9, percentSales: 8.45, change: -8.21 },
  {
    name: "เอ็นข้อไก่ทอด",
    sales: 800,
    qty: 7,
    percentSales: 9.12,
    change: 8.71,
  },
  { name: "ขนมจีน", sales: 700, qty: 70, percentSales: 7.34, change: -5.14 },
  {
    name: "ข้าวเหนียว",
    sales: 600,
    qty: 60,
    percentSales: 5.76,
    change: -4.31,
  },
  { name: "ข้าวสวย", sales: 500, qty: 50, percentSales: 7.34, change: -5.14 },
  { name: "น้ำเปล่า", sales: 400, qty: 40, percentSales: 5.76, change: -4.31 },
]);

const handlePeriodChange = (period) => {
  currentPeriod.value = period;
  console.log("User filter period:", period);
};

const handleViewChange = (viewId) => {
  currentView.value = viewId;
  console.log("User change view to:", viewId);
};
</script>