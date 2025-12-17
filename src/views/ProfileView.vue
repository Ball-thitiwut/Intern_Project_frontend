<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoading = ref(false);

const masterData = reactive({
  restaurantTypes: [],
  incomeRanges: [],
  branchRanges: [],
  menuRanges: [],
  ageRanges: [],
  posSystems: []
});

const form = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  avatarSeed: 'Keerati', 

  restaurantName: '',
  categoryId: '',      
  ageRangeId: '',      
  avgSalesId: '',      
  branchesId: '',      
  menuRangeId: '',     
  posSystemId: ''      
});

const isAvatarModalOpen = ref(false);
const tempSelectedAvatar = ref(form.avatarSeed);
const avatarOptions = ['Felix', 'Aneka', 'Zack', 'Molly', 'Garrett', 'Willow', 'Leo', 'Bella', 'Christopher', 'Sarah', 'Jack', 'Daisy'];
const openAvatarModal = () => { tempSelectedAvatar.value = form.avatarSeed; isAvatarModalOpen.value = true; };
const selectAvatar = (seed) => { tempSelectedAvatar.value = seed; };
const confirmAvatar = () => { form.avatarSeed = tempSelectedAvatar.value; isAvatarModalOpen.value = false; };

onMounted(async () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    router.push('/login');
    return;
  }

  isLoading.value = true;

  try {
    const authConfig = { headers: { Authorization: `Bearer ${token}` } };

    const [optionsRes, userRes, restaurantRes] = await Promise.all([
      axios.get('http://localhost:3000/api/v1/restaurant-registration-options'),
      axios.get('http://localhost:3000/api/v1/user/profile', authConfig),
      axios.get('http://localhost:3000/api/v1/restaurant/profile', authConfig)
    ]);

    const opts = optionsRes.data;
    masterData.restaurantTypes = opts.restaurantTypes || [];
    masterData.incomeRanges = opts.incomeRanges || [];
    masterData.branchRanges = opts.branchRanges || [];
    masterData.menuRanges = opts.menuRanges || [];
    masterData.ageRanges = opts.ageRanges || [];
    masterData.posSystems = opts.posSystems || [];

    const userData = userRes.data.profile.user;
    if (userData) {
      form.firstName = userData.first_name;
      form.lastName = userData.last_name;
      form.email = userData.email;
      form.phone = userData.phone;
    }

    const restData = restaurantRes.data.restaurant;
    if (restData) {
      form.restaurantName = restData.restaurant_name;
      if (restData.type) form.categoryId = restData.type.id;
      if (restData.monthly_income) form.avgSalesId = restData.monthly_income.id;
      if (restData.branches) form.branchesId = restData.branches.id;
      if (restData.menus) form.menuRangeId = restData.menus.id;
      if (restData.age) form.ageRangeId = restData.age.id;
      if (restData.pos_system) form.posSystemId = restData.pos_system.id;
    }

  } catch (error) {
    console.error("Error loading data:", error);
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken');
      router.push('/login');
    }
  } finally {
    isLoading.value = false;
  }
});

