import { defineStore } from 'pinia';
import api from '@/utils/axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    firstName: '',
    lastName: '',
    avatarSeed: 'character', 
    email: '',
    isLoaded: false
  }),
  actions: {
    async fetchUserProfile() {
      try {
        const response = await api.get('/api/v1/user/profile');
        const user = response.data.profile.user;
        
        if (user) {
            this.updateState({
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                avatarSeed: user.avatar_seed || user.first_name || 'character' 
            });
        }
        this.isLoaded = true;
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    },
    updateState(payload) {
        if (payload.firstName) this.firstName = payload.firstName;
        if (payload.lastName) this.lastName = payload.lastName;
        if (payload.avatarSeed) this.avatarSeed = payload.avatarSeed;
        if (payload.email) this.email = payload.email;
    },
    clearUser() {
        this.firstName = '';
        this.lastName = '';
        this.avatarSeed = 'character';
        this.isLoaded = false;
    }
  },
  getters: {
    fullName: (state) => `${state.firstName} ${state.lastName}`
  }
});