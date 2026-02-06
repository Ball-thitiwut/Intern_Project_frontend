<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center px-4">
      
      <div 
        class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        @click="$emit('close')"
      ></div>

      <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 md:p-8 text-center overflow-hidden z-10">
        
        <div class="absolute -top-12 -right-12 w-40 h-40 bg-orange-100/50 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-12 -left-12 w-40 h-40 bg-blue-100/50 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative mx-auto flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-orange-50 mb-4 md:mb-5">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 md:w-10 md:h-10 text-[#F47122]">
              <path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clip-rule="evenodd" />
           </svg>
        </div>
        
        <h3 class="text-xl md:text-2xl font-bold text-[#051960] mb-2 md:mb-3 font-sans">
          เริ่มต้นตั้งค่าร้านค้า
        </h3>
        
        <p class="text-slate-500 mb-6 md:mb-8 text-sm md:text-base leading-relaxed max-w-sm mx-auto">
          ร้านของคุณยังไม่มีข้อมูลยอดขายในระบบ <br class="hidden sm:block">
          เริ่มตั้งค่า POS เพื่อดูภาพรวมและสถิติได้ทันที
        </p>
        
        <div class="flex flex-col gap-3 sm:flex-row sm:justify-center w-full">
          <button 
            @click="$emit('close')" 
            class="px-6 py-3 rounded-full text-slate-500 text-sm md:text-base font-medium hover:bg-slate-100 transition-colors w-full sm:w-auto"
          >
            ไว้ทีหลัง
          </button>
          
          <button 
            @click="$emit('setup')" 
            class="px-8 py-3 rounded-full bg-[#F47122] hover:bg-[#d65f1a] text-white text-sm md:text-base font-bold shadow-lg shadow-orange-200 transition-all transform hover:-translate-y-0.5 w-full sm:w-auto flex items-center justify-center gap-2"
          >
            ไปหน้าตั้งค่า POS
          </button>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

defineEmits(['close', 'setup']);
</script>

<style scoped>
@media (max-width: 767px) {
  
  .fixed.inset-0.z-50.flex {
    align-items: flex-end !important; 
    padding: 0 !important; 
  }

  .fixed.inset-0.z-50.flex > .relative.bg-white {
    width: 100% !important;
    max-width: 100% !important;
    
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border-top-left-radius: 1.5rem !important;
    border-top-right-radius: 1.5rem !important;
    
    padding-left: 1.5rem !important;
    padding-right: 1.5rem !important;
    padding-top: 2rem !important;
    
    padding-bottom: max(2rem, env(safe-area-inset-bottom)) !important;
    
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1) !important;
  }
}
</style>