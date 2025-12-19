<template>
  <div class="w-full min-h-screen px-6 md:px-10 py-8 font-sans bg-[#F3F5F9]">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-[#051960] tracking-tight mb-2">
        จับคู่เมนู (Menu Pairing)
      </h1>
      <p class="text-gray-500 text-sm md:text-base font-light">
        ค้นหาโอกาสในการเพิ่มยอดขายด้วย
        <span class="text-[#F97316] font-medium">AI Matching Intelligence</span>
      </p>
    </div>

    <div
      class="bg-gradient-to-r from-[#EFF6FF] to-[#E0F2FE] rounded-[2rem] p-8 md:p-10 mb-10 relative overflow-hidden shadow-sm border border-blue-100 transition-all duration-500"
      :class="{ 'ring-4 ring-orange-100': isAnalyzing }"
    >
      <div
        class="absolute top-0 right-0 w-64 h-64 bg-white opacity-40 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"
      ></div>

      <div
        class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div
          class="flex-1 text-center md:text-left transition-all duration-500"
          :class="{ 'opacity-50 blur-[0.5px]': isAnalyzing }"
        >
          <div
            class="flex items-center justify-center md:justify-start gap-3 mb-4"
          >
            <div
              class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-2xl border border-blue-50"
            >
              🤖
            </div>
            <h2 class="text-2xl font-bold text-[#051960]">
              {{ isAnalyzed ? "ผลลัพธ์การวิเคราะห์" : "AI Recommendation" }}
            </h2>
          </div>

          <p
            class="text-gray-600 text-sm md:text-base leading-relaxed font-light max-w-2xl"
          >
            <span v-if="!isAnalyzed">
              ให้ AI ช่วยสแกนประวัติการขายย้อนหลังของคุณ เพื่อค้นหาเมนูที่ลูกค้า
              "มักจะสั่งพร้อมกัน"
            </span>
            <span v-else class="text-gray-800">
              ข้อมูลล่าสุดเมื่อ:
              <span class="font-medium">{{ lastUpdated }}</span>
              พบโอกาสทำกำไรสูงถึง
              <span class="font-bold text-[#F97316] text-lg"
                >{{ topScore }}%</span
              >
            </span>
          </p>
        </div>

        <div
          class="flex-shrink-0 flex flex-col items-center md:items-end gap-2"
        >
          <button
            @click="handleAnalyzeClick"
            @mouseenter="isHoveringBtn = true"
            @mouseleave="isHoveringBtn = false"
            :disabled="isAnalyzing"
            class="group relative flex items-center gap-4 pl-6 pr-2 py-2 rounded-full shadow-lg transition-all duration-300 min-w-[280px]"
            :class="[
              isAnalyzing
                ? 'bg-orange-300 cursor-wait'
                : isAnalyzed && !isHoveringBtn
                ? 'bg-green-500 shadow-green-200'
                : 'bg-gradient-to-r from-[#F97316] to-[#ea580c] hover:shadow-orange-500/50 hover:-translate-y-1',
            ]"
          >
            <div class="flex flex-col items-start flex-1 pl-2">
              <span
                class="text-lg font-bold tracking-wide text-white transition-all duration-300 whitespace-nowrap"
              >
                {{ buttonText }}
              </span>
              <span
                class="text-[10px] text-white opacity-90 transition-all duration-300 font-medium"
              >
                {{ buttonSubText }}
              </span>
            </div>

            <div
              class="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-inner relative overflow-hidden transition-transform duration-300"
              :class="{
                'animate-spin': isAnalyzing || (isAnalyzed && isHoveringBtn),
              }"
            >
              <span
                v-if="isAnalyzed && !isHoveringBtn && !isAnalyzing"
                class="text-green-500 text-xl font-bold animate-bounce-short"
                >✓</span
              >
              <span
                v-else-if="isAnalyzed && isHoveringBtn && !isAnalyzing"
                class="text-[#F97316] text-xl font-bold"
                >↻</span
              >
              <div v-else class="relative w-full h-full">
                <span
                  class="text-lg absolute left-2 top-3 transition-transform duration-300"
                  :class="{
                    'group-hover:-translate-x-1 group-hover:rotate-[-10deg]':
                      !isAnalyzing,
                  }"
                  >🍔</span
                >
                <span
                  class="text-lg absolute right-2 bottom-3 transition-transform duration-300"
                  :class="{
                    'group-hover:translate-x-1 group-hover:rotate-[10deg]':
                      !isAnalyzing,
                  }"
                  >🥤</span
                >
              </div>
              <span
                v-if="!isAnalyzed && !isAnalyzing"
                class="absolute top-1 right-1 text-[8px]"
                >✨</span
              >
            </div>
          </button>
        </div>
      </div>
    </div>

    <div
      class="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 overflow-hidden relative flex flex-col h-fit"
    >
      <div
        v-if="isAnalyzing"
        class="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-30 flex flex-col items-center justify-center transition-all duration-300 min-h-[300px]"
      >
        <div
          class="bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 flex flex-col items-center gap-4 animate-bounce-slight"
        >
          <div class="flex gap-2">
            <div
              class="w-3 h-3 bg-orange-500 rounded-full animate-bounce"
            ></div>
            <div
              class="w-3 h-3 bg-orange-400 rounded-full animate-bounce delay-100"
            ></div>
            <div
              class="w-3 h-3 bg-orange-300 rounded-full animate-bounce delay-200"
            ></div>
          </div>
          <span class="text-sm font-medium text-gray-600"
            >AI กำลังวิเคราะห์ข้อมูล...</span
          >
        </div>
      </div>

      <div
        class="grid grid-cols-12 gap-2 md:gap-4 p-4 md:p-5 bg-[#F8FAFC] border-b border-gray-100 text-[10px] md:text-sm font-bold text-[#64748B] uppercase tracking-wider sticky top-0 z-20 shadow-sm"
      >
        <div class="col-span-1 text-center">Rank</div>
        <div
          class="pl-2 transition-all duration-500"
          :class="isAnalyzed ? 'col-span-5' : 'col-span-7 md:col-span-6'"
        >
          {{ isAnalyzed ? "AI Pair Suggestion" : "Best Selling Pair" }}
        </div>
        <div
          v-if="isAnalyzed"
          class="col-span-3 text-left pl-4 hidden md:block animate-fade-in-up"
        >
          <div class="flex items-center gap-1.5">
            <span>Match Rate</span>

            <div class="group relative cursor-help z-50">
              <span
                class="w-4 h-4 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 text-[10px] font-bold hover:bg-gray-300 transition-colors leading-none pt-[1px]"
              >
                ?
              </span>

              <div
                class="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 p-3 bg-[#1e293b] text-white text-[11px] leading-relaxed rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none font-normal normal-case text-left"
              >
                <div
                  class="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1e293b] rotate-45"
                ></div>

                คำนวณจากความถี่ที่ลูกค้าสั่งเมนูเหล่านี้พร้อมกันในหนึ่งบิล
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-3 md:col-span-1 text-center">Stats</div>
        <div class="col-span-3 md:col-span-2 text-right pr-4">Action</div>
      </div>

      <div class="relative custom-scrollbar overflow-y-auto">
        <transition-group name="list" tag="div">
          <div
            v-for="(pair, index) in displayedPairs"
            :key="pair.id"
            class="grid grid-cols-12 gap-2 md:gap-4 p-4 items-center border-b border-gray-50 transition-all duration-500 group relative"
            :class="{
              'bg-orange-50/20 hover:bg-orange-50/40':
                isAnalyzed && index === 0,
              'bg-white hover:bg-slate-50': !(isAnalyzed && index === 0),
            }"
          >
            <div class="col-span-1 flex flex-col items-center justify-center">
              <div
                class="w-8 h-8 md:w-10 md:h-10 rounded-full font-bold flex items-center justify-center text-xs md:text-sm transition-all duration-500 relative shadow-sm"
                :class="{
                  'bg-gradient-to-br from-[#051960] to-[#1e3a8a] text-white ring-2 ring-orange-100':
                    isAnalyzed && index === 0,
                  'bg-[#051960] text-white': isAnalyzed && index > 0,
                  'bg-gray-100 text-gray-500': !isAnalyzed,
                }"
              >
                <span
                  v-if="isAnalyzed && index === 0"
                  class="absolute -top-3.5 left-1/2 -translate-x-1/2 text-sm filter drop-shadow-sm"
                  >👑</span
                >
                {{ index + 1 }}
              </div>

              <div v-if="isAnalyzed" class="mt-2 animate-fade-in">
                <div
                  v-if="pair.trend === 'up'"
                  class="flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full shadow-sm"
                >
                  <div
                    class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"
                  ></div>
                  <span class="text-[9px] font-bold tracking-wide">NEW</span>
                </div>

                <div
                  v-else-if="pair.trend === 'down'"
                  class="flex items-center gap-1 bg-gray-50 border border-gray-100 text-gray-400 px-2 py-0.5 rounded-full"
                >
                  <span class="text-[9px] font-bold">▼ Low</span>
                </div>

                <span v-else class="text-[12px] text-gray-300 font-bold"
                  >-</span
                >
              </div>
            </div>

            <div
              class="flex items-center gap-4 transition-all duration-500"
              :class="isAnalyzed ? 'col-span-5' : 'col-span-7 md:col-span-6'"
            >
              <div
                class="flex items-center relative min-w-[70px] md:min-w-[100px]"
              >
                <div
                  class="w-10 h-10 md:w-14 md:h-14 rounded-xl overflow-hidden border-2 border-white shadow-sm z-10 relative bg-gray-100"
                >
                  <img
                    :src="pair.item1.image"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div
                  class="w-5 h-5 bg-white rounded-full flex items-center justify-center text-gray-300 shadow-sm border border-gray-100 absolute left-7 md:left-11 z-20"
                >
                  <span class="text-[10px] font-bold">+</span>
                </div>
                <div
                  class="w-10 h-10 md:w-14 md:h-14 rounded-xl overflow-hidden border-2 border-white shadow-sm z-0 -ml-4 bg-gray-100"
                >
                  <img
                    :src="pair.item2.image"
                    class="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all"
                  />
                </div>
              </div>

              <div class="flex flex-col min-w-0 pr-2">
                <div class="flex items-baseline gap-2">
                  <span class="text-sm font-bold text-[#051960] truncate">{{
                    pair.item1.name
                  }}</span>
                  <span
                    class="text-[10px] text-gray-400 font-normal whitespace-nowrap"
                    >+ คู่กับ</span
                  >
                </div>
                <span class="text-sm font-bold text-[#051960] truncate">{{
                  pair.item2.name
                }}</span>
              </div>
            </div>

            <div
              v-if="isAnalyzed"
              class="col-span-3 hidden md:flex flex-col justify-center px-4 animate-fade-in-right border-l border-gray-50"
            >
              <div class="flex items-baseline gap-1.5 mb-1">
                <span
                  class="text-2xl font-bold tracking-tight"
                  :class="{
                    'text-emerald-600': pair.score >= 80,
                    'text-orange-500': pair.score >= 60 && pair.score < 80,
                    'text-gray-400': pair.score < 60,
                  }"
                >
                  {{ pair.score }}<span class="text-xs ml-0.5">%</span>
                </span>

                <span
                  class="text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider shadow-sm"
                  :class="{
                    'bg-emerald-100 text-emerald-700': pair.score >= 80,
                    'bg-orange-100 text-orange-700':
                      pair.score >= 60 && pair.score < 80,
                    'bg-gray-100 text-gray-500': pair.score < 60,
                  }"
                >
                  {{
                    pair.score >= 80
                      ? "แนะนำ"
                      : pair.score >= 60
                      ? "ปานกลาง"
                      : "ต่ำ"
                  }}
                </span>
              </div>

              <div
                class="w-full max-w-[160px] bg-gray-100 rounded-full h-2 overflow-hidden flex"
              >
                <div
                  class="h-full transition-all duration-1000 ease-out rounded-full"
                  :class="{
                    'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]':
                      pair.score >= 80,
                    'bg-orange-400': pair.score >= 60 && pair.score < 80,
                    'bg-gray-300': pair.score < 60,
                  }"
                  :style="{ width: pair.score + '%' }"
                ></div>
              </div>

              <span class="text-[9px] text-gray-400 mt-1.5 font-medium italic">
                * วิเคราะห์จากประวัติ POS
              </span>
            </div>

            <div
              class="col-span-3 md:col-span-1 flex flex-col items-center justify-center border-l border-gray-100 pl-2 md:pl-0 gap-1"
            >
              <span class="text-sm font-bold text-[#051960]"
                >฿{{ formatCurrency(pair.totalSales) }}</span
              >
              <div class="text-[10px] text-gray-400 font-medium">
                {{ pair.orderCount }} ออเดอร์
              </div>
            </div>

            <div
              class="col-span-3 md:col-span-2 text-right pr-4 flex justify-end"
            >
              <button
                :class="
                  isAnalyzed && index === 0
                    ? 'bg-[#F97316] text-white shadow-md shadow-orange-100 hover:shadow-orange-200 hover:-translate-y-0.5'
                    : 'bg-white text-[#051960] border border-gray-200 hover:border-[#051960] hover:bg-gray-50'
                "
                :disabled="!isAnalyzed"
                class="px-5 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-200 active:scale-95 flex items-center justify-center"
              >
                <span>{{
                  isAnalyzed && index === 0 ? "สร้างโปรโมชั่น" : "เลือก"
                }}</span>
              </button>
            </div>
          </div>
        </transition-group>

        <div
          v-if="displayedPairs.length === 0"
          class="p-16 text-center text-gray-400"
        >
          ยังไม่มีข้อมูล
        </div>
      </div>
    </div>

    <transition name="toast">
      <div
        v-if="showToast"
        class="fixed bottom-6 right-6 md:top-24 md:right-10 md:bottom-auto z-50 flex items-center gap-3 bg-[#051960] text-white px-5 py-3 rounded-xl shadow-2xl shadow-blue-900/20"
      >
        <div class="bg-green-500 rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-white"
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
        <div>
          <h4 class="font-bold text-sm">ตรวจสอบเรียบร้อย</h4>
          <p class="text-xs text-blue-200">ข้อมูลเป็นปัจจุบันแล้ว</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// State
