<template>
  <div
    class="w-full min-h-screen px-4 md:px-6 lg:px-10 py-8 font-sans bg-[#F3F5F9]"
  >
    <div
      class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-10"
    >
      <div>
        <h1
          class="text-2xl md:text-3xl font-bold text-[#051960] tracking-tight mb-2"
        >
          {{ $t("ideas_view.header.title") }}
        </h1>
        <p class="text-gray-500 text-xs md:text-base font-light">
          {{ $t("ideas_view.header.subtitle") }}
          <span class="text-[#F97316] font-medium"
            >AI Matching Intelligence</span
          >
        </p>
      </div>
    </div>

    <div class="bg-transparent relative z-20">
      <div
        class="flex flex-col md:flex-row items-center justify-start gap-3 md:gap-4"
      >
        <div class="relative group z-20 w-full md:w-[280px]">
          <label
            class="hidden md:block mb-1.5 ml-1 text-[12px] font-bold uppercase tracking-wider transition-colors"
            :class="isChannelOpen ? 'text-orange-500' : 'text-gray-400'"
          >
            {{ $t("ideas_view.filters.channel_label") }}
          </label>

          <div
            @click="!isAnalyzing ? toggleChannel() : null"
            class="relative w-full h-[42px] md:h-[48px] rounded-2xl md:rounded-[1.5rem] border bg-white transition-all duration-300 cursor-pointer flex items-center px-4 md:px-6 shadow-sm"
            :class="[
              isChannelOpen
                ? 'border-orange-500 ring-2 ring-orange-50'
                : 'border-gray-200 hover:border-orange-400 hover:shadow-md',
            ]"
          >
            <div
              class="w-full text-[#051960] font-semibold text-xs md:text-sm md:text-base truncate pr-6 md:pr-8 select-none"
            >
              {{
                getSelectedChannelName ||
                $t("ideas_view.filters.channel_placeholder")
              }}
            </div>

            <div
              class="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-300 pointer-events-none"
              :class="{ 'rotate-180 text-orange-500': isChannelOpen }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 md:h-5 md:w-5"
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
              class="absolute top-[calc(100%+0.5rem)] left-0 w-full bg-white rounded-xl md:rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden py-2 z-50"
            >
              <div
                v-for="option in channelOptions"
                :key="option.value"
                @click="selectChannel(option.value)"
                class="px-4 md:px-6 py-2 md:py-3 hover:bg-orange-50 cursor-pointer transition-colors text-[#051960] text-xs md:text-base font-medium flex items-center justify-between"
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

        <div class="flex-shrink-0 w-full md:w-auto md:mt-6">
          <button
            @click="handleAnalyzeClick"
            :disabled="isButtonDisabled"
            class="group relative flex items-center justify-center md:justify-start gap-2 md:gap-4 px-4 md:pl-6 md:pr-1 h-[42px] md:h-[48px] rounded-full shadow-lg transition-all duration-300 w-full md:w-auto md:min-w-[240px]"
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
            <div
              class="flex flex-col items-center md:items-start flex-1 md:pl-2"
            >
              <span
                class="text-sm md:text-base font-bold tracking-wide transition-all duration-300 whitespace-nowrap"
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
                class="hidden md:block text-[9px] transition-all duration-300 font-medium -mt-0.5"
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
              class="hidden md:flex w-10 h-10 rounded-full items-center justify-center shadow-inner relative overflow-hidden transition-transform duration-300"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>

    <div class="bg-transparent relative min-h-[500px]">
      <div
        v-if="isAnalyzing"
        class="absolute inset-0 z-30 flex flex-col items-center justify-center transition-all duration-300"
      >
        <div
          class="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center gap-6 animate-bounce-slight max-w-sm text-center"
        >
          <div
            class="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 text-orange-500 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <h3 class="text-[#051960] font-bold text-lg mb-1">
              {{ $t("ideas_view.state.ai_working.title") }}
            </h3>
            <p class="text-gray-400 text-sm font-light">
              {{ $t("ideas_view.state.ai_working.subtitle") }}
            </p>
          </div>
        </div>
      </div>

      <div
        v-if="!isAnalyzed && !isAnalyzing"
        class="flex flex-col items-center justify-center h-[500px] text-gray-300 gap-6 opacity-60"
      >
        <div
          class="w-28 h-28 bg-white rounded-full flex items-center justify-center text-gray-300 shadow-sm mb-2 animate-float"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-14 w-14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div class="text-center">
          <h3 class="text-xl font-bold text-gray-400 mb-2">
            {{ $t("ideas_view.state.waiting.title") }}
          </h3>
          <p class="font-light text-gray-400">
            {{ $t("ideas_view.state.waiting.subtitle") }}
          </p>
        </div>
      </div>

      <div v-if="isAnalyzed" class="mt-4 pb-20 md:pb-4 md:p-4">
        <div
          class="flex flex-row items-center justify-between gap-4 mb-4 md:mb-8 animate-fade-in-up"
        >
          <h3
            class="text-lg md:text-xl font-bold text-[#051960] flex items-center gap-3"
          >
            <span class="flex h-3 w-3 relative">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-3 w-3 bg-orange-500"
              ></span>
            </span>
            {{ $t("ideas_view.results.title") }}
          </h3>
          <span
            class="text-[10px] md:text-xs text-gray-500 font-medium bg-white px-3 md:px-4 py-1.5 rounded-full border border-gray-200 shadow-sm"
          >
            {{ $t("ideas_view.results.last_updated") }} {{ lastUpdated }}
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div
            v-for="(idea, index) in ideas"
            :key="index"
            class="group relative bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 border border-gray-200/60 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-500"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div
              class="absolute top-0 right-0 px-4 md:px-5 py-1.5 md:py-2 rounded-bl-2xl md:rounded-bl-3xl text-[9px] md:text-[10px] font-bold uppercase tracking-wider border-l border-b"
              :class="idea.badgeColor"
            >
              {{ idea.type }}
            </div>

            <div class="flex items-start gap-3 md:gap-4 mb-4 md:mb-5 mt-2">
              <div
                class="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm border border-gray-50 flex-shrink-0"
                :class="idea.iconBg"
                v-html="idea.icon"
              ></div>
              <div class="min-w-0">
                <h4
                  class="text-base md:text-lg font-bold text-[#051960] group-hover:text-[#F97316] transition-colors truncate pr-16 md:pr-20 leading-tight"
                >
                  {{ idea.title }}
                </h4>
                <p class="text-xs md:text-sm text-gray-400 font-light mt-0.5">
                  {{ idea.subtitle }}
                </p>
              </div>
            </div>

            <div class="space-y-3 mb-4 md:mb-6">
              <div
                v-for="(item, idx) in idea.suggestions"
                :key="idx"
                class="relative"
              >
                <div
                  v-if="idx === 0"
                  @click="selectPromo(index, idx)"
                  class="rounded-xl p-3 md:p-4 border transition-all duration-300 relative overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-md"
                  :class="[
                    selectedPromoIndexes[index] === idx
                      ? 'ring-2 ring-orange-400 border-transparent shadow-md'
                      : 'border-transparent',
                    idea.contentBg,
                  ]"
                >
                  <div
                    class="absolute -right-4 -top-4 w-16 h-16 bg-white/20 rounded-full blur-xl"
                  ></div>
                  <div class="flex items-center gap-2 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 md:h-5 md:w-5 text-yellow-500 fill-yellow-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <span
                      class="text-[10px] md:text-xs font-bold uppercase tracking-wide opacity-70"
                      :class="idea.textColor"
                    >
                      {{ $t("ideas_view.card.top_pick") }}
                    </span>
                  </div>
                  <div class="flex items-start justify-between gap-2 md:gap-4">
                    <div class="min-w-0">
                      <h5
                        class="text-sm md:text-base font-bold text-[#051960] leading-tight mb-1 truncate"
                      >
                        {{ item.name }}
                      </h5>
                      <p
                        class="text-[10px] md:text-xs text-gray-600 font-medium truncate"
                      >
                        {{ item.detail }}
                      </p>
                    </div>
                    <div class="text-right flex-shrink-0">
                      <div
                        class="text-base md:text-lg font-bold"
                        :class="idea.scoreColor"
                      >
                        {{ item.score }}%
                      </div>
                      <div
                        class="text-[8px] md:text-[10px] text-gray-400 flex items-center justify-end gap-1 group/tooltip relative"
                      >
                        {{ $t("ideas_view.card.sales_opportunity") }}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  v-else
                  @click="selectPromo(index, idx)"
                  class="flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-300 border cursor-pointer hover:bg-gray-50 hover:translate-x-1"
                  :class="[
                    selectedPromoIndexes[index] === idx
                      ? 'bg-orange-50 border-orange-200 shadow-sm'
                      : 'bg-white border-transparent',
                  ]"
                >
                  <div class="flex items-center gap-3 min-w-0">
                    <div
                      class="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500 bg-gray-100 flex-shrink-0"
                    >
                      {{ idx + 1 }}
                    </div>
                    <div class="min-w-0">
                      <p
                        class="text-xs md:text-sm font-semibold text-[#051960] truncate"
                      >
                        {{ item.name }}
                      </p>
                      <p
                        class="text-[9px] md:text-[10px] text-gray-400 truncate"
                      >
                        {{ item.detail }}
                      </p>
                    </div>
                  </div>
                  <div class="text-xs md:text-sm font-bold text-gray-400 pl-2">
                    {{ item.score }}%
                  </div>
                </div>
              </div>
            </div>

            <div
              class="hidden md:block pt-4 border-t border-gray-50 text-center"
            >
              <button
                @click="
                  selectedPromoIndexes[index] !== null
                    ? openSetupModal(
                        idea,
                        idea.suggestions[selectedPromoIndexes[index]],
                      )
                    : null
                "
                :disabled="selectedPromoIndexes[index] === null"
                class="w-full py-2.5 rounded-3xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
                :class="[
                  selectedPromoIndexes[index] !== null
                    ? 'bg-[#051960] text-white hover:bg-[#F97316] active:scale-95 shadow-md'
                      'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200',
                ]"
              >
                <span>{{ $t("ideas_view.card.view_details_btn") }}</span>
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

            <div
              class="md:hidden pt-3 border-t border-gray-50 flex items-center gap-2"
            >
              <button
                @click.stop="toggleIdea(index)"
                class="h-9 px-3 rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors flex items-center justify-center gap-1 text-[10px] font-semibold"
              >
                <span>{{
                  idea.isOpen
                    ? $t("ideas_view.card.toggle.collapse")
                    : $t("ideas_view.card.toggle.expand")
                }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3 transition-transform duration-300"
                  :class="{ 'rotate-180': idea.isOpen }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <button
                @click="openSetupModal(idea, idea.suggestions[0])"
                class="flex-1 h-9 rounded-full bg-[#051960] text-white text-[10px] font-bold hover:bg-orange-500 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>{{ $t("ideas_view.card.create_btn") }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3"
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
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import PromotionSetupModal from "@/components/PromotionSetupModal.vue";
import { usePromotionStore } from "@/stores/promotion";
import { useCampaignStore } from "@/stores/campaign";
import { storeToRefs } from "pinia";
import Swal from "sweetalert2";

const router = useRouter();
const { t } = useI18n();

const promotionStore = usePromotionStore();
const campaignStore = useCampaignStore();

const {
  isAnalyzing,
  lastUpdated,
  pairingList,
  happyHourList,
  upsellList,
  slowMovingList,
} = storeToRefs(promotionStore);

// ใช้ hasData จาก store แทน isAnalyzed แบบเดิม
const isAnalyzed = computed(() => promotionStore.hasData);

const showSetupModal = ref(false);
const selectedIdeaData = ref(null);
const selectedSuggestion = ref(null);

const selectedPromoIndexes = ref({
  0: null, 
  1: null,
  2: null,
  3: null,
});

// ฟังก์ชันสำหรับเปลี่ยนรายการที่เลือกใน Card นั้นๆ
const selectPromo = (cardIndex, promoIndex) => {
  if (selectedPromoIndexes.value[cardIndex] === promoIndex) {
    selectedPromoIndexes.value[cardIndex] = null;
  } else {
    selectedPromoIndexes.value[cardIndex] = promoIndex;
  }
};

// 2. คืนค่าตัวแปร State ที่จำเป็น (ที่อาจจะเผลอลบไป)
const selectedBranch = ref(1);
const selectedChannel = ref("dinein");
const isBranchOpen = ref(false);
const isChannelOpen = ref(false);
const lastAnalyzedState = ref({ branch: null, channel: null });

const branches = [
  { id: 1, name: "สาขา สยามสแควร์" },
  { id: 2, name: "สาขา เซ็นทรัลเวิลด์" },
];

const channelOptions = [
  { value: "dinein", label: t("ideas_view.filters.channels.dinein") },
  { value: "delivery", label: t("ideas_view.filters.channels.delivery") },
  { value: "takeaway", label: t("ideas_view.filters.channels.takeaway") },
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
  if (isAnalyzing.value) return t("ideas_view.analyze_button.text.analyzing");
  if (isAnalyzed.value) {
    if (!hasFilterChanged.value)
      return t("ideas_view.analyze_button.text.completed");
    return t("ideas_view.analyze_button.text.update");
  }
  return t("ideas_view.analyze_button.text.start");
});

