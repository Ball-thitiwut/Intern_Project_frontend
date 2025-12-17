<template>
  <div class="w-full h-full flex flex-col">
    
    <div class="px-6 md:px-10 pt-6 pb-4 flex-none">
      <h1 class="text-4xl font-bold text-[#051960] tracking-tight mb-3">
        เลือก POS
      </h1>
      <p class="text-gray-500 text-sm md:text-base font-light">
        เลือก POS ที่คุณใช้เพื่อให้ RESSELF ช่วยวิเคราะห์
      </p>
    </div>

    <div class="flex-1 overflow-y-auto px-6 md:px-10 py-6 scroll-smooth custom-scrollbar">
      
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        
        <div 
          v-for="pos in posList" 
          :key="pos.id"
          @click="selectPos(pos.id)"
          class="group relative rounded-[1.5rem] overflow-hidden aspect-square cursor-pointer transition-all duration-300 ease-out flex flex-col bg-white"
          :class="[
            selectedPosId === pos.id 
              ? 'ring-[3px] ring-[#F97316] shadow-xl scale-[1.02] z-10' 
              : 'border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-gray-200'
          ]"
        >
          <div 
            v-if="selectedPosId === pos.id"
            class="absolute top-3 right-3 z-20 bg-[#F97316] text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md animate-pop-in"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>

          <div class="flex-1 bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6 relative overflow-hidden group-hover:from-blue-50/50 transition-all duration-500">
             <div class="z-10 w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-300 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
             </div>
          </div>

          <div 
            class="h-12 flex items-center justify-center border-t border-gray-50 bg-white group-hover:bg-[#051960] transition-colors duration-300"
          >
            <span 
              class="font-medium text-sm transition-colors duration-300"
              :class="selectedPosId === pos.id ? 'text-[#F97316] font-bold group-hover:text-white' : 'text-gray-600 group-hover:text-white'"
            >
              {{ pos.name }}
            </span>
          </div>
        </div>

      </div>

      <div class="flex justify-between items-center mt-10 mb-6">
        
        <button 
          @click="router.back()"
          class="text-gray-400 hover:text-[#051960] font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm md:text-base"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          ย้อนกลับ
        </button>

        <button 
          @click="handleContinue"
          :disabled="!selectedPosId"
          class="bg-[#F97316] hover:bg-[#ea580c] text-white font-bold text-base px-8 py-3 rounded-full shadow-lg shadow-orange-200 disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none transition-all transform active:scale-95 flex items-center gap-2"
        >
          ดำเนินการต่อ 
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedPosId = ref(null)

const posList = ref([
  { id: 1, name: 'Wongnai POS' },
  { id: 2, name: 'Ocha' },
  { id: 3, name: 'FoodStory' },
  { id: 4, name: 'POS 4' },
  { id: 5, name: 'POS 5' },
  { id: 6, name: 'POS 6' },
  { id: 7, name: 'POS 7' },
  { id: 8, name: 'POS 8' },
  { id: 9, name: 'POS 9' },
  { id: 10, name: 'POS 10' },
  { id: 11, name: 'POS 11' },
  { id: 12, name: 'POS 12' },
])

const selectPos = (id) => {
  selectedPosId.value = id
}

const handleContinue = () => {
  if (selectedPosId.value) {
    const selected = posList.value.find(p => p.id === selectedPosId.value);
    console.log('Selected POS:', selected.name)
    router.push({ 
        name: 'branch-connect',
        query: { posName: selected.name }
    }) 
  }
}
</script>

<style scoped>
@keyframes popIn {
  0% { transform: scale(0) rotate(-45deg); opacity: 0; }
  80% { transform: scale(1.2) rotate(0deg); opacity: 1; }
  100% { transform: scale(1); }
}
.animate-pop-in {
  animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1; 
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8; 
}
</style>