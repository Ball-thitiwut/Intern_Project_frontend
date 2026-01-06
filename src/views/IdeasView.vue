<template>
  <div class="w-full min-h-screen px-6 md:px-10 py-8 font-sans bg-[#F3F5F9]">
    <div
      class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
    >
      <div>
        <h1 class="text-3xl font-bold text-[#051960] tracking-tight mb-2">
          ไอเดียเพิ่มยอดขาย
        </h1>
        <p class="text-gray-500 text-sm md:text-base font-light">
          ค้นหาโอกาสในการเพิ่มยอดขายด้วย
          <span class="text-[#F97316] font-medium"
            >AI Matching Intelligence</span
          >
        </p>
      </div>
    </div>

    <div
      class="bg-[#F8FAFC] rounded-[3.5rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white mb-10 relative z-20"
    >
      <div class="flex flex-col xl:flex-row items-center gap-3 xl:gap-4">
        <div
          class="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-3 xl:gap-4"
        >
          <div class="relative group z-30">
            <div
              class="relative w-full h-[48px] rounded-[2rem] border border-gray-200 bg-white flex items-center px-6 cursor-default"
            >
              <label
                class="absolute -top-2.5 left-6 bg-white px-2 text-[12px] font-semibold uppercase tracking-wider text-gray-400 z-10"
              >
                สาขา
              </label>

              <div
                class="w-full font-semibold text-sm md:text-base truncate pr-8 select-none text-[#051960]"
              >
                {{ getSelectedBranchName || "-- เลือกสาขา --" }}
              </div>
              
              </div>

            </div>

          <div class="relative group z-20">
            <div
              @click="!isAnalyzing ? toggleChannel() : null"
              class="relative w-full h-[48px] rounded-[2rem] border bg-white transition-all duration-300 cursor-pointer flex items-center px-6"
              :class="[
                isChannelOpen
                  ? 'border-orange-500 ring-2 ring-orange-100'
                  : 'border-gray-200 hover:border-orange-400 hover:shadow-md',
              ]"
            >
              <label
                class="absolute -top-2.5 left-6 bg-white px-2 text-[12px] font-semibold uppercase tracking-wider transition-colors z-10"
                :class="
                  isChannelOpen
                    ? 'text-orange-500'
                    : 'text-gray-400 group-hover:text-orange-500'
                "
              >
                ประเภทการขาย
              </label>

              <div
                class="w-full text-[#051960] font-semibold text-sm md:text-base truncate pr-8 select-none"
              >
                {{ getSelectedChannelName || "ทั้งหมด" }}
              </div>

              <div
                class="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-300 pointer-events-none"
                :class="{ 'rotate-180 text-orange-500': isChannelOpen }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div
                v-if="isChannelOpen"
                class="absolute top-[calc(100%+0.5rem)] left-0 w-full bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden py-2 z-50"
              >
                <div
                  v-for="option in channelOptions"
                  :key="option.value"
                  @click="selectChannel(option.value)"
                  class="px-6 py-3 hover:bg-orange-50 cursor-pointer transition-colors text-[#051960] text-sm md:text-base font-medium flex items-center justify-between"
                  :class="{
                    'bg-orange-50/50 text-orange-600':
                      selectedChannel === option.value,
                  }"
                >
                  <span>{{ option.label }}</span>
                </div>
              </div>
            </transition>

            <div
              v-if="isChannelOpen"
              @click="isChannelOpen = false"
              class="fixed inset-0 z-40 bg-transparent cursor-default"
            ></div>
          </div>
        </div>

        <div
          class="flex-shrink-0 flex flex-col items-center md:items-end w-full md:w-auto mt-3 md:mt-0 xl:mt-0"
        >
          <button
            @click="handleAnalyzeClick"
            :disabled="isButtonDisabled"
            class="group relative flex items-center gap-4 pl-6 pr-1 h-[48px] rounded-full shadow-lg transition-all duration-300 w-full md:w-auto md:min-w-[260px]"
            :class="[
              isAnalyzing
                ? 'bg-orange-300 border-2 border-orange-300 cursor-wait'
                : isAnalyzed && !hasFilterChanged
                ? 'bg-emerald-500 border-2 border-emerald-500 cursor-default shadow-md'
                : !isButtonDisabled
                ? 'bg-gradient-to-r from-[#F97316] to-[#ea580c] hover:shadow-orange-500/50 hover:-translate-y-1 cursor-pointer'
                : 'bg-gray-100 border-2 border-gray-200 cursor-not-allowed',
            ]"
          >
            <div class="flex flex-col items-start flex-1 pl-2">
              <span
                class="text-base font-bold tracking-wide transition-all duration-300 whitespace-nowrap"
                :class="
                  isButtonDisabled &&
                  !isAnalyzing &&
                  !(isAnalyzed && !hasFilterChanged)
                    ? 'text-gray-400'
                    : 'text-white'
                "
              >
                {{ buttonText }}
              </span>
              <span
                v-if="
                  !isButtonDisabled ||
                  isAnalyzing ||
                  (isAnalyzed && !hasFilterChanged)
                "
                class="text-[9px] transition-all duration-300 font-medium -mt-0.5"
                :class="
                  isButtonDisabled &&
                  !isAnalyzing &&
                  !(isAnalyzed && !hasFilterChanged)
                    ? 'text-gray-400'
                    : 'text-white opacity-90'
                "
              >
                {{ buttonSubText }}
              </span>
            </div>

            <div
              class="w-10 h-10 rounded-full flex items-center justify-center shadow-inner relative overflow-hidden transition-transform duration-300"
              :class="[
                { 'animate-spin': isAnalyzing },
                isButtonDisabled &&
                !isAnalyzing &&
                !(isAnalyzed && !hasFilterChanged)
                  ? 'bg-gray-200'
                  : 'bg-white',
              ]"
            >
              <span
                v-if="isAnalyzed && !hasFilterChanged && !isAnalyzing"
                class="text-emerald-500 text-lg font-bold animate-bounce-short"
                >✓</span
              >
              <div
                v-else
                class="relative w-full h-full flex items-center justify-center"
              >
                <span
                  class="text-2xl transition-transform duration-300"
                  :class="{
                    'group-hover:translate-x-1 group-hover:rotate-[10deg]':
                      !isButtonDisabled && !isAnalyzing,
                  }"
                  >💡</span
                >
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>

    <div
      class="bg-[#F8FAFC] rounded-[2.5rem] shadow-sm border border-white overflow-hidden relative min-h-[500px]"
    >
      <div
        v-if="isAnalyzing"
        class="absolute inset-0 bg-white/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center transition-all duration-300"
      >
        <div
          class="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center gap-6 animate-bounce-slight max-w-sm text-center"
        >
          <div
            class="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center relative"
          >
            <span class="text-3xl animate-spin">⚙️</span>
          </div>
          <div>
            <h3 class="text-[#051960] font-bold text-lg mb-1">AI กำลังทำงาน</h3>
            <p class="text-gray-400 text-sm font-light">
              กำลังวิเคราะห์พฤติกรรมลูกค้า...
            </p>
          </div>
        </div>
      </div>

      <div
        v-if="!isAnalyzed && !isAnalyzing"
        class="flex flex-col items-center justify-center h-[500px] text-gray-300 gap-6 opacity-60"
      >
        <div
          class="w-28 h-28 bg-white rounded-full flex items-center justify-center text-6xl shadow-sm mb-2 grayscale animate-float"
        >
          🔮
        </div>
        <div class="text-center">
          <h3 class="text-xl font-bold text-gray-400 mb-2">รอคำสั่งจากคุณ</h3>
          <p class="font-light text-gray-400">
            เลือกเงื่อนไขด้านบน แล้วกดปุ่มเพื่อเริ่มค้นหาไอเดีย
          </p>
        </div>
      </div>

      <div v-if="isAnalyzed" class="p-6 md:p-10">
        <div
          class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-in-up"
        >
          <h3 class="text-xl font-bold text-[#051960] flex items-center gap-3">
            <span class="flex h-3 w-3 relative">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-3 w-3 bg-orange-500"
              ></span>
            </span>
            ผลลัพธ์การวิเคราะห์
          </h3>
          <span
            class="text-xs text-gray-500 font-medium bg-white px-4 py-1.5 rounded-full border border-gray-200 shadow-sm self-start md:self-auto"
          >
            ข้อมูลล่าสุด: {{ lastUpdated }}
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="(idea, index) in ideas"
            :key="index"
            class="group relative bg-white rounded-[2rem] p-6 border border-gray-200/60 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-500"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div
              class="absolute top-0 right-0 px-5 py-2 rounded-bl-3xl text-[10px] font-bold uppercase tracking-wider border-l border-b"
              :class="idea.badgeColor"
            >
              {{ idea.type }}
            </div>

            <div class="flex items-start gap-4 mb-5 mt-2">
              <div
                class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-gray-50 flex-shrink-0"
                :class="idea.iconBg"
              >
                {{ idea.icon }}
              </div>
              <div class="min-w-0">
                <h4
                  class="text-lg font-bold text-[#051960] group-hover:text-[#F97316] transition-colors truncate pr-20"
                >
                  {{ idea.title }}
                </h4>
                <p class="text-sm text-gray-400 font-light mt-0.5">
                  {{ idea.subtitle }}
                </p>
              </div>
            </div>

            <div class="space-y-3 mb-6">
              <div
                v-for="(item, idx) in idea.suggestions"
                :key="idx"
                class="relative"
              >
                <div
                  v-if="idx === 0"
                  @click="openSetupModal(idea, item)"
                  class="rounded-xl p-4 border transition-colors duration-300 relative overflow-hidden cursor-pointer"
                  :class="[idea.contentBg, 'border-transparent']"
                >
                  <div
                    class="absolute -right-4 -top-4 w-16 h-16 bg-white/20 rounded-full blur-xl"
                  ></div>

                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-lg">👑</span>
                    <span
                      class="text-xs font-bold uppercase tracking-wide opacity-70"
                      :class="idea.textColor"
                    >
                      แนะนำสูงสุด (Top Pick)
                    </span>
                  </div>

                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <h5
                        class="text-base font-bold text-[#051960] leading-tight mb-1"
                      >
                        {{ item.name }}
                      </h5>
                      <p class="text-xs text-gray-600 font-medium">
                        {{ item.detail }}
                      </p>
                    </div>
                    <div class="text-right flex-shrink-0">
                      <div class="text-lg font-bold" :class="idea.scoreColor">
                        {{ item.score }}%
                      </div>
                      <div class="text-[10px] text-gray-400">Match Rate</div>
                    </div>
                  </div>
                </div>

                <div
                  v-else
                  @click="openSetupModal(idea, item)"
                  class="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 cursor-pointer"
                >
                  <div class="flex items-center gap-3 min-w-0">
                    <div
                      class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500 bg-gray-100 flex-shrink-0"
                    >
                      {{ idx + 1 }}
                    </div>
                    <div class="min-w-0">
                      <p class="text-sm font-semibold text-[#051960] truncate">
                        {{ item.name }}
                      </p>
                      <p class="text-[10px] text-gray-400 truncate">
                        {{ item.detail }}
                      </p>
                    </div>
                  </div>
                  <div class="text-sm font-bold text-gray-400 pl-2">
                    {{ item.score }}%
                  </div>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-gray-50 text-center">
              <button
                @click="openSetupModal(idea, idea.suggestions[0])"
                class="w-full py-2.5 rounded-3xl bg-white border border-gray-200 text-[#051960] text-sm font-bold hover:bg-[#051960] hover:text-white hover:border-transparent transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2"
              >
                <span>ดูรายละเอียด & สร้างโปร</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <PromotionSetupModal
      :is-open="showSetupModal"
      :idea-data="selectedIdeaData"
      :suggestion-data="selectedSuggestion"
      @close="closeModal"
      @confirm="handlePromotionConfirm"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import PromotionSetupModal from "@/components/PromotionSetupModal.vue";

