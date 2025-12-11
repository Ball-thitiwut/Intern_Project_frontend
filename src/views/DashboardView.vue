<template>
  <div class="space-y-6 font-sans text-[#051960] animate-fade-in">
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white shadow rounded-2xl p-10 flex flex-col justify-center gap-3 h-40">
        <div class="text-base font-Regular text-gray-600">
          ยอดขายรวม (ช่วงเวลาที่เลือก)
        </div>
        <div>
          <div class="text-3xl font-bold text-[#051960] leading-tight">
            ฿24,500
          </div>
          <div class="text-sm text-gray-500 flex items-center gap-1 mt-3">
            <span class="text-green-600 font-semibold">+12%</span>
            <span>จากช่วงก่อนหน้า</span>
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-2xl p-10 flex flex-col justify-center gap-3 h-40">
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

      <div class="bg-white shadow rounded-2xl p-10 flex flex-col justify-center gap-3 h-40 relative overflow-hidden">
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
      <div class="text-xl font-bold text-[#051960] mb-4">แนวโน้มยอดขาย</div>
      <div class="w-full h-80 relative">
        <SalesChart />
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
              <span class="text-sm font-semibold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">+12.81%</span>
            </div>
          </div>

          <div class="bg-gray-50 rounded-lg p-2 text-sm">
            <div class="grid grid-cols-3 text-gray-500 mb-1 px-2">
              <span class="text-left">สถานะ</span>
              <span class="text-center">ราคา</span>
              <span class="text-right">% ที่เปลี่ยนแปลง</span>
            </div>
            <div class="grid grid-cols-3 font-medium text-[#051960] bg-white p-2 rounded shadow-sm border border-gray-100">
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
              <span class="text-2xl font-bold text-[#051960]">฿11,536.5</span>
              <span class="text-sm font-semibold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">+12.81%</span>
            </div>
          </div>

          <div class="bg-gray-50 rounded-lg p-2 text-sm">
            <div class="grid grid-cols-3 text-gray-500 mb-1 px-2">
              <span class="text-left">สถานะ</span>
              <span class="text-center">ราคา</span>
              <span class="text-right">% ที่เปลี่ยนแปลง</span>
            </div>
            <div class="grid grid-cols-3 font-medium text-[#051960] bg-white p-2 rounded shadow-sm border border-gray-100">
              <span class="text-left">แบบขาย</span>
              <span class="text-center">฿11,536.5</span>
              <span class="text-right">+12.81%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-2xl p-6 flex flex-col items-center justify-center relative min-h-[350px] overflow-hidden">
        <div class="w-full text-center mb-4 z-10">
          <h2 class="text-xl font-bold text-[#051960]">
            สัดส่วนยอดขายเมนูโปรโมชั่นต่อเมนูทั้งหมด
          </h2>
        </div>

        <div class="relative w-full flex justify-center items-center flex-grow px-4">
          <div class="w-72 h-72 relative z-10 flex justify-center items-center">
            <PromotionPieChart />
          </div>

          <div class="absolute left-4 lg:left-5 top-[40%] -translate-y-1/2 z-20 flex items-center hidden md:flex">
            <div class="bg-white px-5 py-2 rounded-xl shadow-md flex flex-col items-start min-w-[100px] border-l-4 border-[#F47122]">
              <span class="text-xs font-medium text-gray-400">โปรโมชั่น</span>
              <span class="text-xl font-bold text-[#F47122]">2,811</span>
            </div>
            <svg width="60" height="40" class="-ml-1">
              <path d="M0,25 L30,25 L55,10" fill="none" stroke="#E5E7EB" stroke-width="2" />
              <circle cx="55" cy="10" r="5" fill="#D9D9D9" />
            </svg>
          </div>

          <div class="absolute right-4 lg:right-5 top-[55%] -translate-y-1/2 z-20 flex items-center flex-row-reverse hidden md:flex">
            <div class="bg-white px-5 py-2 rounded-xl shadow-md flex flex-col items-end min-w-[100px] border-r-4 border-[#002683]">
              <span class="text-xs font-medium text-gray-400">เมนูทั่วไป</span>
              <span class="text-xl font-bold text-[#002683]">12,799</span>
            </div>
            <svg width="60" height="40" class="-mr-1">
              <path d="M60,20 L30,20 L5,20" fill="none" stroke="#E5E7EB" stroke-width="2" />
              <circle cx="5" cy="20" r="5" fill="#D9D9D9" />
            </svg>
          </div>
        </div>

        <div class="flex gap-4 mt-2 z-10">
          <div class="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 shadow-sm">
            <span class="w-4 h-4 rounded-full bg-[#F47122]"></span>
            <span class="text-gray-700 text-sm font-medium">โปรโมชั่น</span>
          </div>
          <div class="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 shadow-sm">
            <span class="w-4 h-4 rounded-full bg-[#002683]"></span>
            <span class="text-gray-700 text-sm font-medium">เมนูทั่วไป</span>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white shadow rounded-2xl overflow-hidden">
      <div class="bg-gray-50 px-6 py-4 flex justify-between items-center cursor-pointer border-b border-gray-100">
        <span class="font-bold text-lg text-[#051960]">เมนูที่ยอดขายสูงที่สุด</span>
        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-600">
          <thead class="text-sm text-[#051960] uppercase bg-white border-b border-gray-200 [&_th]:font-semibold">
            <tr>
              <th scope="col" class="px-6 py-4">ลำดับที่</th>
              <th scope="col" class="px-6 py-4">เมนู</th>
              <th scope="col" class="px-6 py-4">ยอดขาย</th>
              <th scope="col" class="px-6 py-4 text-center">จำนวน</th>
              <th scope="col" class="px-6 py-4 text-right">% ยอดขาย</th>
              <th scope="col" class="px-6 py-4 text-right">% ที่เปลี่ยนแปลง</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in topMenus" :key="index" class="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 font-medium">{{ index + 1 }}</td>
              <td class="px-6 py-4 font-medium text-[#051960]">{{ item.name }}</td>
              <td class="px-6 py-4 font-medium">฿{{ item.sales.toLocaleString() }}</td>
              <td class="px-6 py-4 text-center">{{ item.qty }}</td>
              <td class="px-6 py-4 text-right">{{ item.percentSales }}%</td>
              <td class="px-6 py-4 text-right font-medium" :class="item.change > 0 ? 'text-green-600' : 'text-red-600'">
                {{ item.change > 0 ? "+" : "" }}{{ item.change }}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import SalesChart from "@/components/SalesChart.vue";
