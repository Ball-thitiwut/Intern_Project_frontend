<template>
  <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100" style="font-family: 'Prompt', 'Kanit', 'Sarabun', sans-serif;">
    <h3 class="text-xl font-bold text-[#051960] mb-4">จำนวนบิลตามขนาดกลุ่มลูกค้า</h3>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <div class="lg:col-span-7 flex flex-col justify-center">
        
        <div class="h-72 relative w-full mb-12">
          
          <div class="absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90 text-sm text-[#64748b] font-medium whitespace-nowrap z-20">
            จำนวนบิล
          </div>
          
          <div class="absolute left-10 top-0 bottom-0 flex flex-col justify-between text-[13px] text-[#64748b] font-medium z-10 pb-[1px]">
            <span v-for="tick in yTicks" :key="tick">{{ tick }}</span>
          </div>

          <div class="ml-20 h-full border-b border-[#f3f4f6] relative">
             <div class="absolute inset-0 flex flex-col justify-between pointer-events-none z-0 pb-[1px]">
              <div v-for="i in yTicks.length" :key="i" class="w-full h-0 border-t border-[#f3f4f6] border-dashed" :class="{ 'border-transparent': i === yTicks.length }"></div>
            </div>
            
            <div class="flex items-end justify-around h-full relative z-10 px-2">
              <div v-for="(item, index) in chartData" :key="index" class="flex flex-col items-center w-full relative group h-full justify-end">
                <div 
                  class="mb-2 bg-[#051960] text-white text-[13px] font-medium px-2 py-1 rounded-md shadow-sm relative -top-1 z-20 transition-all duration-200 ease-out transform"
                  :class="item.highlight ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'"
                >
                  {{ item.value.toLocaleString() }}
                  <div class="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#051960]"></div>
                </div>
                
                <div class="w-full max-w-[40px] rounded-t-[4px] transition-all duration-300 relative" 
                  :class="item.highlight ? 'bg-[#F47122] shadow-md z-10' : 'bg-[#002683]/20 hover:bg-[#002683]/40'" 
                  :style="{ height: calculateHeight(item.value) + '%' }">
                </div>
                
                <span class="absolute top-full mt-3 text-[13px] text-[#64748b] font-medium text-center w-full">{{ item.label }}</span>
              </div>
            </div>
          </div>
          <div class="absolute -bottom-12 left-0 right-0 text-center text-sm text-[#64748b] font-medium ml-20">
            ขนาดกลุ่ม
          </div>
        </div>
      
      </div> 
      <div class="lg:col-span-5 flex flex-col justify-center pl-4 border-l border-gray-100"> 
        <div class="w-full">
          <table class="w-full text-sm mb-2">
            <thead>
              <tr class="text-sm text-[#051960] bg-gray-100/80">
                <th class="py-3 pl-3 text-center font-bold rounded-l-lg">อันดับ</th>
                <th class="py-3 text-center font-bold">ขนาดกลุ่ม</th>
                <th class="py-3 text-right font-bold">จำนวนบิล</th>
                <th class="py-3 pr-3 text-right font-bold rounded-r-lg">สัดส่วน(%)</th>
              </tr>
            </thead>
            <tbody class="text-sm text-gray-600">
              <tr v-for="(row, idx) in tableData" :key="idx" class="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition group">
                <td class="py-3 pl-3 text-center font-medium text-gray-400 group-hover:text-[#051960]">{{ idx + 1 }}</td>
                <td class="py-3 text-center font-medium">{{ row.size }} คน</td>
                <td class="py-3 text-right font-bold text-[#051960]">{{ row.count }} บิล</td>
                <td class="py-3 pr-3 text-right">{{ row.percent }}%</td>
              </tr>
            </tbody>
          </table>
          <div class="pt-4 text-right text-base font-bold text-[#051960] border-t border-gray-100 mt-2">
            รวมทั้งหมด: {{ totalBills }} บิล
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

// รับค่าข้อมูลที่ส่งมาจาก DashboardBehaviorView 
const props = defineProps({
  chartData: { type: Array, default: () => [] }, 
  tableData: Array, 
  totalBills: Number
})

// หาค่าสูงสุดในข้อมูล เพื่อนำไปกำหนดสเกลความสูงของกราฟ
const maxValue = computed(() => {
  if (!props.chartData || props.chartData.length === 0) return 0;
  return Math.max(...props.chartData.map(item => item.value));
});

const yTicks = computed(() => {
  const max = maxValue.value;
  if (max === 0) return ['0'];
  
  const step = Math.ceil(max / 5);
  const niceStep = step > 10 ? Math.ceil(step / 5) * 5 : Math.ceil(step);
  
  const ticks = [];
  for (let i = 0; i <= 5; i++) {
    ticks.push(niceStep * i);
  }
  return ticks.reverse(); 
});

// ฟังก์ชันแปลงค่า Value เป็น % ความสูง (CSS Height)
const calculateHeight = (value) => {
  const maxTick = parseInt(yTicks.value[0]);
  if (maxTick === 0) return 0;
  return (value / maxTick) * 100;
};
</script>