import { defineStore } from "pinia";
import api from "@/utils/axios";

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
        (a, b) => {
          return new Date(a.date_iso) - new Date(b.date_iso);
        },
      );

      if (trends.length === 0)
        return { dates: [], avgBillValues: [], billCountValues: [] };

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
              displayLabel: `${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`,
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
          if (dateRange[0])
            params.startDate = dateRange[0].toISOString().split("T")[0];
          if (dateRange[1])
            params.endDate = dateRange[1].toISOString().split("T")[0];
        }

        // เรียก API
        const [overviewRes, insightsRes] = await Promise.all([
          api.get("/dashboard", { params }),
          api.get("/dashboard/customer-insights", { params }),
        ]);

        const data = overviewRes.data;

        const formatToISO = (dateStr) => {
          if (!dateStr) return null;
          if (typeof dateStr === "string" && dateStr.includes("/")) {
            const parts = dateStr.split("/");
            let year = parseInt(parts[2]);
            if (year > 2400) year -= 543;
            return `${year}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
          }
          return typeof dateStr === "string" ? dateStr.split("T")[0] : null;
        };

        if (data.sales_trend && Array.isArray(data.sales_trend)) {
          data.sales_trend = data.sales_trend
            .map((item) => ({
              ...item,
              date_iso: formatToISO(item.date),
            }))
            .filter((item) => item.date_iso)
            .sort((a, b) => new Date(a.date_iso) - new Date(b.date_iso));

          if (data.sales_trend.length > 0) {
            this.dataRangeLimits.minDate = data.sales_trend[0].date_iso;
            this.dataRangeLimits.maxDate =
              data.sales_trend[data.sales_trend.length - 1].date_iso;
          }
        }

        if (data.sales_forecast && Array.isArray(data.sales_forecast)) {
          data.sales_forecast = data.sales_forecast.map((item) => ({
            ...item,
            date_iso: formatToISO(item.date),
          }));
        }

        this.overviewData = data;
        this.customerInsights = insightsRes.data || {
          group_size_analysis: [],
          spending_analysis: [],
          total_sample_bills: 0,
        };
      } catch (err) {
        console.error("Fetch dashboard error:", err);
        this.error = err.response?.data?.message || err.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