import PromotionPieChart from "@/components/PromotionPieChart.vue";

const props = defineProps({
  dateRange: {
    type: Array,
    default: () => [new Date(), new Date()]
  },
  period: {
    type: String,
    default: '1m'
  }
});

const topMenus = ref([
  { name: "ส้มตำปลาร้า", sales: 1500, qty: 23, percentSales: 10.53, change: -1.05 },
  { name: "ส้มตำไทย", sales: 1400, qty: 18, percentSales: 9.12, change: 8.71 },
  { name: "ไก่ย่าง", sales: 1200, qty: 26, percentSales: 7.34, change: -5.14 },
  { name: "ลาบ", sales: 1000, qty: 10, percentSales: 5.76, change: 4.31 },
  { name: "อ่อมหมู", sales: 900, qty: 9, percentSales: 8.45, change: -8.21 },
  { name: "เอ็นข้อไก่ทอด", sales: 800, qty: 7, percentSales: 9.12, change: 8.71 },
  { name: "ขนมจีน", sales: 700, qty: 70, percentSales: 7.34, change: -5.14 },
  { name: "ข้าวเหนียว", sales: 600, qty: 60, percentSales: 5.76, change: -4.31 },
  { name: "ข้าวสวย", sales: 500, qty: 50, percentSales: 7.34, change: -5.14 },
  { name: "น้ำเปล่า", sales: 400, qty: 40, percentSales: 5.76, change: -4.31 },
]);

watch(() => props.dateRange, (newRange) => {
  console.log("DashboardView: วันที่เปลี่ยนเป็น", newRange);
});

</script>