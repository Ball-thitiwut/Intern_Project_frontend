import { defineStore } from 'pinia';
import api from '@/utils/axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    firstName: '',
    lastName: '',
    avatarSeed: 'character', 
    email: '',
    restaurantName: '', 
    isLoaded: false
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await api.post('/auth/login', { email, password });
        const token = response.data.token;
        
        localStorage.setItem("access_token", token);
        
        await this.fetchUserProfile();
        
        return true; 
      } catch (error) {
        console.error("Login Failed:", error.response?.data?.message);
        throw error; 
      }
    },

    async fetchUserProfile() {
      try {
        const response = await api.get('/user/profile');
        
        const data = response.data.profile; 
        
        if (data && data.user) {
            this.updateState({
                firstName: data.user.first_name,
                lastName: data.user.last_name,
                email: data.user.email,
                avatarSeed: data.user.first_name || 'character',
                restaurantName: data.restaurant?.restaurant_name || ''
            });
        }
        this.isLoaded = true;
      } catch (error) {
        console.error('Failed to fetch user', error);
        this.isLoaded = false;
      }
    },

    updateState(payload) {
        if (payload.firstName) this.firstName = payload.firstName;
        if (payload.lastName) this.lastName = payload.lastName;
        if (payload.avatarSeed) this.avatarSeed = payload.avatarSeed;
        if (payload.email) this.email = payload.email;
        if (payload.restaurantName) this.restaurantName = payload.restaurantName;
    },

    logout() {
        localStorage.removeItem("access_token");
        this.clearUser();
    },

    clearUser() {
        this.firstName = '';
        this.lastName = '';
        this.restaurantName = '';
        this.avatarSeed = 'character';
        this.isLoaded = false;
    }
  },
  getters: {
    fullName: (state) => `${state.firstName} ${state.lastName}`
  }
});