const buttonSubText = computed(() => {
  if (isAnalyzing.value)
    return t("ideas_view.analyze_button.subtext.processing");
  if (isAnalyzed.value && hasFilterChanged.value)
    return t("ideas_view.analyze_button.subtext.changed");
  return t("ideas_view.analyze_button.subtext.start");
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

// ฟังก์ชันสำหรับ Mobile Toggle Card
const toggleIdea = (index) => {
  ideas.value[index].isOpen = !ideas.value[index].isOpen;
};

// Map ข้อมูลจาก Store เข้ากับ UI
const ideas = computed(() => [
  {
    type: "Pairing",
    title: t("ideas_view.demo_ideas.pairing.title"),
    subtitle: t("ideas_view.demo_ideas.pairing.subtitle"),
    isOpen: false,
    badgeColor: "bg-blue-50 text-blue-600 border-blue-100",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>`,
    iconBg: "bg-blue-50 text-blue-500",
    contentBg: "bg-blue-50",
    textColor: "text-blue-600",
    scoreColor: "text-blue-600",
    suggestions: pairingList.value.map((item) => ({
      name: item.promotion_detail.title,
      detail: item.promotion_detail.subtitle,
      score: Math.round(item.score),
      ...item,
    })),
  },
  {
    type: "Happy Hour",
    title: t("ideas_view.demo_ideas.happy_hour.title"),
    subtitle: t("ideas_view.demo_ideas.happy_hour.subtitle"),
    isOpen: false,
    badgeColor: "bg-red-50 text-red-600 border-red-100",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    iconBg: "bg-red-50 text-red-500",
    contentBg: "bg-red-50",
    textColor: "text-red-600",
    scoreColor: "text-red-600",
    suggestions: happyHourList.value.map((item) => ({
      name: item.promotion_detail.title,
      detail: item.promotion_detail.subtitle,
      score: Math.round(item.score),
      ...item,
    })),
  },
  {
    type: "Upsell",
    title: t("ideas_view.demo_ideas.upsell.title"),
    subtitle: t("ideas_view.demo_ideas.upsell.subtitle"),
    isOpen: false,
    badgeColor: "bg-purple-50 text-purple-600 border-purple-100",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>`,
    iconBg: "bg-purple-50 text-purple-500",
    contentBg: "bg-purple-50",
    textColor: "text-purple-600",
    scoreColor: "text-purple-600",
    suggestions: upsellList.value.map((item) => ({
      name: item.promotion_detail.title,
      detail: item.promotion_detail.subtitle,
      score: Math.round(item.score),
      ...item,
    })),
  },
  {
    type: "Slow Moving",
    title: t("ideas_view.demo_ideas.slow_moving.title"),
    subtitle: t("ideas_view.demo_ideas.slow_moving.subtitle"),
    isOpen: false,
    badgeColor: "bg-orange-50 text-orange-600 border-orange-100",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>`,
    iconBg: "bg-orange-50 text-orange-500",
    contentBg: "bg-orange-50",
    textColor: "text-orange-600",
    scoreColor: "text-orange-600",
    suggestions: slowMovingList.value.map((item) => ({
      name: item.promotion_detail.title,
      detail: item.promotion_detail.subtitle,
      score: Math.round(item.score),
      ...item,
    })),
  },
]);

const handleAnalyzeClick = async () => {
  if (!selectedBranch.value) return;

  isBranchOpen.value = false;
  isChannelOpen.value = false;

  const channelMap = {
    dinein: "Dine-in",
    delivery: "Delivery",
    takeaway: "Takeaway",
  };

  const apiChannel = channelMap[selectedChannel.value] || null;

  await promotionStore.analyzePromotions(apiChannel);

  lastAnalyzedState.value = {
    branch: selectedBranch.value,
    channel: selectedChannel.value,
  };
};

const openSetupModal = (idea, suggestion) => {
  selectedIdeaData.value = idea;
  selectedSuggestion.value = suggestion;
  showSetupModal.value = true;
};

const closeModal = () => {
  showSetupModal.value = false;
};

const handlePromotionConfirm = async (formData) => {
  const payload = {
    name: formData.promotionName,
    type: selectedSuggestion.value.type,
    start_date: formData.startDate,
    end_date: formData.endDate,
    predicted_impact: Math.round(selectedSuggestion.value.score),
    target_revenue: 0,
    campaign_config: {
      ...selectedSuggestion.value.promotion_detail,
      channel:
        selectedChannel.value === "dinein"
          ? "Dine-in"
          : selectedChannel.value === "delivery"
            ? "Delivery"
            : selectedChannel.value === "takeaway"
              ? "Takeaway"
              : "All",
    },
  };

  try {
    const success = await campaignStore.createCampaign(payload);

    if (success) {
      Swal.fire({
        icon: "success",
        title: "สร้างแคมเปญสำเร็จ!",
        text: "ระบบกำลังเริ่มติดตามยอดขายสำหรับแคมเปญนี้",
        confirmButtonText: "ดูประวัติแคมเปญ",

        buttonsStyling: false,
        customClass: {
          popup:
            "rounded-[2rem] md:rounded-[2.5rem] font-sans shadow-2xl w-[80%] md:w-[24rem] pt-8 pb-6 px-4 md:p-8",
          title: "text-[#051960] text-xl md:text-2xl font-bold mb-1",
          htmlContainer: "text-gray-500 text-xs md:text-sm font-light px-2",
          confirmButton:
            "bg-[#F97316] hover:bg-[#ea580c] text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg shadow-orange-200 transition-all transform hover:-translate-y-1 active:scale-95 outline-none w-full md:w-auto mt-2",
          icon: "border-none !mt-0 !mb-2 transform scale-60 md:scale-100",
        },
        background: "#fff",
      }).then(() => {
        showSetupModal.value = false;
        router.push("/history");
      });
    } else {
      throw new Error("API returned false");
    }
  } catch (error) {
    console.error("Create Campaign Error:", error);

    Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาด",
      text: "ไม่สามารถสร้างแคมเปญได้ กรุณาลองใหม่อีกครั้ง",
      confirmButtonText: "ปิด",
      buttonsStyling: false,
      customClass: {
        popup:
          "rounded-[2rem] md:rounded-[2.5rem] font-sans shadow-2xl w-[80%] md:w-[24rem] pt-8 pb-6 px-4 md:p-8",
        title: "text-[#051960] text-lg md:text-xl font-bold mb-2",
        htmlContainer: "text-gray-500 text-xs md:text-sm",
        confirmButton:
          "bg-gray-100 hover:bg-gray-200 text-[#051960] font-bold text-sm px-6 py-2.5 rounded-full transition-all outline-none w-full md:w-auto",
        icon: "border-none !mt-0 !mb-2 transform scale-60 md:scale-100",
      },
    });
  }
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
