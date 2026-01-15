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
        class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        @click="close"
      ></div>

      <div
        class="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div
          class="bg-white px-8 pt-8 pb-4 flex justify-between items-start shrink-0 border-b border-gray-50"
        >
          <div>
            <h3 class="text-2xl font-bold text-[#051960]">สร้างโปรโมชั่น</h3>
            <p class="text-gray-400 text-sm mt-1 font-light">
              กำหนดรายละเอียดแคมเปญของคุณ
            </p>
          </div>
          <button
            @click="close"
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

        <div class="p-8 overflow-y-auto custom-scrollbar space-y-6">
          <div
            class="rounded-[1.5rem] p-6 border relative overflow-hidden group shadow-sm transition-colors"
            :class="[ideaData?.contentBg || 'bg-gray-50', 'border-transparent']"
          >
            <div
              class="absolute -right-6 -bottom-6 w-32 h-32 rounded-full opacity-10 pointer-events-none"
              :class="ideaData?.iconBg?.replace('bg-', 'bg-current text-')"
            ></div>

            <div class="flex items-start gap-4 z-10 relative">
              <div
                class="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-sm border border-white/50 flex-shrink-0 bg-white"
                :class="ideaData?.iconBg"
                v-html="ideaData?.icon"
              ></div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between mb-2">
                  <span
                    class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border bg-white/90 backdrop-blur-sm shadow-sm"
                    :class="ideaData?.badgeColor"
                  >
                    {{ ideaData?.type || "Campaign" }}
                  </span>

                  <div
                    class="flex items-center gap-1.5 bg-white/90 px-2.5 py-1 rounded-lg shadow-sm border border-white/50"
                  >
                    <span class="text-[10px] text-gray-400 font-medium"
                      >Impact</span
                    >
                    <span
                      class="text-sm font-bold"
                      :class="ideaData?.scoreColor"
                      >+{{ suggestionData?.score || 0 }}%</span
                    >
                  </div>
                </div>

                <h4
                  class="text-[#051960] font-bold text-lg truncate pr-2 leading-tight"
                >
                  {{ suggestionData?.name }}
                </h4>
                <p class="text-sm text-gray-600 font-medium mt-1 truncate">
                  {{ suggestionData?.detail }}
                </p>
              </div>
            </div>
          </div>

          <form @submit.prevent="handleConfirm" class="space-y-6">
            <div class="space-y-2">
              <label class="text-sm font-bold text-[#051960] ml-1"
                >ชื่อแคมเปญ</label
              >
              <div class="relative">
                <input
                  v-model="form.name"
                  type="text"
                  class="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#051960]/20 focus:ring-4 focus:ring-[#051960]/5 outline-none transition-all text-sm font-semibold text-[#051960] placeholder-gray-400 shadow-sm"
                  placeholder="ระบุชื่อแคมเปญ..."
                  required
                />
                <span
                  class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
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
                <label class="text-sm font-bold text-[#051960] ml-1"
                  >วันที่เริ่ม</label
                >
                <div class="relative">
                  <input
                    v-model="form.startDate"
                    type="date"
                    class="w-full pl-4 pr-10 py-3.5 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#051960]/20 focus:ring-4 focus:ring-[#051960]/5 outline-none transition-all text-sm font-medium text-gray-600 shadow-sm appearance-none"
                    required
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
                <label class="text-sm font-bold text-[#051960] ml-1"
                  >วันที่สิ้นสุด</label
                >
                <div class="relative">
                  <input
                    v-model="form.endDate"
                    type="date"
                    class="w-full pl-4 pr-10 py-3.5 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#051960]/20 focus:ring-4 focus:ring-[#051960]/5 outline-none transition-all text-sm font-medium text-gray-600 shadow-sm appearance-none"
                    required
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
          </form>
        </div>

        <div
          class="p-8 pt-4 border-t border-gray-50 bg-white shrink-0 flex gap-3"
        >
          <button
            @click="close"
            class="flex-1 py-3.5 rounded-full border-2 border-gray-100 text-gray-500 font-bold text-sm hover:bg-gray-50 hover:border-gray-200 hover:text-gray-700 transition-all"
          >
            ยกเลิก
          </button>
          <button
            @click="handleConfirm"
            class="flex-[2] py-3.5 rounded-full bg-[#051960] text-white font-bold text-sm hover:bg-[#0a237a] shadow-xl shadow-blue-900/20 hover:shadow-blue-900/30 hover:-translate-y-0.5 transition-all active:scale-95 active:translate-y-0 flex items-center justify-center gap-2"
          >
            ยืนยันสร้างแคมเปญ
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  isOpen: Boolean,
  ideaData: Object,
  suggestionData: Object,
});

const emit = defineEmits(["close", "confirm"]);

const form = ref({
  name: "",
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date(new Date().setDate(new Date().getDate() + 7))
    .toISOString()
    .split("T")[0],
});

watch(
  () => props.suggestionData,
  (newVal) => {
    if (newVal) {
      form.value.name = `โปรโมชั่น ${newVal.name}`;
    }
  }
);

const close = () => {
  emit("close");
};

const handleConfirm = () => {
  emit("confirm", form.value);
};
</script>

<style scoped>
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

/* Responsive Mobile */
@media (max-width: 767px) {
  .bg-white.rounded-\[2\.5rem\] {
    border-radius: 1.5rem !important; 
    width: 90% !important; 
    max-height: 85vh !important;
  }

  .bg-white.px-8.pt-8.pb-4 {
    padding: 1.5rem !important;
    padding-bottom: 0.5rem !important;
  }
  h3.text-2xl {
    font-size: 1.1rem !important; 
  }

  .p-8.overflow-y-auto {
    padding: 1rem !important;
    padding-top: 0.5rem !important;
  }

  .rounded-\[1\.5rem\].p-6 {
    padding: 0.75rem !important; 
    border-radius: 0.75rem !important;
  }
  
  .w-14.h-14 {
    width: 2.5rem !important; 
    height: 2.5rem !important;
    border-radius: 0.5rem !important;
    font-size: 1rem !important;
  }
  .w-32.h-32 {
    width: 5rem !important;
    height: 5rem !important;
  }

  input {
    padding-top: 0.5rem !important;    
    padding-bottom: 0.5rem !important; 
    font-size: 0.85rem !important;
    border-radius: 0.75rem !important; 
  }
  .absolute.top-1\/2 {
    transform: translateY(-50%) scale(0.8) !important; 
  }

  .p-8.pt-4.border-t {
    padding: 1.5rem !important;
  }
  
  button.py-3\.5 {
    padding-top: 0.6rem !important;
    padding-bottom: 0.6rem !important;
    font-size: 0.85rem !important;
  }

  .space-y-6 > :not([hidden]) ~ :not([hidden]) {
    margin-top: 1rem !important; 
  }
}
</style>