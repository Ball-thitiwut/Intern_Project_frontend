import { defineStore } from "pinia";
import axios from "axios";

const API_URL = "http://localhost:3000";

export const usePromotionStore = defineStore("promotion", {
  state: () => ({
    isAnalyzing: false,
    isLoadingHistory: false,
    lastUpdated: null,

    pairingList: [],
    happyHourList: [],
    upsellList: [],
    slowMovingList: [],

    campaignHistory: [],
  }),

  getters: {
    hasData: (state) => {
      return (
        state.pairingList.length > 0 ||
        state.happyHourList.length > 0 ||
        state.upsellList.length > 0 ||
        state.slowMovingList.length > 0
      );
    },
  },

  actions: {
    async analyzePromotions(channel = null) {
      this.clearResults();
      this.isAnalyzing = true;
      const payload = channel ? { channel } : {};

      const token = localStorage.getItem("access_token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const [pairingRes, happyHourRes, upsellRes, slowMovingRes] =
          await Promise.all([
            axios.post(`${API_URL}/api/promotion/pairing`, payload, config),
            axios.post(`${API_URL}/api/promotion/happy-hour`, payload, config),
            axios.post(`${API_URL}/api/promotion/upsell`, payload, config),
            axios.post(`${API_URL}/api/promotion/slow-moving`, payload, config),
          ]);

        if (pairingRes.data.success) this.pairingList = pairingRes.data.data;
        if (happyHourRes.data.success)
          this.happyHourList = happyHourRes.data.data;
        if (upsellRes.data.success) this.upsellList = upsellRes.data.data;
        if (slowMovingRes.data.success)
          this.slowMovingList = slowMovingRes.data.data;
      } catch (error) {
        console.error("API Error:", error);
        if (error.response && error.response.status === 401) {
          alert("Session หมดอายุ หรือ Token ไม่ถูกต้อง (โปรด Login ใหม่)");
        }
      } finally {
        const now = new Date();
        this.lastUpdated =
          now.toLocaleTimeString("th-TH", {
            hour: "2-digit",
            minute: "2-digit",
          }) + " น.";
        this.isAnalyzing = false;
      }
    },

    clearResults() {
      this.pairingList = [];
      this.happyHourList = [];
      this.upsellList = [];
      this.slowMovingList = [];
      this.lastUpdated = null;
    },

    async createCampaign(campaignData) {
      const token = localStorage.getItem("access_token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      try {
        const response = await axios.post(
          `${API_URL}/api/v1/campaigns/create`,
          campaignData,
          config,
        );

        if (response.data.success) {
          return true;
        }
        return false;
      } catch (error) {
        console.error("Create Campaign Failed:", error);
        throw error;
      }
    },

    async fetchCampaignHistory(statusGroup = "active") {
      this.isLoadingHistory = true;
      const token = localStorage.getItem("access_token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      try {
        const response = await axios.get(
          `${API_URL}/api/v1/campaigns/list?status_group=${statusGroup}`,
          config,
        );

        if (response.data.success) {
          this.campaignHistory = response.data.campaigns;
        }
      } catch (error) {
        console.error("Fetch History Failed:", error);
        this.campaignHistory = [];
      } finally {
        this.isLoadingHistory = false;
      }
    },
  },
});