const router = useRouter();

const isAnalyzing = ref(false);
const isAnalyzed = ref(false);
const selectedBranch = ref(1);
const selectedChannel = ref("dinein");
const lastUpdated = ref(null);
const isBranchOpen = ref(false);
const isChannelOpen = ref(false);

const lastAnalyzedState = ref({ branch: null, channel: null });

const showSetupModal = ref(false);
const selectedIdeaData = ref(null);
const selectedSuggestion = ref(null);

const branches = [
  { id: 1, name: "สาขา สยามสแควร์" },
  { id: 2, name: "สาขา เซ็นทรัลเวิลด์" },
];

const channelOptions = [
  { value: "dinein", label: "ทานที่ร้าน" },
  { value: "delivery", label: "เดลิเวอรี" },
  { value: "takeaway", label: "ซื้อกลับบ้าน" },
];

const getSelectedBranchName = computed(() => {
  const found = branches.find((b) => b.id === selectedBranch.value);
  return found ? found.name : null;
});

const getSelectedChannelName = computed(() => {
  const found = channelOptions.find((c) => c.value === selectedChannel.value);
  return found ? found.label : null;
});

const hasFilterChanged = computed(() => {
  if (!isAnalyzed.value) return true;

  return (
    selectedBranch.value !== lastAnalyzedState.value.branch ||
    selectedChannel.value !== lastAnalyzedState.value.channel
  );
});

