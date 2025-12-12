<template>
  <div class="flex flex-col gap-6 rounded-xl font-sans text-[#051960] animate-fade-in h-full">
    
    <div class="bg-white rounded-3xl p-6 pb-10 shadow-sm w-full">
      <div class="text-xl font-bold text-[#051960] mb-6">ยอดขายเฉลี่ยต่อบิลรายวัน</div>
      
      <div class="h-72 w-full pl-4"> 
        <AverageSalesChart :dates="dates" :values="barData" />
      </div>
    </div>

    <div class="bg-white rounded-3xl p-6 pb-10 shadow-sm w-full">
      <div class="text-xl font-bold text-[#051960] mb-6">จำนวนบิลรายวัน</div>

      <div class="h-72 w-full pl-4">
         <BillCountChart :dates="dates" :values="billCountData" />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import AverageSalesChart from '@/components/AverageSalesChart.vue';
import BillCountChart from '@/components/BillCountChart.vue';

const props = defineProps({
  dateRange: {
    type: Array,
    default: () => [new Date(), new Date()]
  },
  period: {
    type: String,
    default: '1m'
  }
});

const dates = ['01/17', '01/18', '01/19', '01/20', '01/21', '01/22', '01/23', '01/24', '01/25', '01/26', '01/27'];

// ข้อมูลสำหรับกราฟบน (ยอดขาย)
const barData = ref([
    { value: 320, highlight: false },
    { value: 150, highlight: false },
    { value: 350, highlight: false },
    { value: 210, highlight: false },
    { value: 580, highlight: true }, // แท่ง Highlight สีส้ม
    { value: 120, highlight: false },
    { value: 290, highlight: false },
    { value: 150, highlight: false },
    { value: 340, highlight: false },
    { value: 200, highlight: false },
    { value: 310, highlight: false },
]);

// ข้อมูลสำหรับกราฟล่าง (จำนวนบิล)
const billCountData = ref([
    { value: 32 },
    { value: 15 },
    { value: 35 },
    { value: 21 },
    { value: 48 },
    { value: 12 },
    { value: 29 },
    { value: 15 },
    { value: 34 },
    { value: 20 },
    { value: 32 },
]);

watch(() => props.dateRange, (newVal) => {
    console.log("Bill View: Date updated to", newVal);
});
</script>