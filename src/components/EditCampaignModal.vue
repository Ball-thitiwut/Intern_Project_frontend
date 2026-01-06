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

      <div class="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
        
        <div class="bg-white px-8 pt-8 pb-4 flex justify-between items-start shrink-0 border-b border-gray-50">
          <div>
            <h3 class="text-2xl font-bold text-[#051960]">แก้ไขข้อมูลแคมเปญ</h3>
            <p class="text-gray-400 text-sm mt-1 font-light">
              ปรับปรุงรายละเอียดโปรโมชั่นของคุณ
            </p>
          </div>
          <button 
            @click="closeModal" 
            class="bg-gray-50 hover:bg-gray-100 p-2.5 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="p-8 space-y-6 overflow-y-auto custom-scrollbar">
          
          <div class="space-y-2">
            <label class="text-sm font-bold text-[#051960] ml-1">
              ชื่อแคมเปญ
            </label>
            <div class="relative">
              <input 
                v-model="formData.name" 
                type="text" 
                class="w-full pl-4 pr-10 py-3.5 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#051960]/20 focus:ring-4 focus:ring-[#051960]/5 outline-none transition-all text-sm font-semibold text-[#051960] placeholder-gray-400 shadow-sm"
                placeholder="ระบุชื่อแคมเปญ..."
              >
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm font-bold text-[#051960] ml-1">
                วันที่เริ่ม
              </label>
              <div class="relative">
                 <input 
                  v-model="formData.startDate" 
                  type="date" 
                  class="w-full pl-4 pr-10 py-3.5 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#051960]/20 focus:ring-4 focus:ring-[#051960]/5 outline-none transition-all text-sm font-medium text-gray-600 shadow-sm appearance-none"
                >
                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-bold text-[#051960] ml-1">
                วันที่สิ้นสุด
              </label>
              <div class="relative">
                <input 
                  v-model="formData.endDate" 
                  type="date" 
                  class="w-full pl-4 pr-10 py-3.5 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#051960]/20 focus:ring-4 focus:ring-[#051960]/5 outline-none transition-all text-sm font-medium text-gray-600 shadow-sm appearance-none"
                >
                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

        </div>

        <div class="p-8 pt-4 border-t border-gray-50 bg-white shrink-0 flex gap-3">
          <button 
            @click="closeModal"
            class="flex-1 py-3.5 rounded-full border-2 border-gray-100 text-gray-500 font-bold text-sm hover:bg-gray-50 hover:border-gray-200 hover:text-gray-700 transition-all"
          >
            ยกเลิก
          </button>
          <button 
            @click="saveChanges"
            class="flex-[2] py-3.5 rounded-full bg-[#051960] text-white font-bold text-sm hover:bg-[#0a237a] shadow-xl shadow-blue-900/20 hover:shadow-blue-900/30 hover:-translate-y-0.5 transition-all active:scale-95 active:translate-y-0 flex items-center justify-center gap-2"
          >
            บันทึกข้อมูล
          </button>
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

const emit = defineEmits(['close', 'save']);

const formData = ref({
  name: '',
  startDate: '',
  endDate: ''
});

// Watch Prop เพื่อดึงข้อมูลมาใส่ Form
watch(() => props.campaign, (newVal) => {
  if (newVal) {
    formData.value = { ...newVal };
  }
}, { immediate: true });

const closeModal = () => {
  emit('close');
};

const saveChanges = () => {
  emit('save', formData.value);
};
</script>

<style scoped>
/* ซ่อน Default Calendar Icon ของ Browser (เฉพาะ Chrome/Edge) */
input[type="date"]::-webkit-calendar-picker-indicator {
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

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