const isButtonDisabled = computed(() => {
  if (!selectedBranch.value) return true;
  if (isAnalyzing.value) return true;
  if (isAnalyzed.value && !hasFilterChanged.value) return true;
  return false;
});

const buttonText = computed(() => {
  if (isAnalyzing.value) return "กำลังวิเคราะห์...";
  if (isAnalyzed.value) {
    if (!hasFilterChanged.value) return "วิเคราะห์เสร็จสิ้น";
    return "อัปเดตข้อมูล";
  }
  return "เริ่มค้นหาไอเดีย";
});

const buttonSubText = computed(() => {
  if (isAnalyzing.value) return "Processing...";
  if (isAnalyzed.value && hasFilterChanged.value) return "Data Changed";
  return "Start AI Analysis";
});

const toggleChannel = () => {
  isChannelOpen.value = !isChannelOpen.value;
  if (isChannelOpen.value) {
    isBranchOpen.value = false;
  }
};

const selectBranch = (id) => {
  selectedBranch.value = id;
  isBranchOpen.value = false;
};

const selectChannel = (value) => {
  selectedChannel.value = value;
  isChannelOpen.value = false;
};

const ideas = ref([
  {
    type: "Pairing",
    title: "จับคู่เซ็ตเมนู",
    subtitle: "เพิ่มยอดต่อบิลด้วยเมนูที่คู่กัน",
    badgeColor: "bg-blue-50 text-blue-600 border-blue-100",
    icon: "🍔",
    iconBg: "bg-blue-50 text-blue-500",
    contentBg: "bg-blue-50",
    textColor: "text-blue-600",
    scoreColor: "text-blue-600",
    suggestions: [
      {
        name: "ข้าวมันไก่ + น้ำซุปฟัก",
        detail: "แนะนำขาย ฿89 (ปกติ ฿100)",
        score: 92,
      },
      { name: "ข้าวหมูแดง + เกี๊ยวน้ำ", detail: "เพิ่มกำไร 15%", score: 85 },
      {
        name: "บะหมี่แห้ง + น้ำเก๊กฮวย",
        detail: "ยอดนิยมช่วงเที่ยง",
        score: 78,
      },
    ],
  },
  {
    type: "Happy Hour",
    title: "โปรช่วงเวลาพิเศษ",
    subtitle: "กระตุ้นยอดขายช่วงคนน้อย",
    badgeColor: "bg-red-50 text-red-600 border-red-100",
    icon: "⏰",
    iconBg: "bg-red-50 text-red-500",
    contentBg: "bg-red-50",
    textColor: "text-red-600",
    scoreColor: "text-red-600",
    suggestions: [
      { name: "ลด 20% เมนูเส้น", detail: "เวลา 14:00 - 16:00 น.", score: 88 },
      { name: "เครื่องดื่ม 1 แถม 1", detail: "ก่อน 11:00 น.", score: 82 },
      { name: "ทานครบ 300 ลด 50", detail: "มื้อดึกหลัง 2 ทุ่ม", score: 75 },
    ],
  },
  {
    type: "Upsell",
    title: "จัดโปรของแถม",
    subtitle: "ดันยอดบิลเฉลี่ยให้สูงขึ้น",
    badgeColor: "bg-purple-50 text-purple-600 border-purple-100",
    icon: "🎁",
    iconBg: "bg-purple-50 text-purple-500",
    contentBg: "bg-purple-50",
    textColor: "text-purple-600",
    scoreColor: "text-purple-600",
    suggestions: [
      {
        name: "ครบ ฿500 ฟรี เกี๊ยวซ่า",
        detail: "ต้นทุนของแถมต่ำกว่า 10%",
        score: 89,
      },
      { name: "อัพไซส์น้ำฟรี", detail: "เมื่อสั่งคู่กับข้าว", score: 84 },
      { name: "เพิ่มไข่ดาว 5 บาท", detail: "จากปกติ 10 บาท", score: 80 },
    ],
  },
  {
    type: "Slow Moving",
    title: "กระตุ้นเมนูยอดน้อย",
    subtitle: "เพิ่มยอดสั่งเมนูที่ลูกค้ามองข้าม",
    badgeColor: "bg-orange-50 text-orange-600 border-orange-100",
    icon: "📉",
    iconBg: "bg-orange-50 text-orange-500",
    contentBg: "bg-orange-50",
    textColor: "text-orange-600",
    scoreColor: "text-orange-600",
    suggestions: [
      {
        name: "ลด 15% ยำวุ้นเส้น",
        detail: "ยอดขายต่ำสุดในหมวดยำ",
        score: 90,
      },
      {
        name: "แถมน้ำสมุนไพร",
        detail: "เมื่อสั่งแกงป่า (ยอดขายน้อย)",
        score: 85,
      },
      {
        name: "ลด 20 บาท ทอดมันกุ้ง",
        detail: "ไม่ได้ขายมา 3 วันแล้ว",
        score: 70,
      },
    ],
  },
]);

const handleAnalyzeClick = () => {
  if (!selectedBranch.value) return;
  isAnalyzing.value = true;
  isBranchOpen.value = false;
  isChannelOpen.value = false;

  setTimeout(() => {
    isAnalyzing.value = false;
    isAnalyzed.value = true;

    lastAnalyzedState.value = {
      branch: selectedBranch.value,
      channel: selectedChannel.value,
    };

    const now = new Date();
    lastUpdated.value =
      now.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }) +
      " น.";
  }, 1500);
};

const openSetupModal = (idea, suggestion) => {
  selectedIdeaData.value = idea;
  selectedSuggestion.value = suggestion;
  showSetupModal.value = true;
};

const closeModal = () => {
  showSetupModal.value = false;
};

const handlePromotionConfirm = (formData) => {
  console.log("Creating Promotion:", {
    idea: selectedIdeaData.value,
    suggestion: selectedSuggestion.value,
    ...formData,
  });

  showSetupModal.value = false;
  router.push("/history");
};
</script>

<style scoped>
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
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes bounceSlight {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
.animate-bounce-slight {
  animation: bounceSlight 2s infinite ease-in-out;
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>