const isAnalyzing = ref(false);
const isAnalyzed = ref(false);
const isHoveringBtn = ref(false);
const lastUpdated = ref(null);
const showToast = ref(false);

// Mock Data
const rawData = [
  {
    id: 1,
    trend: "up",
    score: 92,
    item1: {
      name: "ส้มตำปูปลาร้า",
      image:
        "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=300&q=80",
    },
    item2: {
      name: "ไก่ย่างวิเชียร",
      image:
        "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=300&q=80",
    },
    orderCount: 22,
    totalSales: 2310,
  },
  {
    id: 2,
    trend: "same",
    score: 75,
    item1: {
      name: "ข้าวมันไก่ตอน",
      image:
        "https://images.unsplash.com/photo-1606756790138-7c488320e54f?auto=format&fit=crop&w=300&q=80",
    },
    item2: {
      name: "น้ำซุปฟัก",
      image:
        "https://plus.unsplash.com/premium_photo-1669559809549-353272d13783?auto=format&fit=crop&w=300&q=80",
    },
    orderCount: 18,
    totalSales: 1080,
  },
  {
    id: 3,
    trend: "down",
    score: 45,
    item1: {
      name: "เบียร์สิงห์",
      image:
        "https://images.unsplash.com/photo-1623249033379-3c356f17e3c1?auto=format&fit=crop&w=300&q=80",
    },
    item2: {
      name: "เอ็นข้อไก่ทอด",
      image:
        "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=300&q=80",
    },
    orderCount: 15,
    totalSales: 2700,
  },
];

