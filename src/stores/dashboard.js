import { defineStore } from "pinia";
import axios from "axios";

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
      sales_by_hour: [],
    },
    isLoading: false,
    error: null,
  }),

  getters: {
    billAnalytics(state) {
      const trends = state.overviewData.sales_trend || [];

      const dates = trends.map((item) => {
        const dStr = item.date_iso || item.date;
        if (!dStr) return "-";
        const d = new Date(dStr);
        if (isNaN(d.getTime())) return item.date;
        return `${String(d.getDate()).padStart(2, "0")}/${String(
          d.getMonth() + 1
        ).padStart(2, "0")}`;
      });

      let tempAvgValues = trends.map((item) => {
        const sales = parseFloat(item.amount || item.total_sales || 0);

        const orders = parseInt(item.orders || item.total_orders || 0);

        const avg = orders > 0 ? sales / orders : 0;
        return parseFloat(avg.toFixed(0));
      });

      const maxVal = Math.max(...tempAvgValues);

      const avgBillValues = tempAvgValues.map((val) => ({
        value: val,
        highlight: val === maxVal && val > 0,
      }));

      const billCountValues = trends.map((item) => {
        const orders = parseInt(item.orders || item.total_orders || 0);
        return { value: orders };
      });

      return { dates, avgBillValues, billCountValues };
    },
  },

  actions: {
    async fetchDashboardOverview(period, dateRange) {
      this.isLoading = true;
      this.error = null;

      try {
        const params = { period: period };

        if (dateRange && dateRange.length === 2) {
          if (dateRange[0])
            params.startDate = dateRange[0].toISOString().split("T")[0];
          if (dateRange[1])
            params.endDate = dateRange[1].toISOString().split("T")[0];
        }

        const token = localStorage.getItem("accessToken");

        if (!token) {
          throw new Error("Token not found. Please login again.");
        }

        const config = {
          params: params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get("/api/v1/dashboard", config);
        const data = response.data;

        if (data.sales_trend && Array.isArray(data.sales_trend)) {
          data.sales_trend = data.sales_trend.map((item) => {
            if (item.date && item.date.includes("/")) {
              const parts = item.date.split("/");
              if (parts.length === 3) {
                let day = parts[0];
                let month = parts[1];
                let year = parseInt(parts[2]);

                if (year > 2400) year -= 543;

                item.date_iso = `${year}-${month}-${day}`;
                item.date = `${year}-${month}-${day}`;
              }
            }
            return item;
          });
        }

        this.overviewData = data;
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
