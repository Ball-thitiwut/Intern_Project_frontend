<template>
  <div class="space-y-6 font-sans text-[#051960] animate-fade-in">
    
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <div class="text-xl font-bold text-[#051960] mb-6">ยอดขายเฉลี่ยต่อบิลรายวัน</div>
      
      <div class="relative h-72 w-full pr-4">
         <div class="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500 h-full pb-6">
           <span>600</span>
           <span>400</span>
           <span>200</span>
           <span>0</span>
         </div>

         <div class="absolute -left-5 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-gray-400 font-medium tracking-wide">
             Bath
         </div>
         
         <div class="ml-12 h-full flex flex-col justify-end relative">
             <div class="absolute inset-x-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none">
                <div class="border-t border-gray-100 border-dashed w-full h-0"></div>
                <div class="border-t border-gray-100 border-dashed w-full h-0"></div>
                <div class="border-t border-gray-100 border-dashed w-full h-0"></div>
                <div class="border-t border-gray-100 border-dashed w-full h-0"></div>
             </div>

             <div class="flex items-end justify-between px-2 h-[calc(100%-24px)] pb-px relative z-10">
                 <div v-for="(val, index) in barData" :key="index" class="group flex flex-col items-center gap-2 w-full">
                     <div 
                        class="w-4 md:w-8 rounded-t-md transition-all duration-300 relative group-hover:opacity-80"
                        :class="val.highlight 
                            ? 'bg-[#F47122] shadow-lg shadow-[#F47122]/30' 
                            : 'bg-[#002683]/20 hover:bg-[#002683]/30'"
                        :style="{ height: val.height + '%' }"
                     >
                        <div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#051960] text-white text-[10px] px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20 pointer-events-none">
                           ฿{{ val.value }}
                           <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#051960]"></div>
                        </div>
                     </div>
                 </div>
             </div>

             <div class="flex justify-between px-2 pt-2 border-t border-gray-100 border-dashed">
                 <span v-for="(date, i) in dates" :key="i" class="text-[10px] md:text-xs text-gray-500 w-full text-center">{{ date }}</span>
             </div>
             
             <div class="text-center text-xs text-gray-400 font-medium mt-1">Date</div>
         </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <div class="text-xl font-bold text-[#051960] mb-6">จำนวนบิลรายวัน</div>

      <div class="relative h-72 w-full pr-4">
         <div class="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500 h-full pb-6">
           <span>60</span>
           <span>40</span>
           <span>20</span>
           <span>0</span>
         </div>

         <div class="absolute -left-5 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-gray-400 font-medium tracking-wide">
             Bill
         </div>

         <div class="ml-12 h-full flex flex-col justify-end relative">
             <div class="absolute inset-x-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none">
                <div class="border-t border-gray-100 border-dashed w-full h-0"></div>
                <div class="border-t border-gray-100 border-dashed w-full h-0"></div>
                <div class="border-t border-gray-100 border-dashed w-full h-0"></div>
                <div class="border-t border-gray-100 border-dashed w-full h-0"></div>
             </div>

             <div class="absolute inset-0 bottom-6 px-4 md:px-8 py-2 z-10 pointer-events-none">
                <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path 
                        d="M0,60 L10,80 L20,55 L30,70 L40,30 L50,85 L60,60 L70,80 L80,55 L90,70 L100,50" 
                        fill="none" 
                        stroke="#002683" 
                        stroke-width="2" 
                        vector-effect="non-scaling-stroke"
                        class="drop-shadow-sm"
                    />
                    <circle cx="0" cy="60" r="3.5" fill="#F47122" stroke="white" stroke-width="1.5" vector-effect="non-scaling-stroke" />
                    <circle cx="10" cy="80" r="3.5" fill="#F47122" stroke="white" stroke-width="1.5" vector-effect="non-scaling-stroke" />
                    <circle cx="20" cy="55" r="3.5" fill="#F47122" stroke="white" stroke-width="1.5" vector-effect="non-scaling-stroke" />
                    <circle cx="30" cy="70" r="3.5" fill="#F47122" stroke="white" stroke-width="1.5" vector-effect="non-scaling-stroke" />
                    <circle cx="40" cy="30" r="3.5" fill="#F47122" stroke="white" stroke-width="1.5" vector-effect="non-scaling-stroke" />
                    <circle cx="50" cy="85" r="3.5" fill="#F47122" stroke="white" stroke-width="1.5" vector-effect="non-scaling-stroke" />
                    <circle cx="60" cy="60" r="3.5" fill="#F47122" stroke="white" stroke-width="1.5" vector-effect="non-scaling-stroke" />
                    <circle cx="70" cy="80" r="3.5" fill="#F47122" stroke="white" stroke-width="1.5" vector-effect="non-scaling-stroke" />
                    <circle cx="80" cy="55" r="3.5" fill="#F47122" stroke="white" stroke-width="1.5" vector-effect="non-scaling-stroke" />
                    <circle cx="90" cy="70" r="3.5" fill="#F47122" stroke="white" stroke-width="1.5" vector-effect="non-scaling-stroke" />
                    <circle cx="100" cy="50" r="3.5" fill="#F47122" stroke="white" stroke-width="1.5" vector-effect="non-scaling-stroke" />
                </svg>
             </div>

             <div class="flex justify-between px-2 pt-2 border-t border-gray-100 border-dashed">
                 <span v-for="(date, i) in dates" :key="i" class="text-[10px] md:text-xs text-gray-500 w-full text-center">{{ date }}</span>
             </div>

             <div class="text-center text-xs text-gray-400 font-medium mt-1">Date</div>
         </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

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

const dates = ['01/17', '01/18', '01/19', '01/20', '01/21', '01/22', '01/23', '01/24', '01/25', '01/26', '01/27'];

const barData = ref([
    { height: 45, value: 320, highlight: false },
    { height: 25, value: 150, highlight: false },
    { height: 50, value: 350, highlight: false },
    { height: 30, value: 210, highlight: false },
    { height: 85, value: 580, highlight: true }, 
    { height: 20, value: 120, highlight: false },
    { height: 40, value: 290, highlight: false },
    { height: 25, value: 160, highlight: false },
    { height: 48, value: 340, highlight: false },
    { height: 30, value: 200, highlight: false },
    { height: 45, value: 310, highlight: false },
]);

watch(() => props.dateRange, (newVal) => {
    console.log("Bill View: Date updated to", newVal);
});
</script>