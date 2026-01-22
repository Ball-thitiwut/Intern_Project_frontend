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

      <div
        class="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
      >
        <transition
          enter-active-class="transform ease-out duration-300 transition"
          enter-from-class="translate-y-[-100%] opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="showToast"
            class="absolute top-4 left-0 right-0 flex justify-center z-50 pointer-events-none"
          >
            <div
              class="toast-wrapper bg-[#051960] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 backdrop-blur-md bg-opacity-95"
            >
              <div class="toast-icon bg-green-400 rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3 text-[#051960]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span class="toast-text text-sm font-bold"
                >{{ $t('edit_campaign_modal.toast.success') }}</span
              >
            </div>
          </div>
        </transition>
        <div
          class="bg-white px-8 pt-8 pb-4 flex justify-between items-start shrink-0 border-b border-gray-50"
        >
          <div>
            <h3 class="text-2xl font-bold text-[#051960]">{{ $t('edit_campaign_modal.header.title') }}</h3>
            <p class="text-gray-400 text-sm mt-1 font-light">
              {{ $t('edit_campaign_modal.header.subtitle') }}
            </p>
          </div>
          <button
            @click="closeModal"
            class="bg-gray-50 hover:bg-gray-100 p-2.5 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="p-8 space-y-6 overflow-y-auto custom-scrollbar">
          <div class="space-y-2">
            <label class="text-sm font-bold text-[#051960] ml-1">
              {{ $t('edit_campaign_modal.form.name_label') }}
            </label>
            <div class="relative">
              <input
                v-model="formData.name"
                :disabled="isLoading"
                type="text"
                class="w-full pl-4 pr-10 py-3.5 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#051960]/20 focus:ring-4 focus:ring-[#051960]/5 outline-none transition-all text-sm font-semibold text-[#051960] placeholder-gray-400 shadow-sm"
                :placeholder="$t('edit_campaign_modal.form.name_placeholder')"
              />
              <span
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm font-bold text-[#051960] ml-1">
                {{ $t('edit_campaign_modal.form.start_date_label') }}
              </label>
              <div class="relative">
                <input
                  v-model="formData.startDate"
                  type="date"
                  class="w-full pl-4 pr-10 py-3.5 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#051960]/20 focus:ring-4 focus:ring-[#051960]/5 outline-none transition-all text-sm font-medium text-gray-600 shadow-sm appearance-none"
                />
                <span
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-bold text-[#051960] ml-1">
                {{ $t('edit_campaign_modal.form.end_date_label') }}
              </label>
              <div class="relative">
                <input
                  v-model="formData.endDate"
                  type="date"
                  class="w-full pl-4 pr-10 py-3.5 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#051960]/20 focus:ring-4 focus:ring-[#051960]/5 outline-none transition-all text-sm font-medium text-gray-600 shadow-sm appearance-none"
                />
                <span
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="p-8 pt-4 border-t border-gray-50 bg-white shrink-0 flex gap-3"
        >
          <button
            @click="closeModal"
            class="flex-1 py-3.5 rounded-full border-2 border-gray-100 text-gray-500 font-bold text-sm hover:bg-gray-50 hover:border-gray-200 hover:text-gray-700 transition-all"
          >
            {{ $t('edit_campaign_modal.buttons.cancel') }}
          </button>
          <button
            @click="saveChanges"
            :disabled="isLoading"
            class="flex-[2] py-3.5 rounded-full bg-[#051960] text-white font-bold text-sm hover:bg-[#0a237a] shadow-xl shadow-blue-900/20 hover:shadow-blue-900/30 hover:-translate-y-0.5 transition-all active:scale-95 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            <span v-if="!isLoading">{{ $t('edit_campaign_modal.buttons.save') }}</span>
            <div v-else class="flex items-center gap-2">
              <svg
                class="animate-spin -ml-1 h-5 w-5 text-white"
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
              <span>{{ $t('edit_campaign_modal.buttons.processing') }}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  isOpen: Boolean,
  campaign: Object,
});

const emit = defineEmits(["close", "save"]);
const { t } = useI18n();

const isLoading = ref(false);
const showToast = ref(false);

const formData = ref({
  name: "",
  startDate: "",
  endDate: "",
});

// Watch Prop เพื่อดึงข้อมูลมาใส่ Form
watch(
  () => props.campaign,
  (newVal) => {
    if (newVal) {
      formData.value = { ...newVal };
    }
  },
  { immediate: true }
);

const closeModal = () => {
  if (isLoading.value) return;
  emit("close");
  setTimeout(() => {
    showToast.value = false;
  }, 300);
};

const saveChanges = async () => {
  if (!formData.value.name) return;

  isLoading.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    isLoading.value = false;
    showToast.value = true;

    setTimeout(() => {
      showToast.value = false;

      emit("save", formData.value);

      closeModal();
    }, 1500);
  } catch (error) {
    console.error(error);
    isLoading.value = false;
  }
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

@media (max-width: 767px) {
  .bg-white.rounded-\[2\.5rem\] {
    border-radius: 1.5rem !important;
    width: 95% !important;
    max-height: 85vh !important;
  }

  .bg-white.px-8.pt-8.pb-4 {
    padding-left: 1.25rem !important;
    padding-right: 1.25rem !important;
    padding-top: 1.25rem !important;
    padding-bottom: 0.75rem !important;
  }

  h3.text-2xl {
    font-size: 1.25rem !important;
  }

  .p-8.space-y-6 {
    padding: 1.25rem !important;
  }

  .p-8.space-y-6 > :not([hidden]) ~ :not([hidden]) {
    margin-top: 1rem !important;
  }

  input[type="text"],
  input[type="date"] {
    padding-top: 0.75rem !important;
    padding-bottom: 0.75rem !important;
    font-size: 0.875rem !important;
    padding-left: 1rem !important;
  }

  .relative span.absolute {
    right: 1rem !important;
  }

  .grid.grid-cols-2.gap-4 {
    gap: 0.75rem !important;
  }

  .p-8.pt-4 {
    padding: 1.25rem !important;
    padding-top: 1rem !important;
  }

  button.py-3\.5 {
    padding-top: 0.75rem !important;
    padding-bottom: 0.75rem !important;
  }

  .toast-wrapper {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
    gap: 0.5rem !important;
  }

  .toast-icon {
    padding: 0.125rem !important;
  }

  .toast-text {
    font-size: 0.75rem !important;
  }
}
</style>
