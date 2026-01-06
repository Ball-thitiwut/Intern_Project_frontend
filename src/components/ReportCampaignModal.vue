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

      <div class="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
        
        <div class="bg-white px-8 pt-8 pb-2 flex justify-between items-start shrink-0">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <h3 class="text-2xl font-bold text-[#051960]">สรุปผลลัพธ์แคมเปญ</h3>
              <span 
                v-if="campaign?.status"
                class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                :class="campaign.status === 'Completed' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-gray-50 text-gray-500 border-gray-100'"
              >
                {{ campaign.status === 'Completed' ? 'Completed' : 'Cancelled' }}
              </span>
            </div>
            
            <p class="text-[#051960] text-base font-medium">
              {{ campaign?.name || 'Loading...' }}
            </p>

            <div class="flex items-center gap-1.5 mt-1 text-xs text-gray-400 font-light">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(campaign?.startDate) }} - {{ formatDate(campaign?.endDate) }}
             </div>
          </div>

          <button 
            @click="closeModal" 
            class="bg-gray-50 hover:bg-gray-100 p-2.5 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="p-8 pt-6 space-y-8 overflow-y-auto custom-scrollbar pb-10">
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div class="bg-[#F8FAFC] rounded-[1.5rem] p-5 border border-slate-100 relative group">
               <div class="relative z-10">
                 <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">ยอดขายรวม</p>
                 <h4 class="text-2xl font-bold text-[#051960]">฿{{ formatNumber(mockStats.totalRevenue) }}</h4>
                 <div class="flex items-center gap-1 mt-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 w-fit px-2 py-0.5 rounded-full">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" /></svg>
                   <span>+12.5%</span> <span class="text-emerald-400 font-medium ml-1">vs เป้าหมาย</span>
                 </div>
               </div>
            </div>

            <div class="bg-[#F8FAFC] rounded-[1.5rem] p-5 border border-slate-100 relative group">
               <div class="relative z-10">
                 <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">จำนวนออเดอร์</p>
                 <h4 class="text-2xl font-bold text-[#051960]">{{ mockStats.totalOrders }} <span class="text-sm font-normal text-slate-400">รายการ</span></h4>
                 <div class="flex items-center gap-1 mt-2 text-[10px] font-medium text-slate-400 bg-slate-100 w-fit px-2 py-0.5 rounded-full">
                   <span>เฉลี่ย ฿{{ Math.round(mockStats.totalRevenue / (mockStats.totalOrders || 1)) }}/บิล</span>
                 </div>
               </div>
            </div>

            <div class="bg-[#FFF7ED] rounded-[1.5rem] p-5 border border-orange-100 relative group">
               <div class="relative z-10">
                 <p class="text-[10px] font-bold text-orange-400 uppercase tracking-wider mb-2">ความคุ้มค่า (ROI)</p>
                 <h4 class="text-2xl font-bold text-[#051960]">{{ mockStats.roi }}%</h4>
                 <div class="flex items-center gap-1 mt-2 text-[10px] font-bold text-orange-600 bg-orange-100 w-fit px-2 py-0.5 rounded-full">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" /></svg>
                   <span>Impact High</span>
                 </div>
               </div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-6">
              <h4 class="font-bold text-[#051960] text-lg">แนวโน้มยอดขายรายวัน</h4>
              <div class="flex gap-2 items-center">
                 <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                 <span class="text-xs text-gray-500 font-medium">ยอดขายจริง</span>
              </div>
            </div>
            
            <div class="h-56 flex items-end justify-between gap-3 md:gap-6 pt-6 pb-2 border-b border-gray-100 relative">
               <div class="absolute inset-0 flex flex-col justify-between pointer-events-none">
                 <div class="w-full h-px bg-gray-50 border-t border-dashed border-gray-200"></div>
                 <div class="w-full h-px bg-gray-50 border-t border-dashed border-gray-200"></div>
                 <div class="w-full h-px bg-gray-50 border-t border-dashed border-gray-200"></div>
                 <div class="w-full h-px bg-gray-50 border-t border-dashed border-gray-200"></div>
               </div>

               <div 
                 v-for="(val, index) in mockChartData" 
                 :key="index"
                 class="relative flex-1 flex flex-col items-center group cursor-pointer"
               >
                  <div class="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-[#051960] text-white text-[10px] py-1.5 px-3 rounded-lg mb-2 pointer-events-none whitespace-nowrap z-20 shadow-lg translate-y-2 group-hover:translate-y-0">
                    ฿{{ formatNumber(val.value) }}
                    <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#051960] rotate-45"></div>
                  </div>
                  
                  <div 
                    class="w-full max-w-[48px] bg-blue-100 rounded-t-lg group-hover:bg-blue-500 transition-all duration-300 relative z-10"
                    :style="{ height: val.percent + '%' }"
                  ></div>
                  
                  <div class="mt-3 text-[10px] text-gray-400 font-medium">{{ val.day }}</div>
               </div>
            </div>
          </div>

        </div>

        </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  campaign: Object
});

const emit = defineEmits(['close']);

const mockStats = ref({
  totalRevenue: 0,
  totalOrders: 0,
  roi: 0
});

const mockChartData = ref([]);

watch(() => props.isOpen, (newVal) => {
  if (newVal && props.campaign) {
    const baseRevenue = props.campaign.revenue || 12500;
    
    mockStats.value = {
      totalRevenue: baseRevenue,
      totalOrders: Math.floor(baseRevenue / 150),
      roi: Math.floor(Math.random() * (300 - 100) + 100)
    };

    mockChartData.value = Array.from({ length: 7 }, (_, i) => {
      const val = Math.floor(Math.random() * (baseRevenue / 2));
      return {
        day: `Day ${i + 1}`,
        value: val,
        percent: Math.floor(Math.random() * (85 - 20) + 20) 
      };
    });
  }
});

const closeModal = () => {
  emit('close');
};

const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(num);
};

const formatDate = (dateString) => {
  if(!dateString) return '';
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
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
</style>