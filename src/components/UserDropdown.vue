<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isDropdownOpen = ref(false);

const avatarSeed = ref('Keerati'); 
const fullName = ref('Keerati THu'); 

const updateUserData = () => {
  const storedAvatar = localStorage.getItem('userAvatarSeed');
  const storedName = localStorage.getItem('userName');

  if (storedAvatar) {
    avatarSeed.value = storedAvatar;
  }
  if (storedName) {
    fullName.value = storedName;
  }
};

onMounted(() => {
  updateUserData(); 
  window.addEventListener('user-profile-updated', updateUserData);
});

onUnmounted(() => {
  window.removeEventListener('user-profile-updated', updateUserData);
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};
</script>

<template>
  <div class="relative z-40">
      
    <div 
      v-if="isDropdownOpen" 
      @click="closeDropdown" 
      class="fixed inset-0 z-30 cursor-default bg-transparent"
    ></div>

    <button 
      @click="toggleDropdown"
      class="flex items-center gap-3 hover:bg-white hover:shadow-sm p-1.5 pr-3 rounded-full transition-all duration-200 group relative z-50"
      :class="{ 'bg-white shadow-sm': isDropdownOpen }"
    >
      <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
           <img :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`" alt="Avatar" class="w-full h-full object-cover" />
      </div>
      
      <div class="flex flex-col items-start">
          <span class="text-sm font-semibold text-[#051960] leading-tight">{{ fullName }}</span>
      </div>

      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-4 w-4 text-gray-400 group-hover:text-[#051960] transition-transform duration-200"
        :class="{ 'rotate-180': isDropdownOpen }" 
        fill="none" viewBox="0 0 24 24" stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div 
      v-if="isDropdownOpen" 
      class="absolute right-0 top-full mt-2 w-60 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 py-2 origin-top-right animate-in fade-in slide-in-from-top-2 duration-200 z-50"
    >
         <div class="px-4 py-2 border-b border-gray-100 mb-1">
            <p class="text-xs text-gray-400 font-medium uppercase tracking-wider">Account</p>
         </div>

         <a 
            href="/profile" 
            @click="closeDropdown" 
            class="group flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#EFF6FF] hover:text-[#051960] transition-colors cursor-pointer"
         >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 group-hover:text-[#051960] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Account Settings
         </a>

         <div class="border-t border-gray-100 my-1"></div>

         <button 
            @click="closeDropdown" 
            class="w-full flex items-center gap-3 text-left px-4 py-2.5 mx-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
         >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
         </button>
    </div>
  </div>
</template>