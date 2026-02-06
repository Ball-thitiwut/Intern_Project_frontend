import { defineStore } from "pinia";
import axios from "axios";

const API_URL = "http://localhost:3000";

export const useCampaignStore = defineStore("campaign", {
  state: () => ({
    activeCampaigns: [],
    historyCampaigns: [],
    currentDetail: null,
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchCampaigns(statusGroup = "active") {
      this.isLoading = true;
      const token = localStorage.getItem("access_token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      try {
        const response = await axios.get(
          `${API_URL}/api/v1/campaigns/list?status_group=${statusGroup}`,
          config,
        );

        if (response.data.success) {
          if (statusGroup === "active") {
            this.activeCampaigns = response.data.campaigns;
          } else {
            this.historyCampaigns = response.data.campaigns;
          }
        }
      } catch (err) {
        this.error = err.response?.data?.error || "Failed to fetch campaigns";
        console.error("Fetch Campaigns Error:", err);
      } finally {
        this.isLoading = false;
      }
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
        return response.data.success;
      } catch (err) {
        console.error("Create Campaign Error:", err);
        throw err;
      }
    },

    async updateStatus(campaignId, action) {
      const token = localStorage.getItem("access_token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      try {
        const response = await axios.patch(
          `${API_URL}/api/v1/campaigns/update-status/${campaignId}`,
          { action },
          config,
        );

        if (response.data.success) {
          await this.fetchCampaigns("active");
          await this.fetchCampaigns("history");
        }
        return response.data.success;
      } catch (err) {
        console.error("Update Status Error:", err);
        return false;
      }
    },

    async duplicateCampaign(campaignId) {
      const token = localStorage.getItem("access_token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      try {
        const response = await axios.post(
          `${API_URL}/api/v1/campaigns/duplicate/${campaignId}`,
          {},
          config,
        );
        if (response.data.success) {
          await this.fetchCampaigns("active");
        }
        return response.data.success;
      } catch (err) {
        console.error("Duplicate Error:", err);
        return false;
      }
    },

    async fetchCampaignDetail(campaignId) {
      this.isLoading = true;
      const token = localStorage.getItem("access_token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      try {
        const response = await axios.get(
          `${API_URL}/api/v1/campaigns/detail/${campaignId}`,
          config,
        );
        if (response.data.success) {
          this.currentDetail = response.data.campaign;
        }
      } catch (err) {
        console.error("Fetch Detail Error:", err);
      } finally {
        this.isLoading = false;
      }
    },

    async updateCampaign(id, updateData) {
      const token = localStorage.getItem("access_token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        const response = await axios.put(
          `${API_URL}/api/v1/campaigns/update/${id}`,
          updateData,
          config,
        );
        if (response.data.success) {
          await this.fetchCampaigns("active");
          return true;
        }
      } catch (err) {
        console.error(err);
        return false;
      }
    },
  },
});
