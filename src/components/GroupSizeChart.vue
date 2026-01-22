<template>
  <div
    class="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100"
    style="
      font-family:
        &quot;Prompt&quot;, &quot;Kanit&quot;, &quot;Sarabun&quot;, sans-serif;
    "
  >
    <h3 class="text-lg md:text-xl font-bold text-[#051960] mb-4">
      {{ $t("group_size_chart.title") }}
    </h3>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div class="lg:col-span-7 flex flex-col justify-center">
        <div class="h-60 md:h-72 relative w-full mb-10 md:mb-12">
          <div
            class="hidden md:block absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 -rotate-90 text-xs md:text-sm text-[#64748b] font-medium whitespace-nowrap z-20"
          >
            {{ $t("group_size_chart.axis.y_label") }}
          </div>

          <div
            class="hidden md:flex absolute left-6 md:left-10 top-0 bottom-0 flex-col justify-between text-[11px] md:text-[13px] text-[#64748b] font-medium z-10 pb-[1px]"
          >
            <span v-for="tick in yTicks" :key="tick">{{ tick }}</span>
          </div>

          <div class="ml-0 md:ml-20 h-full border-b border-[#f3f4f6] relative">
            <div
              class="absolute inset-0 flex flex-col justify-between pointer-events-none z-0 pb-[1px]"
            >
              <div
                v-for="i in yTicks.length"
                :key="i"
                class="w-full h-0 border-t border-[#f3f4f6] border-dashed"
                :class="{ 'border-transparent': i === yTicks.length }"
              ></div>
            </div>

            <div
              class="flex items-end justify-around h-full relative z-10 px-1 md:px-2"
            >
              <div
                v-for="(item, index) in chartData"
                :key="index"
                class="flex flex-col items-center w-full relative group h-full justify-end"
              >
                <div
                  class="mb-1 md:mb-2 bg-[#051960] text-white text-[10px] md:text-[13px] font-medium px-1.5 py-0.5 md:px-2 md:py-1 rounded-md shadow-sm relative -top-1 z-20 transition-all duration-200 ease-out transform"
                  :class="
                    item.highlight
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
                  "
                >
                  {{ item.value.toLocaleString() }}
                  <span class="md:hidden">{{
                    $t("group_size_chart.units.bill")
                  }}</span>
                  <div
                    class="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#051960]"
                  ></div>
                </div>

                <div
                  class="w-full max-w-[24px] md:max-w-[40px] rounded-t-[3px] md:rounded-t-[4px] transition-all duration-300 relative"
                  :class="
                    item.highlight
                      ? 'bg-[#F47122] shadow-md z-10'
                      : 'bg-[#002683]/20 hover:bg-[#002683]/40'
                  "
                  :style="{ height: calculateHeight(item.value) + '%' }"
                ></div>

                <span
                  class="absolute top-full mt-2 md:mt-3 text-[11px] md:text-[13px] text-[#64748b] font-medium text-center w-full break-words leading-tight"
                  >{{ item.label }}</span
                >
              </div>
            </div>
          </div>

          <div
            class="absolute -bottom-10 md:-bottom-12 left-0 right-0 text-center text-xs md:text-sm text-[#64748b] font-medium ml-0 md:ml-20"
          >
            {{ $t("group_size_chart.axis.x_label") }}
            <span class="md:hidden">
              {{ $t("group_size_chart.axis.unit_person_parentheses") }}</span
            >
          </div>
        </div>
      </div>

      <div
        class="lg:col-span-5 flex flex-col justify-center lg:pl-4 lg:border-l border-gray-100 pt-4 lg:pt-0 border-t lg:border-t-0"
      >
        <div class="w-full overflow-x-auto">
          <table class="w-full text-sm mb-2 min-w-[300px]">
            <thead>
              <tr class="text-xs md:text-sm text-[#051960] bg-gray-100/80">
                <th
                  class="py-2 md:py-3 pl-2 md:pl-3 text-center font-bold rounded-l-lg"
                >
                  {{ $t("group_size_chart.table.rank") }}
                </th>
                <th class="py-2 md:py-3 text-center font-bold">
                  {{ $t("group_size_chart.table.group_size") }}
                </th>
                <th class="py-2 md:py-3 text-right font-bold">
                  {{ $t("group_size_chart.table.bill_count") }}
                </th>
                <th
                  class="py-2 md:py-3 pr-2 md:pr-3 text-right font-bold rounded-r-lg"
                >
                  {{ $t("group_size_chart.table.proportion") }}
                </th>
              </tr>
            </thead>
            <tbody class="text-xs md:text-sm text-gray-600">
              <tr
                v-for="(row, idx) in tableData"
                :key="idx"
                class="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition group"
              >
                <td
                  class="py-2 md:py-3 pl-2 md:pl-3 text-center font-medium text-gray-400 group-hover:text-[#051960]"
                >
                  {{ idx + 1 }}
                </td>
                <td class="py-2 md:py-3 text-center font-medium">
                  {{ row.size }} {{ $t("group_size_chart.units.person") }}
                </td>
                <td class="py-2 md:py-3 text-right font-bold text-[#051960]">
                  {{ row.count }} {{ $t("group_size_chart.units.bill") }}
                </td>
                <td class="py-2 md:py-3 pr-2 md:pr-3 text-right">
                  {{ row.percent }}%
                </td>
              </tr>
            </tbody>
          </table>
          <div
            class="pt-4 text-right text-sm md:text-base font-bold text-[#051960] border-t border-gray-100 mt-2"
          >
            {{ $t("group_size_chart.table.total") }}: {{ totalBills }}
            {{ $t("group_size_chart.units.bill") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

// รับค่าข้อมูลที่ส่งมาจาก DashboardBehaviorView
const props = defineProps({
  chartData: { type: Array, default: () => [] },
  tableData: Array,
  totalBills: Number,
});

// หาค่าสูงสุดในข้อมูล เพื่อนำไปกำหนดสเกลความสูงของกราฟ
const maxValue = computed(() => {
  if (!props.chartData || props.chartData.length === 0) return 0;
  return Math.max(...props.chartData.map((item) => item.value));
});

const yTicks = computed(() => {
  const max = maxValue.value;
  if (max === 0) return ["0"];

  const step = Math.ceil(max / 5);
  const niceStep = step > 10 ? Math.ceil(step / 5) * 5 : Math.ceil(step);

  const ticks = [];
  for (let i = 0; i <= 5; i++) {
    ticks.push(niceStep * i);
  }
  return ticks.reverse();
});

// ฟังก์ชันแปลงค่า Value เป็น % ความสูง (CSS Height)
const calculateHeight = (value) => {
  const maxTick = parseInt(yTicks.value[0]);
  if (maxTick === 0) return 0;
  return (value / maxTick) * 100;
};
</script>
