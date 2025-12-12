<template>
  <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
    <h3 class="text-xl font-bold text-[#051960] mb-8">{{ title }}</h3>

    <div class="flex items-start justify-center mb-10 pb-8 border-b border-gray-200">
      <div v-for="(stat, index) in stats" :key="index" class="flex-1 px-4 flex">
        <div class="text-center w-full">
          <div class="text-3xl font-bold text-[#051960] whitespace-nowrap">{{ stat.value }}</div>
          <div class="text-sm font-normal text-gray-500 mt-1">{{ stat.label }}</div>
        </div>
        <div v-if="index !== stats.length - 1" class="h-12 w-px bg-gray-300 mx-auto self-center"></div>
      </div>
    </div>

    <div class="relative h-64 mb-10"> 
      
      <div class="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-gray-500 font-medium whitespace-nowrap z-20 origin-center">
        {{ yAxisLabel }}
      </div>

      <div class="absolute left-12 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-400 font-medium z-10 pb-[1px]">
        <span v-for="tick in yTicks" :key="tick">{{ tick }}</span>
      </div>

      <div class="ml-24 h-full border-b border-gray-300 relative">
        
        <div class="absolute inset-0 flex flex-col justify-between pointer-events-none z-0 pb-[1px]">
          <div v-for="i in yTicks.length" :key="i" 
               class="w-full h-0 border-t border-gray-100 border-dashed"
               :class="{ 'border-transparent': i === yTicks.length }">
          </div>
        </div>

        <div class="flex items-end justify-around h-full relative z-10 px-2">
          <div v-for="(item, index) in chartData" :key="index" class="flex flex-col items-center w-full relative group h-full justify-end">
            
            <div 
              class="mb-2 bg-[#051960] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm relative -top-1 z-20 transition-all duration-200 ease-out transform"
              :class="item.highlight ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'"
            >
              {{ item.value }}
              <div class="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#051960]"></div>
            </div>

            <div 
              class="w-full max-w-[65px] rounded-t-lg transition-all duration-300 relative"
              :class="item.highlight ? 'bg-[#F47122] shadow-md z-10' : 'bg-gray-100 hover:bg-gray-200'"
              :style="{ height: item.height + '%' }"
            ></div>

            <span class="absolute top-full mt-3 text-[11px] md:text-xs text-gray-500 font-medium text-center w-full whitespace-nowrap">
              {{ item.label }}
            </span>
            
          </div>
        </div>
      </div>
      
      <div class="absolute -bottom-12 left-0 right-0 text-center text-xs text-gray-500 font-medium ml-24">
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