<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user'; 

const router = useRouter();
const userStore = useUserStore(); 
const isDropdownOpen = ref(false);

onMounted(() => {
  if (!userStore.isLoaded) {
    userStore.fetchUserProfile();
  }
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const handleLogout = () => {
  localStorage.removeItem('access_token');
  userStore.clearUser(); 
  closeDropdown();
  router.push('/login');
};
</script>

<template>
  <div class="relative z-40">
    <div v-if="isDropdownOpen" @click="closeDropdown" class="fixed inset-0 z-30 cursor-default bg-transparent"></div>

    <button 
      @click="toggleDropdown"
      class="flex items-center gap-3 hover:bg-white hover:shadow-sm p-1.5 pr-3 rounded-full transition-all duration-200 group relative z-50"
      :class="{ 'bg-white shadow-sm': isDropdownOpen }"
    >
      <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
           <img :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${userStore.avatarSeed}`" alt="Avatar" class="w-full h-full object-cover" />
      </div>
      
      <div class="flex flex-col items-start">
          <span class="text-sm font-semibold text-[#051960] leading-tight">{{ userStore.fullName }}</span>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 group-hover:text-[#051960] transition-transform duration-200" :class="{ 'rotate-180': isDropdownOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    
    <div 
      v-if="isDropdownOpen" 
      class="absolute right-0 top-full mt-2 w-60 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 py-2 origin-top-right animate-in fade-in slide-in-from-top-2 duration-200 z-50 overflow-hidden"
    >
        <div class="px-4 py-2 border-b border-gray-100 mb-1">
            <p class="text-xs text-gray-400 font-medium uppercase tracking-wider">Account</p>
         </div>
         <div class="px-2"> 
             <a href="/profile" @click.prevent="() => { closeDropdown(); router.push('/profile'); }" class="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#EFF6FF] hover:text-[#051960] transition-colors cursor-pointer w-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 group-hover:text-[#051960] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account Settings
             </a>
         </div>
         <div class="border-t border-gray-100 my-1"></div>
         <div class="px-2">
             <button @click="handleLogout" class="w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign out
             </button>
         </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 767px) {
  button.group {
    padding: 0 !important;
    padding-right: 0 !important;
    gap: 0 !important;
    width: 2.5rem !important;
    height: 2.5rem !important;
    justify-content: center !important;
    background-color: transparent !important;
    box-shadow: none !important;
  }
  button.group > div.flex.flex-col,
  button.group > svg {
    display: none !important;
  }

  .absolute.right-0.top-full {
    width: max-content !important;
    min-width: auto !important;   
    right: 0 !important;
    
    padding-top: 0.25rem !important;
    padding-bottom: 0.25rem !important;
  }

  .px-4.py-2.border-b {
    padding: 0.5rem 1rem !important; 
    margin-bottom: 0.125rem !important;
  }

  .absolute.right-0.top-full a.group, 
  .absolute.right-0.top-full button.w-full {
    padding-top: 0.375rem !important;    
    padding-bottom: 0.375rem !important;
    white-space: nowrap !important;    
  }

  .border-t.my-1 {
    margin-top: 0.125rem !important;
    margin-bottom: 0.125rem !important;
  }
}
</style>