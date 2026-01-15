<template>
  <div class="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 font-sans">
    <h3 class="text-lg md:text-xl font-bold text-[#051960] mb-4 md:mb-8">{{ title }}</h3>

    <div class="flex items-start justify-center mb-6 pb-4 md:mb-10 md:pb-8 border-b border-gray-200">
      <div v-for="(stat, index) in stats" :key="index" class="flex-1 px-2 md:px-4 flex">
        <div class="text-center w-full">
          <div class="text-xl md:text-3xl font-bold text-[#051960] whitespace-nowrap">{{ stat.value }}</div>
          <div class="text-xs md:text-sm font-medium text-[#64748b] mt-1">{{ stat.label }}</div>
        </div>
        <div v-if="index !== stats.length - 1" class="h-8 md:h-12 w-px bg-gray-300 mx-auto self-center"></div>
      </div>
    </div>

    <div class="relative h-56 md:h-64 mb-10 md:mb-12"> 
      
      <div class="hidden md:block absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 text-sm text-[#64748b] font-medium whitespace-nowrap z-20 origin-center">
        {{ yAxisLabel }}
      </div>

      <div class="hidden md:flex absolute left-12 top-0 bottom-0 flex-col justify-between text-[13px] text-[#64748b] font-medium z-10 pb-[1px]">
        <span v-for="tick in yTicks" :key="tick">{{ tick }}</span>
      </div>  

      <div class="ml-0 md:ml-24 h-full border-b border-gray-300 relative">
        
        <div class="absolute inset-0 flex flex-col justify-between pointer-events-none z-0 pb-[1px]">
          <div v-for="i in yTicks.length" :key="i" 
               class="w-full h-0 border-t border-[#f3f4f6] border-dashed"
               :class="{ 'border-transparent': i === yTicks.length }">
          </div>
        </div>

        <div class="flex items-end justify-around h-full relative z-10 px-1 md:px-2">
          <div v-for="(item, index) in chartData" :key="index" class="flex flex-col items-center w-full relative group h-full justify-end">
            
            <div 
              class="mb-1 md:mb-2 bg-[#051960] text-white text-[10px] md:text-[14px] font-semibold px-1.5 py-0.5 md:px-2 rounded-md shadow-sm relative -top-1 z-20 transition-all duration-200 ease-out transform"
              :class="item.highlight ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'"
            >
              ฿{{ item.value.toLocaleString() }}
              <div class="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#051960]"></div>
            </div>

            <div 
              class="w-full max-w-[24px] md:max-w-[65px] rounded-t md:rounded-t-lg transition-all duration-300 relative"
              :class="item.highlight ? 'bg-[#F47122] shadow-md z-10' : 'bg-[rgba(0,38,131,0.2)] hover:bg-[rgba(0,38,131,0.4)]'"
              :style="{ height: item.height + '%' }"
            ></div>

            <span class="absolute top-full mt-2 md:mt-3 text-[10px] md:text-[13px] text-[#64748b] font-medium text-center w-full whitespace-nowrap overflow-hidden text-ellipsis px-0.5">
              {{ item.label }}
            </span>
            
          </div>
        </div>
      </div>
      
      <div class="absolute -bottom-10 md:-bottom-14 left-0 right-0 text-center text-xs md:text-sm text-[#64748b] font-medium ml-0 md:ml-24 mt-2">
        {{ xAxisLabel }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  stats: Array,
  chartData: Array,
  yAxisLabel: { type: String, default: 'จำนวนบิล' },
  xAxisLabel: { type: String, default: 'บาท' },
  yTicks: { type: Array, default: () => ['70','60','50','40','30','20','10','0'] }
})
</script>