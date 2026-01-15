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
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        class="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        @click="!isLoading && $emit('close')"
      ></div>

      <div
        class="bg-white rounded-3xl p-5 md:p-8 w-[85%] md:w-full max-w-xs md:max-w-sm shadow-2xl relative z-10 text-center"
      >
        <div
          class="w-12 h-12 md:w-16 md:h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4"
        >
          <slot name="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 md:h-8 md:w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </slot>
        </div>

        <h3 class="text-base md:text-xl font-bold mb-2">{{ title }}</h3>
        <div class="text-xs md:text-sm text-gray-500 mb-5 md:mb-6">
          <slot name="content"></slot>
        </div>

        <div class="flex gap-3">
          <button
            @click="$emit('close')"
            :disabled="isLoading"
            class="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors disabled:opacity-50"
          >
            {{ cancelText }}
          </button>
          <button
            @click="$emit('confirm')"
            :disabled="isLoading"
            class="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <svg
              v-if="isLoading"
              class="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ isLoading ? loadingText : confirmText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  title: String,
  confirmText: { type: String, default: "ยืนยัน" },
  cancelText: { type: String, default: "ยกเลิก" },
  loadingText: { type: String, default: "กำลังประมวลผล..." },
  isLoading: Boolean,
});

defineEmits(["close", "confirm"]);
</script>
