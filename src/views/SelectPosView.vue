<template>
  <div class="w-full flex flex-col">
    
    <div class="px-4 md:px-10 pt-4 md:pt-6 pb-2 md:pb-4 flex-none">
      <h1 class="text-2xl md:text-3xl font-bold text-[#051960] tracking-tight mb-2 md:mb-3">
        {{ $t('select_pos_view.title') }}
      </h1>
      <p class="text-gray-500 text-sm md:text-base font-light">
        {{ $t('select_pos_view.subtitle') }}
      </p>
    </div>

    <div class="px-4 md:px-10 pt-4 pb-0 md:py-6">
      
      <div v-if="isLoading" class="flex justify-center items-center h-40">
        <p class="text-gray-400">{{ $t('select_pos_view.status.loading') }}</p>
      </div>

      <div v-else-if="posList.length === 0" class="flex justify-center items-center h-40">
        <p class="text-gray-400">{{ $t('select_pos_view.status.no_data') }}</p>
      </div>

      <div v-else class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6">
        <div
          v-for="pos in posList"
          :key="pos.id"
          @click="selectPos(pos.id)"
          class="group relative rounded-2xl md:rounded-[1.5rem] overflow-hidden aspect-square cursor-pointer transition-all duration-300 ease-out flex flex-col bg-white"
          :class="[
            selectedPosId === pos.id
              ? 'ring-[3px] ring-[#F97316] shadow-xl scale-[1.02] z-10'
              : 'border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-gray-200',
          ]"
        >
          <div
            v-if="selectedPosId === pos.id"
            class="absolute top-1.5 right-1.5 md:top-3 md:right-3 z-20 bg-[#F97316] text-white rounded-full w-5 h-5 md:w-7 md:h-7 flex items-center justify-center shadow-md animate-pop-in"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3 md:h-4 md:w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <div
            class="flex-1 bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-2 md:p-4 relative overflow-hidden group-hover:from-blue-50/50 transition-all duration-500"
          >
            <div
              class="z-10 w-10 h-10 md:w-16 md:h-16 bg-white rounded-lg md:rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-300 group-hover:scale-110 transition-transform duration-300"
            >
              <span class="text-base md:text-2xl font-bold text-[#051960]">{{ pos.name.charAt(0) }}</span>
            </div>
          </div>

          <div
            class="h-8 md:h-12 flex items-center justify-center border-t border-gray-50 bg-white group-hover:bg-[#051960] transition-colors duration-300 px-1 md:px-2"
          >
            <span
              class="font-medium text-[10px] md:text-sm transition-colors duration-300 truncate w-full text-center"
              :class="
                selectedPosId === pos.id
                  ? 'text-[#F97316] font-bold group-hover:text-white'
                  : 'text-gray-600 group-hover:text-white'
              "
            >
              {{ pos.name }}
            </span>
          </div>
        </div>
      </div>

      <div class="flex justify-between items-center mt-4 md:mt-10 mb-4 md:mb-6">
        <button
          @click="router.back()"
          class="text-gray-400 hover:text-[#051960] font-medium px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-1 md:gap-2 text-sm md:text-base"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          {{ $t('select_pos_view.buttons.back') }}
        </button>

        <button
          @click="handleContinue"
          :disabled="!selectedPosId"
          class="bg-[#F97316] hover:bg-[#ea580c] text-white font-bold text-sm md:text-base px-6 py-2.5 md:px-8 md:py-3 rounded-full shadow-lg shadow-orange-200 disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none transition-all transform active:scale-95 flex items-center gap-2"
        >
          {{ $t('select_pos_view.buttons.continue') }}
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
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import api from "@/utils/axios";

const router = useRouter();
const { t } = useI18n();
const selectedPosId = ref(null);
const posList = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const response = await api.get('/restaurant-registration-options');
    
    if (response.data && response.data.posSystems) {
      // แปลงโครงสร้างข้อมูล (Map)
      const rawPosList = response.data.posSystems.map(system => ({
        id: system.pos_systems_id,
        name: system.pos_systems_name 
      }));

      // หา ID ของตัวเลือก "อื่นๆ" หรือ "Standard CSV" เพื่อใช้เป็น fallback
      const fallbackOption = rawPosList.find(pos => 
        ['Standard CSV', 'อื่นๆ', 'Other'].includes(pos.name)
      );
      
      const otherPosId = fallbackOption ? fallbackOption.id : 99;

      // กรอง (Filter) เพื่อแยก Standard CSV และตัวเลือกที่ไม่ต้องการแสดงซ้ำ
      const mainPosList = rawPosList.filter(pos => {
        const name = pos.name.trim();
        const isStandardCsv = name.toLowerCase().includes('standard csv');
        return !isStandardCsv && !['ไม่มี', 'อื่นๆ', 'None', 'Other', 'Standard CSV (Others)'].includes(name);
      });

      posList.value = [
        ...mainPosList,
        { id: otherPosId, name: t('select_pos_view.other_pos_label') } 
      ];
    }
  } catch (error) {
    console.error("Failed to fetch POS systems:", error);
    // กรณี Error ให้แสดง "POS อื่นๆ" เป็นค่า Default 
    posList.value = [{ id: 99, name: 'POS อื่นๆ' }];
  } finally {
    isLoading.value = false;
  }
});

// เลือก POS
const selectPos = (id) => {
  selectedPosId.value = id;
};

// ปุ่ม ดำเนินการต่อ
const handleContinue = () => {
  if (selectedPosId.value) {
    const selected = posList.value.find((p) => p.id === selectedPosId.value);
    console.log("Selected POS:", selected.name, "ID:", selected.id);

    router.push({
      name: "branch-connect",
      query: { posName: selected.name, posId: selected.id },
    });
  }
};
</script>

<style scoped>
@keyframes popIn {
  0% {
    transform: scale(0) rotate(-45deg);
    opacity: 0;
  }
  80% {
    transform: scale(1.2) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}
.animate-pop-in {
  animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
</style>