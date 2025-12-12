<template>
  <div class="space-y-8 font-sans text-[#051960]">
    
    <GroupSizeChart 
      :chart-data="groupSizeChart"
      :table-data="groupSizeTable"
      :total-bills="176"
    />

    <StatAnalysisChart
      title="ยอดจ่ายเฉลี่ยต่อคน"
      :stats="[
        { value: '฿145', label: 'ค่าเฉลี่ยรวม' },
        { value: '฿101 - ฿150', label: 'ช่วงที่ลูกค้าจ่ายบ่อยที่สุด' }
      ]"
      :chart-data="spendPerPersonChart"
      y-axis-label="จำนวนบิล"
      x-axis-label="บาท"
      :y-ticks="['70','60','50','40','30','20','10','0']"
    />

    <StatAnalysisChart
      title="ยอดขายเฉลี่ยต่อบิล"
      :stats="[
        { value: '฿185', label: 'ยอดขายต่อบิลเฉลี่ย' },
        { value: '฿100 - ฿200', label: 'ช่วงยอดขายที่พบบ่อยสุด' },
        { value: '฿580 / ฿100', label: 'ยอดขายสูงสุด / ต่ำสุด' }
      ]"
      :chart-data="salesPerBillChart"
      y-axis-label="จำนวน"
      x-axis-label="บาท"
      :y-ticks="['30','25','20','15','10','5','0']"
    />

    <div class="space-y-4 pt-4">
      <div class="text-lg font-bold text-[#051960]">
        เมนูที่มักถูกสั่งพร้อมกัน
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="(pair, idx) in menuPairs" :key="idx" class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div class="flex items-center justify-between gap-2 mb-4">
            <div class="w-full aspect-square bg-[#002683]/5 rounded-xl"></div>
            <span class="text-gray-400 font-bold">+</span>
            <div class="w-full aspect-square bg-[#002683]/5 rounded-xl"></div>
          </div>
          <div class="flex justify-between items-end">
            <div class="space-y-1">
              <div class="text-sm font-semibold text-[#051960]">{{ pair.name1 }} {{ pair.name2 }}</div>
              <div class="text-[12px] text-gray-400">จำนวนการสั่งร่วมกัน</div>
            </div>
            <div class="text-right">
              <div class="text-sm font-bold text-[#051960]">฿{{ pair.price }}</div>
              <div class="text-sm font-bold text-gray-800">{{ pair.count }} ครั้ง</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
import GroupSizeChart from '@/components/GroupSizeChart.vue';
import StatAnalysisChart from '@/components/StatAnalysisChart.vue';

const groupSizeChart = ref([
  { label: "1", percent: 45, value: 32, highlight: false },
  { label: "2", percent: 80, value: 56, highlight: true }, 
  { label: "3", percent: 50, value: 35, highlight: false },
  { label: "4", percent: 30, value: 19, highlight: false },
  { label: "5", percent: 85, value: 59, highlight: false }, 
  { label: "6", percent: 20, value: 14, highlight: false },
  { label: ">7", percent: 2, value: 1, highlight: false },
]);

const groupSizeTable = ref([
  { size: "2", count: 56, percent: 31.8 },
  { size: "1", count: 55, percent: 31.3 },
  { size: "3", count: 35, percent: 19.9 },
  { size: "4", count: 15, percent: 8.5 },
  { size: "6", count: 14, percent: 8.0 },
  { size: "5", count: 1, percent: 0.6 },
  { size: ">7", count: 0, percent: 0 },
]);

const spendPerPersonChart = ref([
  { label: "<100 ฿", height: 28, value: 20, highlight: false },
  { label: "101-150 ฿", height: 92, value: 65, highlight: true },
  { label: "151-200 ฿", height: 45, value: 32, highlight: false },
  { label: "201-250 ฿", height: 20, value: 14, highlight: false },
  { label: ">250 ฿", height: 5, value: 3, highlight: false },
]);

const salesPerBillChart = ref([
  { label: "100-200 ฿", height: 90, value: 27, highlight: true },
  { label: "200-300 ฿", height: 60, value: 18, highlight: false },
  { label: "300-400 ฿", height: 80, value: 24, highlight: false },
  { label: "400-500 ฿", height: 30, value: 9, highlight: false },
  { label: ">500 ฿", height: 20, value: 6, highlight: false },
]);

const menuPairs = ref([
  { name1: "ส้มตำปูปลาร้า,", name2: "ไก่ย่าง", price: 105, count: 22 },
  { name1: "ส้มตำปูปลาร้า,", name2: "ไก่ย่าง", price: 105, count: 22 },
  { name1: "ส้มตำปูปลาร้า,", name2: "ไก่ย่าง", price: 105, count: 22 },
]);
</script>