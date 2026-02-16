import { defineStore } from "pinia";
import api from "@/utils/axios";

const formatToISO = (dateStr) => {
  if (!dateStr) return null;

  let day, month, year;

  // กรณีรูปแบบ DD/MM/YYYY
  if (typeof dateStr === "string" && dateStr.includes("/")) {
    const parts = dateStr.split("/");
    day = parts[0].padStart(2, "0");
    month = parts[1].padStart(2, "0");
    year = parseInt(parts[2]);
  }
  // กรณีรูปแบบ YYYY-MM-DD
  else if (typeof dateStr === "string") {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    day = String(d.getDate()).padStart(2, "0");
    month = String(d.getMonth() + 1).padStart(2, "0");
    year = d.getFullYear();
  } else {
    return null;
  }

  if (year > 2400) year -= 543;

  return `${year}-${month}-${day}`;
};

const fillMissingHours = (data) => {
  const fullHours = Array.from({ length: 24 }, (_, i) => ({
    hour: `${String(i).padStart(2, '0')}:00`,
    amount: 0
  }));
  
  if (Array.isArray(data)) {
    data.forEach(item => {
      const hourPart = item.hour ? item.hour.split(':')[0] : null;
      const hourIdx = parseInt(hourPart);
      if (!isNaN(hourIdx) && hourIdx >= 0 && hourIdx < 24) {
        fullHours[hourIdx].amount = parseFloat(item.amount || item.sales || 0);
      }
    });
  }
  return fullHours;
};

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    overviewData: {
      summary: {
        total_sales: 0,
        total_orders: 0,
        average_bill: 0,
        growth: { sales_growth_pct: 0, orders_growth_pct: 0 },
      },
      busiest_hour: null,
      top_menus: [],
      sales_trend: [],
      sales_forecast: [],
      sales_by_hour: [],
    },
    customerInsights: {
      period_used: "30",
      total_sample_bills: 0,
      group_size_analysis: [],
      spending_analysis: [],
    },
    dataRangeLimits: {
      minDate: null,
      maxDate: null,
    },
    isLoading: false,
    error: null,
    hasImportHistory: false,
  }),

  getters: {
    billAnalytics(state) {
      const trends = [...(state.overviewData.sales_trend || [])].sort(
        (a, b) => new Date(a.date_iso) - new Date(b.date_iso),
      );

      if (trends.length === 0) {
        return { dates: [], avgBillValues: [], billCountValues: [] };
      }

      if (trends.length <= 35) {
        const dates = trends.map((item) => {
          const d = new Date(item.date_iso);
          return isNaN(d.getTime())
            ? item.date || "-"
            : `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
        });

        const avgBillValues = trends.map((item) => {
          const sales = parseFloat(item.amount || item.total_sales || 0);
          const orders = parseInt(item.orders || item.total_orders || 0);
          return { value: orders > 0 ? Math.round(sales / orders) : 0 };
        });

        const billCountValues = trends.map((item) => ({
          value: parseInt(item.orders || item.total_orders || 0),
        }));

        const maxAvg = Math.max(...avgBillValues.map((v) => v.value), 0);
        avgBillValues.forEach(
          (v) => (v.highlight = v.value === maxAvg && v.value > 0),
        );

        return { dates, avgBillValues, billCountValues };
      }

      const groupedData = {};
      trends.forEach((item) => {
        const d = new Date(item.date_iso);
        if (!isNaN(d.getTime())) {
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
          if (!groupedData[key]) {
            groupedData[key] = {
              total_sales: 0,
              total_orders: 0,
              displayLabel: `${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear() + 543}`,
            };
          }
          groupedData[key].total_sales += parseFloat(
            item.amount || item.total_sales || 0,
          );
          groupedData[key].total_orders += parseInt(
            item.orders || item.total_orders || 0,
          );
        }
      });

      const sortedKeys = Object.keys(groupedData).sort();
      const dates = sortedKeys.map((k) => groupedData[k].displayLabel);
      const avgBillValues = sortedKeys.map((k) => ({
        value:
          groupedData[k].total_orders > 0
            ? Math.round(
                groupedData[k].total_sales / groupedData[k].total_orders,
              )
            : 0,
      }));
      const billCountValues = sortedKeys.map((k) => ({
        value: groupedData[k].total_orders,
      }));

      const maxAvg = Math.max(...avgBillValues.map((v) => v.value), 0);
      avgBillValues.forEach(
        (v) => (v.highlight = v.value === maxAvg && v.value > 0),
      );

      return { dates, avgBillValues, billCountValues };
    },
  },

  actions: {
    async checkImportHistory() {
      try {
        const response = await api.get("/sales/import-history");
        this.hasImportHistory = response.data && response.data.length > 0;
      } catch (err) {
        console.error("Check history error:", err);
        this.hasImportHistory = false;
      }
    },

    async fetchDashboardOverview(period, dateRange) {
      this.isLoading = true;
      this.error = null;

      try {
        let apiPeriod =
          period === "1w"
            ? "7"
            : period === "1m"
              ? "30"
              : period === "1y"
                ? "365"
                : period === "All"
                  ? "all"
                  : period;

        const params = { period: apiPeriod };

        if (period !== "All" && dateRange && dateRange.length === 2) {
          const formatDate = (date) => {
            if (!date) return null;
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
          };
          if (dateRange[0]) params.startDate = formatDate(dateRange[0]);
          if (dateRange[1]) params.endDate = formatDate(dateRange[1]);
        }

        const [overviewRes, insightsRes] = await Promise.all([
          api.get("/dashboard", { params }),
          api.get("/dashboard/customer-insights", { params }),
        ]);

        const data = overviewRes.data;

        if (data.sales_by_hour) {
    data.sales_by_hour = fillMissingHours(data.sales_by_hour);
}

        let trendData = [];
        if (data.sales_trend && Array.isArray(data.sales_trend)) {
          trendData = data.sales_trend
            .map((item) => ({
              ...item,
              date_iso: formatToISO(item.date),
            }))
            .filter((item) => item.date_iso)
            .sort((a, b) => new Date(a.date_iso) - new Date(b.date_iso));

          if (trendData.length > 0) {
            this.dataRangeLimits.minDate = trendData[0].date_iso;
            this.dataRangeLimits.maxDate =
              trendData[trendData.length - 1].date_iso;
          }
        }

        let validatedForecast = [];
        if (period === "1m" || apiPeriod === "30" || apiPeriod === 30) {
          if (data.sales_forecast && Array.isArray(data.sales_forecast)) {
            validatedForecast = data.sales_forecast.map((item) => ({
              ...item,
              date_iso: formatToISO(item.date),
            }));
          }
        }

        this.overviewData = {
          ...data,
          sales_trend: trendData,
          sales_forecast: validatedForecast,
        };

        this.customerInsights = insightsRes.data || { total_sample_bills: 0 };
      } catch (err) {
        console.error("Fetch dashboard error:", err);
        this.error = err.response?.data?.message || err.message;
        this.overviewData.sales_forecast = [];
      } finally {
        this.isLoading = false;
      }
    },
  },
});
