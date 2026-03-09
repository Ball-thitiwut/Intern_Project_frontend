<template>
  <div
    class="space-y-4 md:space-y-8 font-sans text-[#051960] animate-fade-in h-full"
  >
    <div
      v-if="dashboardStore.isLoading"
      class="flex justify-center items-center h-full min-h-[400px]"
    >
      <div
        class="animate-spin rounded-full h-10 w-10 border-b-2 border-[#051960]"
      ></div>
    </div>

    <div v-else class="space-y-4 md:space-y-8">
      <GroupSizeChart
        :chart-data="groupSizeChartData"
        :table-data="groupSizeTableData"
        :total-bills="
          groupSizeTableData.reduce((acc, row) => acc + row.count, 0)
        "
      />

      <StatAnalysisChart
        :title="$t('dashboard_behavior_view.spending_analysis.title')"
        :stats="salesPerBillStats"
        :chart-data="salesPerBillChartData"
        :y-axis-label="
          $t('dashboard_behavior_view.spending_analysis.y_axis_label')
        "
        :x-axis-label="
          $t('dashboard_behavior_view.spending_analysis.x_axis_label')
        "
        :y-ticks="calcYTicks(salesPerBillChartData)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useDashboardStore } from "@/stores/dashboard";
import GroupSizeChart from "@/components/GroupSizeChart.vue";
import StatAnalysisChart from "@/components/StatAnalysisChart.vue";

const props = defineProps({
  dateRange: {
    type: Array,
    default: () => [new Date(), new Date()],
  },
  period: {
    type: String,
    default: "1m",
  },
});

const { t } = useI18n();
const dashboardStore = useDashboardStore();

const fetchData = async () => {
  await dashboardStore.fetchDashboardOverview(props.period, props.dateRange);
};

onMounted(() => {
  fetchData();
});

watch([() => props.dateRange, () => props.period], async () => {
  await fetchData();
});

// -- แปลงข้อมูลจาก Store เพื่อใส่กราฟ --
// แปลงข้อมูลสำหรับกราฟขนาดกลุ่มลูกค้า
const groupSizeChartData = computed(() => {
  const masterGroups = ["1", "2", "3-4", "5-10", "10+"];
  const raw = dashboardStore.customerInsights.group_size_analysis || [];
  const maxVal = Math.max(...raw.map((i) => i.count), 0);

  return masterGroups.map((groupLabel) => {
    const found = raw.find((item) => {
      const cleanLabel = item.label
        .replace(/People|Person|persons|people/gi, "")
        .trim();
      return cleanLabel === groupLabel;
    });
    const value = found ? found.count : 0;

    const displayPercent = value === 0 ? 2 : (value / (maxVal || 1)) * 100;

    return {
      label: groupLabel,
      value: value,
      percent: displayPercent,
      highlight: value === maxVal && value > 0,
    };
  });
});

// ข้อมูลสำหรับตาราง
const groupSizeTableData = computed(() => {
  const masterGroups = ["1", "2", "3-4", "5-10", "10+"];
  const raw = dashboardStore.customerInsights.group_size_analysis || [];

  return masterGroups.map((groupLabel) => {
    const found = raw.find((item) => {
      const cleanLabel = item.label
        .replace(/People|Person|persons|people/gi, "")
        .trim();
      return cleanLabel === groupLabel;
    });
    return {
      size: groupLabel,
      count: found ? found.count : 0,
      percent: found ? parseFloat(found.percentage) : 0,
    };
  });
});

// แปลงข้อมูลสำหรับกราฟช่วงยอดขาย
const salesPerBillChartData = computed(() => {
  const raw = dashboardStore.customerInsights.spending_analysis || [];

  const standardRanges = [
    {
      key: "Under",
      label: t("stat_analysis_chart.range_labels.under", { price: "฿500" }),
      match: "Under",
    },
    { key: "500-1000", label: "฿500 - ฿1,000", match: "500 - 1,000" },
    { key: "1001-2000", label: "฿1,001 - ฿2,000", match: "1,001 - 2,000" },
    { key: "2000+", label: "฿2,000+", match: "2,000+" },
  ];

  const maxValFromRaw = Math.max(...raw.map((i) => i.count), 0);

  return standardRanges.map((std) => {
    const found = raw.find((item) => item.range.includes(std.match));
    const value = found ? found.count : 0;

    return {
      label: std.label,
      height: maxValFromRaw > 0 ? (value / maxValFromRaw) * 100 : 0,
      value: value,
      highlight: value === maxValFromRaw && value > 0,
    };
  });
});

// คำนวณสถิติสรุปด้านบนกราฟ
const salesPerBillStats = computed(() => {
  const avgBill = dashboardStore.overviewData.summary.average_bill || 0;

  const raw = dashboardStore.customerInsights.spending_analysis || [];
  let mostCommonRange = "-";
  if (raw.length > 0) {
    const maxItem = raw.reduce((prev, current) =>
      prev.count > current.count ? prev : current,
    );

    let range = maxItem.range;
    if (range.includes("Under")) {
      mostCommonRange = t("stat_analysis_chart.range_labels.under", {
        price: "฿500",
      });
    } else if (range.includes("+")) {
      mostCommonRange = "฿" + range;
    } else if (range.includes("-")) {
      mostCommonRange = range
        .split(" - ")
        .map((val) => "฿" + val.trim())
        .join(" - ");
    } else {
      mostCommonRange = "฿" + range;
    }
  }

  return [
    {
      value: `฿${Number(avgBill).toLocaleString()}`,
      label: t("dashboard_behavior_view.stats.avg_bill_label"),
    },
    {
      value: mostCommonRange,
      label: t("dashboard_behavior_view.stats.most_common_range_label"),
    },
  ];
});

const calcYTicks = (data) => {
  if (!data || data.length === 0) return ["0"];
  const maxVal = Math.max(...data.map((i) => i.value), 0);

  if (maxVal === 0) return ["15", "10", "5", "0"];

  const numberOfSlices = 5;

  const rawStep = maxVal / numberOfSlices;
  const step = Math.ceil(rawStep / 5) * 5;

  const ticks = [];
  for (let i = 0; i <= numberOfSlices; i++) {
    ticks.push((step * i).toString());
  }

  return ticks.reverse();
};
</script>
