<template>
  <div class="info-container">
    <div class="content-wrapper">
      <div class="info-card">
        <h1 class="info-title">Restaurant Info</h1>
        <p class="info-description">Tell us about your restaurant.</p>

        <form @submit.prevent="handleNext">
          <div class="form-group">
            <label for="restaurantName">Restaurant Name</label>
            <input 
              type="text" 
              id="restaurantName" 
              class="form-input" 
              v-model="restaurantName"
              placeholder="Ex. The Burger Joint" 
              required
            >
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="category">Category</label>
              <select 
                id="category" 
                class="form-input" 
                :class="{ 'placeholder-text': !category }"
                v-model="category"
                required
              >
                <option :value="null" disabled selected>Select Category</option>
                <option 
                  v-for="type in restaurantTypes" 
                  :key="type.restaurant_types_id" 
                  :value="type.restaurant_types_id"
                >
                  {{ type.restaurant_types_label }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="monthlySales">Avg. Sales</label>
              <select 
                id="monthlySales" 
                class="form-input"
                :class="{ 'placeholder-text': !monthlySales }"
                v-model="monthlySales"
                required
              >
                <option :value="null" disabled selected>Select Range</option>
                <option 
                  v-for="income in incomeRanges" 
                  :key="income.monthly_income_ranges_id" 
                  :value="income.monthly_income_ranges_id"
                >
                  {{ income.monthly_income_ranges_label }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="branches">Branches</label>
              <select 
                id="branches" 
                class="form-input"
                :class="{ 'placeholder-text': !branches }"
                v-model="branches"
                required
              >
                <option :value="null" disabled selected>Select</option>
                <option 
                  v-for="branch in branchRanges" 
                  :key="branch.branch_ranges_id" 
                  :value="branch.branch_ranges_id"
                >
                  {{ branch.branch_ranges_label }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="menuItems">Menu Items</label>
              <select 
                id="menuItems" 
                class="form-input"
                :class="{ 'placeholder-text': !menuItems }"
                v-model="menuItems"
                required
              >
                <option :value="null" disabled selected>Select</option>
                <option 
                  v-for="menu in menuRanges" 
                  :key="menu.menu_ranges_id" 
                  :value="menu.menu_ranges_id"
                >
                  {{ menu.menu_ranges_label }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="yearsInBusiness">Years</label>
              <select 
                id="yearsInBusiness" 
                class="form-input"
                :class="{ 'placeholder-text': !yearsInBusiness }"
                v-model="yearsInBusiness"
                required
              >
                <option :value="null" disabled selected>Select</option>
                <option 
                  v-for="age in ageRanges" 
                  :key="age.restaurant_age_ranges_id" 
                  :value="age.restaurant_age_ranges_id"
                >
                  {{ age.restaurant_age_ranges_label }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="posSystem">POS System</label>
              <select 
                id="posSystem" 
                class="form-input"
                :class="{ 'placeholder-text': !posSystem }"
                v-model="posSystem"
                required
              >
                <option :value="null" disabled selected>Select</option>
                <option 
                  v-for="pos in posSystems" 
                  :key="pos.pos_systems_id" 
                  :value="pos.pos_systems_id"
                >
                  {{ pos.pos_systems_name }}
                </option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <div class="action-buttons">
        <button class="btn-nav btn-back" @click="handleBack">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Back
        </button>

        <button class="btn-nav btn-next" @click="handleNext">
          Done
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useRegisterStore } from '@/stores/registration';
import api from '@/utils/axios';
import '@/assets/css/infoForm.css'; 

const router = useRouter();
const registerStore = useRegisterStore();

const restaurantName = ref('');
const category = ref(null);
const monthlySales = ref(null);
const branches = ref(null);
const menuItems = ref(null);
const yearsInBusiness = ref(null);
const posSystem = ref(null);

const restaurantTypes = ref([]);
const incomeRanges = ref([]);
const branchRanges = ref([]);
const menuRanges = ref([]);
const ageRanges = ref([]);
const posSystems = ref([]);

onMounted(async () => {
  try {
    const response = await api.get('/restaurant-registration-options');
    
    const data = response.data;
    restaurantTypes.value = data.restaurantTypes || [];
    incomeRanges.value = data.incomeRanges || [];
    branchRanges.value = data.branchRanges || [];
    menuRanges.value = data.menuRanges || [];
    ageRanges.value = data.ageRanges || [];
    posSystems.value = data.posSystems || [];

  } catch (error) {
    console.error("Failed to fetch options:", error);
    alert("Cannot load options from server.");
  }
});

const handleBack = () => {
  router.push('/info-user');
};

const handleNext = async () => {
    if (!restaurantName.value || !category.value || !monthlySales.value || !branches.value || !menuItems.value || !yearsInBusiness.value || !posSystem.value) {
        alert("Please fill in all fields");
        return;
    }
  
    registerStore.formData.restaurant_name = restaurantName.value;
    registerStore.formData.restaurant_types_id = category.value;
    registerStore.formData.monthly_income_ranges_id = monthlySales.value;
    registerStore.formData.branch_ranges_id = branches.value;
    registerStore.formData.menu_ranges_id = menuItems.value;
    registerStore.formData.restaurant_age_ranges_id = yearsInBusiness.value;
    registerStore.formData.pos_systems_id = posSystem.value;

    try {
        const response = await api.post('/auth/register', registerStore.formData);
    
        if (response.status === 200 || response.status === 201) {
            alert("Registration Successful!");
            registerStore.resetForm();
            router.push('/login'); 
        }

    } catch (error) {
        console.error(error);
        if (error.response) {
            alert(error.response.data.message || "Registration failed");
        } else {
            alert("Cannot connect to server.");
        }
    }
};
</script>

<style scoped>
.placeholder-text {
  color: #A0AEC0 !important; 
}

.info-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  box-sizing: border-box;
}

.content-wrapper {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
}

.btn-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-back {
  background-color: white;
  color: #6b7280;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.btn-back:hover {
  color: #051960;
  border-color: #051960;
  background-color: #f9fafb;
}

.btn-next {
  background-color: #F97316;
  color: white;
  box-shadow: 0 4px 6px -1px rgba(249, 115, 22, 0.3);
}

.btn-next:hover {
  background-color: #ea580c;
  transform: translateY(-1px);
  box-shadow: 0 6px 8px -1px rgba(249, 115, 22, 0.4);
}

.btn-next:active {
  transform: translateY(0);
}
</style>