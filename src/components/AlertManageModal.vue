<template>
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="$emit('close')"></div>
      <div class="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative z-10 text-center">
        
        <div v-if="type === 'success'" class="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div v-else class="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h3 class="text-xl font-bold mb-2">{{ title }}</h3>
        <p class="text-gray-500 mb-6">{{ message }}</p>
        
        <button 
          @click="$emit('close')" 
          class="w-full py-2.5 font-medium rounded-xl transition-colors shadow-sm text-white"
          :class="type === 'success' ? 'bg-[#051960] hover:bg-[#031245]' : 'bg-gray-500 hover:bg-gray-600'"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  type: { type: String, default: 'success' }, // 'success' or 'error'
  title: String,
  message: String,
  buttonText: { type: String, default: 'ตกลง' }
});

defineEmits(['close']);
</script>