const buttonText = computed(() => {
  if (isAnalyzing.value) return "กำลังอัปเดต...";
  if (isAnalyzed.value && !isHoveringBtn.value) return "วิเคราะห์เสร็จสิ้น";
  if (isAnalyzed.value && isHoveringBtn.value) return "อัปเดตข้อมูล";
  return "เริ่มวิเคราะห์ข้อมูล";
});

const buttonSubText = computed(() => {
  if (isAnalyzing.value) return "Processing...";
  if (isAnalyzed.value) return "Click to Refresh";
  return "Start AI Analysis";
});

const displayedPairs = computed(() => {
  const data = [...rawData];
  if (!isAnalyzed.value) {
    return data.sort((a, b) => b.totalSales - a.totalSales);
  } else {
    return data.sort((a, b) => b.score - a.score);
  }
});

const topScore = computed(() => {
  if (!isAnalyzed.value) return 0;
  const sorted = [...rawData].sort((a, b) => b.score - a.score);
  return sorted[0].score;
});

const handleAnalyzeClick = () => {
  isAnalyzing.value = true;
  showToast.value = false;

  setTimeout(() => {
    isAnalyzing.value = false;
    isAnalyzed.value = true;

    const now = new Date();
    lastUpdated.value =
      now.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }) +
      " น.";

    localStorage.setItem(
      "ai_menu_analysis",
      JSON.stringify({
        analyzed: true,
        timestamp: lastUpdated.value,
      })
    );

    triggerToast();
  }, 1200);
};

const triggerToast = () => {
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

onMounted(() => {
  const savedState = localStorage.getItem("ai_menu_analysis");
  if (savedState) {
    const parsed = JSON.parse(savedState);
    if (parsed.analyzed) {
      isAnalyzed.value = true;
      lastUpdated.value = parsed.timestamp;
    }
  }
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat("th-TH").format(value);
};
</script>

<style scoped>
/* Animations */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}

@keyframes bounceShort {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}
.animate-bounce-short {
  animation: bounceShort 1s infinite;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}
.animate-fade-in {
  animation: fadeInUp 0.5s ease-out 0.2s forwards;
  opacity: 0;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.9);
}

/* Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