const saveProfile = async () => {
  isLoading.value = true;
  await new Promise(resolve => setTimeout(resolve, 1000));
  alert('บันทึกข้อมูลเรียบร้อยแล้ว (Mock)!');
  isLoading.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-[#F0F2F5] p-6 pb-20 relative"> 
    <div class="max-w-4xl mx-auto mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-[#051960]">Account Settings</h1>
        <p class="text-gray-500 text-sm mt-1">จัดการข้อมูลส่วนตัวและข้อมูลร้านค้าของคุณ</p>
      </div>

      <div class="flex gap-3">
         <button class="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
         </button>
         <button 
            @click="saveProfile" 
            :disabled="isLoading"
            class="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-[#051960] rounded-lg hover:bg-[#031245] transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
         >
            <svg v-if="isLoading" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? 'Saving...' : 'Save Changes' }}
         </button>
      </div>
    </div>

    <div class="max-w-4xl mx-auto space-y-6">

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div class="flex items-center gap-3 mb-6">
           <div class="p-2 bg-blue-50 rounded-lg text-[#051960]">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
             </svg>
           </div>
           <h2 class="text-lg font-semibold text-gray-800">Personal Information</h2>
        </div>

        <div class="flex flex-col md:flex-row gap-8">
          
          <div class="flex flex-col items-center gap-4 md:w-48 flex-shrink-0">
             <div 
                @click="openAvatarModal"
                class="w-32 h-32 rounded-full border-4 border-white ring-1 ring-gray-200 overflow-hidden shadow-sm cursor-pointer transition-all duration-200 hover:ring-4 hover:ring-blue-50 hover:shadow-md"
             >
                <img 
                  :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${form.avatarSeed}`" 
                  alt="Avatar" 
                  class="w-full h-full object-cover bg-gray-50" 
                />
             </div>
             <button 
               @click="openAvatarModal"
               type="button" 
               class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-[#051960] hover:border-[#051960]/30 transition-all shadow-sm"
             >
               Change Character
             </button>
          </div>

          <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
             <div class="col-span-1">
                <label class="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                <input v-model="form.firstName" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm" />
             </div>
             <div class="col-span-1">
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                <input v-model="form.lastName" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm" />
             </div>
             
             <div class="col-span-1">
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                <input v-model="form.phone" type="tel" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm" />
             </div>
             <div class="col-span-1"> <label class="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input v-model="form.email" type="email" disabled class="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed outline-none transition-all text-sm" />
             </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div class="flex items-center gap-3 mb-6">
           <div class="p-2 bg-blue-50 rounded-lg text-[#051960]">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
             </svg>
           </div>
           <h2 class="text-lg font-semibold text-gray-800">Restaurant Details</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
           
           <div class="col-span-1 md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Restaurant Name</label>
              <input v-model="form.restaurantName" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm" placeholder="ชื่อร้านอาหารของคุณ" />
           </div>

           <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <div class="relative">
                <select v-model="form.categoryId" class="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm bg-white">
                   <option value="" disabled>Select Category</option>
                   <option v-for="cat in masterData.restaurantTypes" :key="cat.restaurant_types_id" :value="cat.restaurant_types_id">
                     {{ cat.restaurant_types_label }}
                   </option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
           </div>

           <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Restaurant Age</label>
              <div class="relative">
                <select v-model="form.ageRangeId" class="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm bg-white">
                   <option value="" disabled>Select Age</option>
                   <option v-for="age in masterData.ageRanges" :key="age.restaurant_age_ranges_id" :value="age.restaurant_age_ranges_id">
                     {{ age.restaurant_age_ranges_label }}
                   </option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
           </div>

           <div class="col-span-1 md:col-span-2 border-t border-gray-100 my-1"></div>

           <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Average Sales (Monthly)</label>
               <div class="relative">
                <select v-model="form.avgSalesId" class="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm bg-white">
                   <option value="" disabled>Select Range</option>
                   <option v-for="range in masterData.incomeRanges" :key="range.monthly_income_ranges_id" :value="range.monthly_income_ranges_id">
                     {{ range.monthly_income_ranges_label }}
                   </option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
           </div>

           <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Number of Branches</label>
              <div class="relative">
                <select v-model="form.branchesId" class="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm bg-white">
                   <option value="" disabled>Select Branches</option>
                   <option v-for="b in masterData.branchRanges" :key="b.branch_ranges_id" :value="b.branch_ranges_id">
                     {{ b.branch_ranges_label }}
                   </option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                   <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
           </div>

           <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Est. Menu Items</label>
              <div class="relative">
                <select v-model="form.menuRangeId" class="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm bg-white">
                   <option value="" disabled>Select Menu Range</option>
                   <option v-for="m in masterData.menuRanges" :key="m.menu_ranges_id" :value="m.menu_ranges_id">
                     {{ m.menu_ranges_label }}
                   </option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                   <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
           </div>

           <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Current POS System</label>
              <div class="relative">
                <select v-model="form.posSystemId" class="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm bg-white">
                   <option value="" disabled>Select POS</option>
                   <option v-for="pos in masterData.posSystems" :key="pos.pos_systems_id" :value="pos.pos_systems_id">
                     {{ pos.pos_systems_name }}
                   </option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                   <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
           </div>

        </div>
      </div>
    </div>

    <div v-if="isAvatarModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
       <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="isAvatarModalOpen = false"></div>
       
       <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 animate-in fade-in zoom-in duration-200">
          <div class="flex justify-between items-center mb-4">
             <h3 class="text-lg font-bold text-[#051960]">Choose Your Character</h3>
             <button @click="isAvatarModalOpen = false" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
             </button>
          </div>
          
          <div class="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-6 max-h-[60vh] overflow-y-auto p-2">
             <div 
               v-for="seed in avatarOptions" 
               :key="seed"
               @click="selectAvatar(seed)"
               class="aspect-square rounded-full border-2 cursor-pointer transition-all hover:scale-105 p-1"
               :class="tempSelectedAvatar === seed ? 'border-[#051960] ring-2 ring-blue-100 bg-blue-50' : 'border-transparent hover:border-gray-200'"
             >
                <img :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`" class="w-full h-full rounded-full" />
             </div>
          </div>

          <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
             <button @click="isAvatarModalOpen = false" class="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                Cancel
             </button>
             <button @click="confirmAvatar" class="px-6 py-2 text-sm font-medium text-white bg-[#051960] rounded-lg hover:bg-[#031245] transition-colors">
                Confirm Selection
             </button>
          </div>
       </div>
    </div>
  </div>
</template>