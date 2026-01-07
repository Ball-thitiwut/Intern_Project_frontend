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
      spending_analysis: []
    },
    dataRangeLimits: {
        minDate: null,
        maxDate: null
    },
    isLoading: false,
    error: null,
  }),

  getters: {
    billAnalytics(state) {
      const trends = state.overviewData.sales_trend || [];
      
      if (trends.length <= 35) {
          const dates = trends.map((item) => {
            const dStr = item.date_iso; 
            if (!dStr) return "-";
            const d = new Date(dStr);
            if (isNaN(d.getTime())) return item.date;
            return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
          });

          const avgBillValues = trends.map((item) => {
            const sales = parseFloat(item.amount || item.total_sales || 0);
            const orders = parseInt(item.orders || item.total_orders || 0);
            return { value: orders > 0 ? parseFloat((sales / orders).toFixed(0)) : 0 };
          });

          const billCountValues = trends.map((item) => {
            const orders = parseInt(item.orders || item.total_orders || 0);
            return { value: orders };
          });
          
          const maxAvg = Math.max(...avgBillValues.map(v => v.value));
          avgBillValues.forEach(v => v.highlight = (v.value === maxAvg && v.value > 0));

          return { dates, avgBillValues, billCountValues };
      }

      const groupedData = {};

      trends.forEach(item => {
          const dStr = item.date_iso; 
          if (dStr) {
              const d = new Date(dStr);
              if (!isNaN(d.getTime())) {
                  const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
                  if (!groupedData[key]) {
                      groupedData[key] = {
                          total_sales: 0,
                          total_orders: 0,
                          displayLabel: `${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
                      };
                  }
                  groupedData[key].total_sales += parseFloat(item.amount || item.total_sales || 0);
                  groupedData[key].total_orders += parseInt(item.orders || item.total_orders || 0);
              }
          }
      });

      const sortedKeys = Object.keys(groupedData).sort();
      const dates = sortedKeys.map(k => groupedData[k].displayLabel);

      const avgBillValues = sortedKeys.map(k => {
          const d = groupedData[k];
          const val = d.total_orders > 0 ? parseFloat((d.total_sales / d.total_orders).toFixed(0)) : 0;
          return { value: val };
      });

      const billCountValues = sortedKeys.map(k => ({ 
          value: groupedData[k].total_orders 
      }));

      const maxAvg = Math.max(...avgBillValues.map(v => v.value));
      avgBillValues.forEach(v => v.highlight = (v.value === maxAvg && v.value > 0));

      return { dates, avgBillValues, billCountValues };
    },
  },

  actions: {
    async fetchDashboardOverview(period, dateRange) {
      this.isLoading = true;
      this.error = null;

      try {
        let apiPeriod = period;
        if (period === '1w') apiPeriod = '7';
        if (period === '1m') apiPeriod = '30';
        if (period === '1y') apiPeriod = '365';
        if (period === 'All') apiPeriod = 'all';

        const params = { period: apiPeriod };

        if (dateRange && dateRange.length === 2 && period !== 'All') {
          if (dateRange[0]) params.startDate = dateRange[0].toISOString().split("T")[0];
          if (dateRange[1]) params.endDate = dateRange[1].toISOString().split("T")[0];
        }

        const [overviewRes, insightsRes] = await Promise.all([
            api.get("/dashboard", { params }),
            api.get("/dashboard/customer-insights", { params })
        ]);

        const data = overviewRes.data;

        if (data.sales_trend && Array.isArray(data.sales_trend)) {
          data.sales_trend = data.sales_trend.map((item) => {
            if (item.date) {
               if (item.date.includes("/")) {
                  const parts = item.date.split("/");
                  if (parts.length === 3) {
                    let year = parseInt(parts[2]);
                    if (year > 2400) year -= 543; 
                    item.date_iso = `${year}-${parts[1]}-${parts[0]}`;
                  }
               } else {
                  item.date_iso = item.date.split('T')[0];
               }
            }
            return item;
          });
        }

        if (data.sales_forecast && Array.isArray(data.sales_forecast)) {
          data.sales_forecast = data.sales_forecast.map((item) => {
            if (item.date) {
              const parts = item.date.split("/"); 
              if (parts.length === 3) {
                let year = parseInt(parts[2]);
                year -= 543; 
                item.date_iso = `${year}-${parts[1]}-${parts[0]}`; 
              }
            }
            return item;
          });
        }

        if (data.sales_trend && data.sales_trend.length > 0) {
            const sorted = [...data.sales_trend].sort((a, b) => {
                const da = new Date(a.date_iso);
                const db = new Date(b.date_iso);
                return da - db;
            });
            
            this.dataRangeLimits.minDate = sorted[0].date_iso;
            this.dataRangeLimits.maxDate = sorted[sorted.length - 1].date_iso;
        } else {
            this.dataRangeLimits.minDate = null;
            this.dataRangeLimits.maxDate = null;
        }

        this.overviewData = data;
        
        this.customerInsights = insightsRes.data || {
            group_size_analysis: [],
            spending_analysis: [],
            total_sample_bills: 0
        };

      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
});