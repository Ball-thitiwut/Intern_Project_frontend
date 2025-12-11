<template>
  <div class="space-y-6 font-sans text-[#051960] animate-fade-in">
    
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <div class="text-xl font-bold text-[#051960] mb-6">
        จำนวนบิลตามขนาดกลุ่มลูกค้า
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div class="lg:col-span-3 h-64 flex flex-col justify-end relative pl-8 pr-4">
          <div class="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-400 h-full pb-2">
            <span>70</span><span>60</span><span>50</span><span>40</span>
            <span>30</span><span>20</span><span>10</span><span>0</span>
          </div>

          <div class="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-gray-500">
            จำนวนบิล
          </div>

          <div class="flex items-end justify-between gap-4 h-full border-b border-gray-100 pb-2 relative z-10">
            <div class="absolute inset-0 flex flex-col justify-between pointer-events-none z-0 pb-2">
              <div v-for="i in 8" :key="i" class="border-t border-gray-100 border-dashed w-full h-0"></div>
            </div>

            <div v-for="(item, index) in groupSizeChart" :key="index" class="flex flex-col items-center w-full group relative z-10">
              <div v-if="item.highlight" class="mb-2 bg-[#051960] text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg relative -top-1">
                {{ item.value }}
                <div class="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#051960]"></div>
              </div>

              <div 
                class="w-8 md:w-10 rounded-t-lg transition-all duration-300"
                :class="item.highlight ? 'bg-[#F47122] shadow-lg shadow-[#F47122]/30' : 'bg-[#002683]/20 hover:bg-[#002683]/30'"
                :style="{ height: item.percent + '%' }"
              ></div>

              <span class="mt-3 text-xs text-gray-500 font-medium">{{ item.label }}</span>
            </div>
          </div>
          <div class="text-center text-xs text-gray-400 mt-2 font-medium">
            ขนาดกลุ่มลูกค้า(คน)
          </div>
        </div>

        <div class="lg:col-span-2 bg-white rounded-xl px-5 py-3 shadow-sm flex flex-col h-full border border-gray-100">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-sm text-[#051960] border-b border-gray-200">
                <th class="py-3 text-center font-bold">อันดับ</th>
                <th class="py-3 text-center font-bold">ขนาดกลุ่ม</th>
                <th class="py-3 text-right font-bold">จำนวนบิล</th>
                <th class="py-3 text-right font-bold">สัดส่วน(%)</th>
              </tr>
            </thead>
            <tbody class="text-sm text-gray-600">
              <tr v-for="(row, idx) in groupSizeTable" :key="idx" class="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                <td class="py-2.5 text-center font-medium">{{ idx + 1 }}</td>
                <td class="py-2.5 text-center font-medium">{{ row.size }} คน</td>
                <td class="py-2.5 text-right font-bold text-[#051960]">{{ row.count }} บิล</td>
                <td class="py-2.5 text-right">{{ row.percent }}%</td>
              </tr>
            </tbody>
          </table>
          <div class="mt-auto pt-4 text-right text-base font-bold text-[#051960]">
            รวมทั้งหมด: 176 บิล
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <div class="text-xl font-bold text-[#051960] mb-6">ยอดจ่ายเฉลี่ยต่อคน</div>

      <div class="flex items-center justify-center mb-8 pb-6 border-b border-gray-200">
        <div class="text-center flex-1">
          <div class="text-3xl font-bold text-[#051960]">฿145</div>
          <div class="text-base font-normal text-gray-600 mt-1">ค่าเฉลี่ยรวม</div>
        </div>
        <div class="h-12 w-px bg-gray-200 mx-4"></div>
        <div class="text-center flex-1">
          <div class="text-3xl font-bold text-[#051960]">฿101 - ฿150</div>
          <div class="text-base font-normal text-gray-600 mt-1">ช่วงที่ลูกค้าจ่ายบ่อยที่สุด</div>
        </div>
      </div>

      <div class="h-56 flex flex-col justify-end relative pl-8 pr-4">
        <div class="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-gray-500">จำนวนบิล</div>
        <div class="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-400 h-full pb-2">
          <span>70</span><span>60</span><span>50</span><span>40</span><span>30</span><span>20</span><span>10</span><span>0</span>
        </div>

        <div class="flex items-end justify-around h-full relative z-10 border-b border-gray-100 pb-2">
          <div class="absolute inset-0 flex flex-col justify-between pointer-events-none z-0 pb-2">
            <div v-for="i in 8" :key="i" class="border-t border-gray-100 border-dashed w-full h-0"></div>
          </div>
          <div v-for="(item, index) in spendPerPersonChart" :key="index" class="flex flex-col items-center w-full relative group">
            <div v-if="item.highlight" class="mb-2 bg-[#051960] text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg relative -top-1">
              {{ item.value }}
              <div class="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#051960]"></div>
            </div>
            <div 
                class="w-12 md:w-16 rounded-t-lg transition-all duration-300"
                :class="item.highlight ? 'bg-[#F47122] shadow-lg shadow-[#F47122]/30' : 'bg-[#002683]/20 hover:bg-[#002683]/30'"
                :style="{ height: item.height + '%' }"
            ></div>
            <span class="mt-3 text-[10px] md:text-xs text-gray-500 font-medium">{{ item.label }}</span>
          </div>
        </div>
        <div class="text-center text-xs text-gray-400 mt-2 font-medium">บาท</div>
      </div>
    </div>

    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <div class="text-xl font-bold text-[#051960] mb-6">ยอดขายเฉลี่ยต่อบิล</div>

      <div class="flex items-center justify-center mb-8 pb-6 border-b border-gray-200">
        <div class="text-center flex-1">
          <div class="text-3xl font-bold text-[#051960]">฿185</div>
          <div class="text-base font-normal text-gray-600 mt-1">ยอดขายต่อบิลเฉลี่ย</div>
        </div>
        <div class="h-12 w-px bg-gray-200 mx-2"></div>
        <div class="text-center flex-1">
          <div class="text-3xl font-bold text-[#051960]">฿100 - ฿200</div>
          <div class="text-base font-normal text-gray-600 mt-1">ช่วงยอดขายที่พบบ่อยสุด</div>
        </div>
        <div class="h-12 w-px bg-gray-200 mx-2"></div>
        <div class="text-center flex-1">
          <div class="text-3xl font-bold text-[#051960]">฿580 / ฿100</div>
          <div class="text-base font-normal text-gray-600 mt-1">ยอดขายสูงสุด / ต่ำสุด</div>
        </div>
      </div>

      <div class="h-56 flex flex-col justify-end relative pl-8 pr-4">
        <div class="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-gray-500">จำนวน</div>
        <div class="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-400 h-full pb-2">
          <span>30</span><span>25</span><span>20</span><span>15</span><span>10</span><span>5</span><span>0</span>
        </div>

        <div class="flex items-end justify-around h-full relative z-10 border-b border-gray-100 pb-2">
          <div class="absolute inset-0 flex flex-col justify-between pointer-events-none z-0 pb-2">
            <div v-for="i in 7" :key="i" class="border-t border-gray-100 border-dashed w-full h-0"></div>
          </div>
          <div v-for="(item, index) in salesPerBillChart" :key="index" class="flex flex-col items-center w-full relative group">
            <div v-if="item.highlight" class="mb-2 bg-[#051960] text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg relative -top-1">
              {{ item.value }}
              <div class="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#051960]"></div>
            </div>
            <div 
                class="w-12 md:w-16 rounded-t-lg transition-all duration-300"
                :class="item.highlight ? 'bg-[#F47122] shadow-lg shadow-[#F47122]/30' : 'bg-[#002683]/20 hover:bg-[#002683]/30'"
                :style="{ height: item.height + '%' }"
            ></div>
            <span class="mt-3 text-[10px] md:text-xs text-gray-500 font-medium">{{ item.label }}</span>
          </div>
        </div>
        <div class="text-center text-xs text-gray-400 mt-2 font-medium">บาท</div>
      </div>
    </div>

    <div class="space-y-4">
      <div class="text-lg font-bold text-[#051960]">
        เมนูที่มักถูกสั่งพร้อมกัน
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="(pair, idx) in menuPairs" :key="idx" class="bg-white rounded-2xl p-5 shadow-sm">
          <div class="flex items-center justify-between gap-2 mb-4">
            <div class="w-full aspect-square bg-[#002683]/5 rounded-xl shadow-sm border border-gray-100"></div>
            <span class="text-gray-700 font-bold text-xl">+</span>
            <div class="w-full aspect-square bg-[#002683]/5 rounded-xl shadow-sm border border-gray-100"></div>
          </div>
          <div class="flex justify-between items-end">
            <div class="space-y-1">
              <div class="text-sm font-semibold text-[#051960] leading-tight">{{ pair.name1 }} {{ pair.name2 }}</div>
              <div class="text-[12px] text-gray-500">จำนวนการสั่งร่วมกัน</div>
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
import { ref, watch } from "vue";

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

watch(() => props.dateRange, (newVal) => {
    console.log("Behavior View: Date updated to", newVal);
});
</script>