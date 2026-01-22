<template>
  <div class="w-full h-full relative flex justify-center items-center">
    <Pie :data="chartData" :options="chartOptions" />

    <div
      v-if="isMobile"
      class="absolute flex flex-col items-center justify-center pointer-events-none animate-fade-in"
    >
      <span class="text-[10px] text-gray-400 font-medium">{{ $t('promotion_pie_chart.center_label') }}</span>
      <span class="text-lg font-bold text-[#051960]">{{
        totalAmountFormatted
      }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const { t } = useI18n();
const props = defineProps({
  promotionAmount: { type: Number, default: 0 },
  regularAmount: { type: Number, default: 0 },
});

const colors = ["#F47122", "#002683"];
const windowWidth = ref(window.innerWidth);

// -- Logic ตรวจจับขนาดหน้าจอ --
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => window.addEventListener("resize", updateWidth));
onUnmounted(() => window.removeEventListener("resize", updateWidth));

const isMobile = computed(() => windowWidth.value < 768);

// คำนวณยอดรวมสำหรับโชว์ตรงกลางรูโดนัท
const totalAmountFormatted = computed(() => {
  const total = (props.promotionAmount || 0) + (props.regularAmount || 0);
  if (total >= 1000000) return (total / 1000000).toFixed(1) + "M";
  if (total >= 1000) return (total / 1000).toFixed(1) + "k";
  return total.toLocaleString();
});

const chartData = computed(() => {
  const hasData = props.promotionAmount > 0 || props.regularAmount > 0;

  return {
    labels: [
      t("promotion_pie_chart.labels.promotion"),
      t("promotion_pie_chart.labels.regular"),
    ],
    datasets: [
      {
        data: hasData
          ? [props.promotionAmount, props.regularAmount]
          : [0, 0.01],
        backgroundColor: colors,
        borderWidth: 0,
        hoverOffset: 15,
        cutout: isMobile.value ? "70%" : 0,
      },
    ],
  };
});

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  rotation: -120,
  layout: {
    padding: 20,
  },
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  animation: {
    duration: 500,
  },
}));
</script>
