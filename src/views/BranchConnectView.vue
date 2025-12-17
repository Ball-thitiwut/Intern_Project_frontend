<template>
  <div class="w-full h-full px-6 md:px-10 flex flex-col">
    
    <div class="mb-8 flex-none">
      <h1 class="text-4xl font-bold text-[#051960] tracking-tight mb-3">
        เชื่อมต่อข้อมูลสาขา
      </h1>
      <p class="text-gray-500 text-sm md:text-base font-light">
        เลือกสาขาที่คุณต้องการให้ RESSELF ช่วยวิเคราะห์
      </p>
    </div>

    <div class="flex-1 overflow-y-auto pb-10 pr-2 custom-scrollbar">
      <div class="w-full max-w-4xl mx-auto flex flex-col gap-8">
        
        <div class="rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 flex flex-col bg-white">
          
          <div class="bg-[#051960] px-8 py-6">
            <h2 class="text-white text-xl font-bold tracking-wide">
              {{ posName }}
            </h2>
          </div>

          <div class="px-6 md:px-10 py-10">
            
            <div class="flex flex-col gap-8 mb-8">
              <div v-for="(branch, index) in branches" :key="index" class="w-full relative group">
                
                <div class="flex justify-between items-center mb-2">
                    <label class="block text-[#051960] text-sm font-bold pl-1">
                      สาขา {{ index + 1 }}
                    </label>
                    
                    <button 
                      v-if="branches.length > 1" 
                      @click="removeBranch(index)" 
                      class="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all duration-200"
                      title="ลบสาขานี้"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
                
                <div class="flex flex-col md:flex-row gap-4 items-stretch">
                  
                  <div class="flex-1">
                      <input 
                        v-model="branch.name"
                        type="text" 
                        placeholder="ระบุชื่อสาขา (เช่น สาขาสยาม)"
                        class="w-full h-12 md:h-14 px-5 rounded-xl border-transparent bg-[#F3F4F6] focus:bg-white focus:border-[#051960]/50 focus:ring-2 focus:ring-[#051960]/20 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm"
                      >
                  </div>
                  
                  <div v-if="allowUpload" class="flex-none w-full md:w-auto">
                     <button 
                      @click="triggerUpload(index)"
                      class="w-full md:w-auto h-12 md:h-14 px-6 rounded-xl border transition-all duration-200 whitespace-nowrap text-sm font-medium flex items-center justify-center gap-2 shadow-sm"
                      :class="branch.file 
                        ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
                        : 'bg-white text-gray-500 border-gray-200 hover:border-[#051960] hover:text-[#051960]'"
                    >
                      <svg v-if="!branch.file" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      
                      <span>{{ branch.file ? 'แนบไฟล์เรียบร้อย' : 'อัพโหลดไฟล์' }}</span>
                    </button>

                    <input 
                      type="file" 
                      ref="fileInputRefs"
                      class="hidden"
                      accept=".csv, .xls, .xlsx"
                      @change="(e) => handleFileUpload(e, index)"
                    >
                  </div>
                </div>
                
                <p v-if="branch.file" class="text-xs text-green-600 mt-2 pl-2">
                    ไฟล์ที่เลือก: {{ branch.file.name }}
                </p>

              </div>
            </div>

            <button 
              @click="addBranch"
              class="w-full border-2 border-dashed border-gray-300 text-gray-500 hover:border-[#051960] hover:text-[#051960] hover:bg-blue-50 font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span class="bg-gray-200 group-hover:bg-[#051960] group-hover:text-white rounded-full w-6 h-6 flex items-center justify-center text-sm transition-colors">+</span> 
              เพิ่มสาขา
            </button>

          </div>
        </div>

     <div class="flex justify-between items-center pt-2 pb-10">
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
            class="bg-[#F97316] hover:bg-[#ea580c] text-white font-bold text-base px-8 py-3 rounded-full shadow-lg shadow-orange-200 transition-all transform active:scale-95 flex items-center gap-2"
          >
            ดำเนินการต่อ 
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const posName = ref(route.query.posName || 'My Own POS')

const allowUpload = computed(() => {
  return posName.value !== 'RESSELF POS'
})

const branches = reactive([
  { name: '', file: null } 
])

const fileInputRefs = ref([])

const addBranch = () => {
  branches.push({ name: '', file: null })
}

const removeBranch = (index) => {
    branches.splice(index, 1);
}

const triggerUpload = (index) => {
  if (fileInputRefs.value[index]) {
    fileInputRefs.value[index].click()
  }
}

const handleFileUpload = (event, index) => {
  const file = event.target.files[0]
  if (file) {
    branches[index].file = file
  }
}

const handleContinue = () => {
  const validBranches = branches.filter(b => b.name.trim() !== '')
  
  if (validBranches.length === 0) {
    alert('กรุณากรอกชื่อสาขาอย่างน้อย 1 สาขา')
    return
  }

  console.log('Saved Branches:', validBranches)

  router.push({ name: 'dashboard' }) 
}
</script>

<style scoped>
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