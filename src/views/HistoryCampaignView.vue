<template>
  <div class="w-full min-h-screen px-6 md:px-10 py-8 font-sans bg-[#F3F5F9]">
    <div class="flex items-end justify-between gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-bold text-[#051960] tracking-tight mb-2">
          ประวัติแคมเปญ
        </h1>
        <p class="text-gray-500 text-sm md:text-base font-light">
          ติดตามสถานะและผลลัพธ์ของโปรโมชั่นทั้งหมดของคุณ
        </p>
      </div>
      <button 
        @click="$router.push('/ideas')"
        class="bg-[#051960] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-blue-900/20 hover:bg-[#0a237a] hover:-translate-y-0.5 transition-all flex items-center gap-2"
      >
        <span class="text-lg">+</span> สร้างแคมเปญใหม่
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div class="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-2xl">
          ⚡️
        </div>
        <div>
          <p class="text-gray-400 text-xs font-medium uppercase tracking-wider">กำลังใช้งาน</p>
          <h3 class="text-2xl font-bold text-[#051960]">3 แคมเปญ</h3>
        </div>
      </div>
      <div class="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-2xl">
          💰
        </div>
        <div>
          <p class="text-gray-400 text-xs font-medium uppercase tracking-wider">ยอดขายจากโปรฯ (เดือนนี้)</p>
          <h3 class="text-2xl font-bold text-[#051960]">฿24,500</h3>
        </div>
      </div>
      <div class="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-2xl">
          📈
        </div>
        <div>
          <p class="text-gray-400 text-xs font-medium uppercase tracking-wider">Conversion Rate เฉลี่ย</p>
          <h3 class="text-2xl font-bold text-[#051960]">12.5%</h3>
        </div>
      </div>
    </div>

    <div class="mb-10">
      <h2 class="text-xl font-bold text-[#051960] mb-6 flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
        กำลังดำเนินการ
      </h2>
      
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div 
          v-for="campaign in activeCampaigns" 
          :key="campaign.id"
          class="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-all group relative overflow-hidden"
        >
          <div class="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
             <span class="text-9xl">{{ campaign.icon }}</span>
          </div>

          <div class="relative z-10">
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-center gap-4">
                <div 
                  class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-gray-50 bg-white"
                >
                  {{ campaign.icon }}
                </div>
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span 
                      class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                      :class="campaign.badgeColor"
                    >
                      {{ campaign.type }}
                    </span>
                    <span class="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                      เหลือเวลา {{ campaign.daysLeft }} วัน
                    </span>
                  </div>
                  <h3 class="text-lg font-bold text-[#051960]">{{ campaign.name }}</h3>
                </div>
              </div>
              
              <div class="relative">
                <button class="text-gray-300 hover:text-[#051960] transition-colors p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="mb-6">
              <div class="flex justify-between text-xs mb-2">
                <span class="text-gray-500">เป้าหมายยอดขาย</span>
                <span class="font-bold text-[#051960]">{{ campaign.progress }}%</span>
              </div>
              <div class="w-full bg-gray-100 rounded-full h-2">
                <div 
                  class="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-1000" 
                  :style="{ width: campaign.progress + '%' }"
                ></div>
              </div>
              <div class="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>{{ formatDate(campaign.startDate) }}</span>
                <span>{{ formatDate(campaign.endDate) }}</span>
              </div>
            </div>

            <div class="flex gap-3 pt-4 border-t border-gray-50">
              <button class="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50 transition-colors">
                ดูรายละเอียด
              </button>
              <button class="flex-1 py-2.5 rounded-xl bg-blue-50 text-blue-600 text-sm font-bold hover:bg-blue-100 transition-colors">
                แก้ไข
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
      <h2 class="text-xl font-bold text-[#051960] mb-6">ประวัติย้อนหลัง</h2>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left border-b border-gray-100">
              <th class="pb-4 pl-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-[30%]">ชื่อแคมเปญ</th>
              <th class="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">ประเภท</th>
              <th class="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">ระยะเวลา</th>
              <th class="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">ยอดขายที่ทำได้</th>
              <th class="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">สถานะ</th>
              <th class="pb-4 pr-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr 
              v-for="history in historyCampaigns" 
              :key="history.id"
              class="group border-b border-gray-50 last:border-0 hover:bg-slate-50/50 transition-colors"
            >
              <td class="py-4 pl-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-lg shadow-sm border border-white">
                    {{ history.icon }}
                  </div>
                  <div>
                    <div class="font-bold text-[#051960]">{{ history.name }}</div>
                    <div class="text-xs text-gray-400 font-light">{{ history.branch }}</div>
                  </div>
                </div>
              </td>
              <td class="py-4 text-center">
                <span class="bg-gray-100 text-gray-500 px-2 py-1 rounded text-[10px] font-bold">
                  {{ history.type }}
                </span>
              </td>
              <td class="py-4 text-center text-gray-500 font-medium">
                {{ calculateDuration(history.startDate, history.endDate) }} วัน
              </td>
              <td class="py-4 text-right font-bold text-[#051960]">
                ฿{{ formatCurrency(history.revenue) }}
              </td>
              <td class="py-4 text-center">
                <span 
                  class="px-2.5 py-1 rounded-full text-[10px] font-bold"
                  :class="history.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'"
                >
                  {{ history.status === 'Completed' ? 'จบแล้ว' : 'ยกเลิก' }}
                </span>
              </td>
              <td class="py-4 pr-4 text-right">
                <button class="text-gray-400 hover:text-[#051960] font-bold text-xs underline decoration-dotted">
                  ดูรายงาน
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="historyCampaigns.length === 0" class="text-center py-10 text-gray-400">
        ยังไม่มีประวัติแคมเปญ
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Mock Data: Active Campaigns (รวมอันที่ user เพิ่งสร้าง)
const activeCampaigns = ref([
  {
    id: 101,
    name: "โปรโมชั่น ข้าวมันไก่ + น้ำซุปฟัก",
    type: "Pairing",
    icon: "🍔",
    badgeColor: "bg-blue-50 text-blue-600 border-blue-100",
    startDate: "2023-10-25",
    endDate: "2023-11-01",
    daysLeft: 5,
    progress: 45, // % of sales goal
  },
  {
    id: 102,
    name: "Happy Hour ลด 20% เมนูเส้น",
    type: "Happy Hour",
    icon: "⏰",
    badgeColor: "bg-red-50 text-red-600 border-red-100",
    startDate: "2023-10-20",
    endDate: "2023-10-30",
    daysLeft: 2,
    progress: 82,
  }
]);

