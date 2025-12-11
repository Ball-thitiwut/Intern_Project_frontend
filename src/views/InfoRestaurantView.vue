<template>
  <div class="info-container">
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
          >
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="category">Category</label>
            <select 
              id="category" 
              class="form-input" 
              :class="{ 'placeholder-text': category === '' }"
              v-model="category"
            >
              <option value="" disabled selected>Select Category</option>
              <option value="cafe">Cafe</option>
              <option value="fine_dining">Fine Dining</option>
              <option value="fast_food">Fast Food</option>
              <option value="bar">Bar & Bistro</option>
            </select>
          </div>
          <div class="form-group">
            <label for="monthlySales">Avg. Sales</label>
            <select 
              id="monthlySales" 
              class="form-input"
              :class="{ 'placeholder-text': monthlySales === '' }"
              v-model="monthlySales"
            >
              <option value="" disabled selected>Select Range</option>
              <option value="<100k">&lt; 100,000</option>
              <option value="100k-500k">100k - 500k</option>
              <option value=">500k">&gt; 500,000</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="branches">Branches</label>
            <select 
              id="branches" 
              class="form-input"
              :class="{ 'placeholder-text': branches === '' }"
              v-model="branches"
            >
              <option value="" disabled selected>Select</option>
              <option value="1">1</option>
              <option value="2-5">2 - 5</option>
              <option value=">5">&gt; 5</option>
            </select>
          </div>
          <div class="form-group">
            <label for="menuItems">Menu Items</label>
            <select 
              id="menuItems" 
              class="form-input"
              :class="{ 'placeholder-text': menuItems === '' }"
              v-model="menuItems"
            >
              <option value="" disabled selected>Select</option>
              <option value="<20">&lt; 20</option>
              <option value="20-50">20 - 50</option>
              <option value=">50">&gt; 50</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="yearsInBusiness">Years</label>
            <select 
              id="yearsInBusiness" 
              class="form-input"
              :class="{ 'placeholder-text': yearsInBusiness === '' }"
              v-model="yearsInBusiness"
            >
              <option value="" disabled selected>Select</option>
              <option value="<1">&lt; 1 Year</option>
              <option value="1-5">1 - 5 Years</option>
              <option value=">5">&gt; 5 Years</option>
            </select>
          </div>
          <div class="form-group">
            <label for="posSystem">POS System</label>
            <select 
              id="posSystem" 
              class="form-input"
              :class="{ 'placeholder-text': posSystem === '' }"
              v-model="posSystem"
            >
              <option value="" disabled selected>Select</option>
              <option value="none">None</option>
              <option value="ocha">Ocha</option>
              <option value="wongnai">Wongnai</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </form>
    </div>

    <button class="btn-next-floating" @click="handleNext">
      Done
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import '@/assets/css/infoForm.css'; 

const restaurantName = ref('');
const category = ref('');
const monthlySales = ref('');
const branches = ref('');
const menuItems = ref('');
const yearsInBusiness = ref('');
const posSystem = ref('');

const handleNext = () => {
  // Check validation ก่อน submit
  if (!restaurantName.value || !category.value) {
      alert("Please fill in all fields");
      return;
  }
  
  console.log('Done');
};
</script>

<style scoped>
.placeholder-text {
  color: #A0AEC0 !important; 
}
</style>