// Mock Data: History
const historyCampaigns = ref([
  {
    id: 99,
    name: "Buy 1 Get 1 กาแฟส้ม Yuzu",
    branch: "สาขา สยามสแควร์",
    type: "Inventory",
    icon: "📦",
    startDate: "2023-10-01",
    endDate: "2023-10-07",
    revenue: 12500,
    status: "Completed"
  },
  {
    id: 98,
    name: "ทานครบ 500 ฟรีเกี๊ยวซ่า",
    branch: "สาขา เซ็นทรัลเวิลด์",
    type: "Upsell",
    icon: "🎁",
    startDate: "2023-09-15",
    endDate: "2023-09-30",
    revenue: 45000,
    status: "Completed"
  },
  {
    id: 97,
    name: "ลด 50% เค้กกล้วยหอม",
    branch: "สาขา สยามสแควร์",
    type: "Slow Moving",
    icon: "📉",
    startDate: "2023-09-01",
    endDate: "2023-09-03",
    revenue: 2100,
    status: "Cancelled"
  }
]);

// Helper Functions
const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short' };
  return new Date(dateString).toLocaleDateString('th-TH', options);
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US').format(value);
};

const calculateDuration = (start, end) => {
  const diffTime = Math.abs(new Date(end) - new Date(start));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays;
};
</script>

<style scoped>
/* Custom Table Styles if needed */
</style>