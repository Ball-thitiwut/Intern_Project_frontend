<template>
  <div class="info-container">
    <div class="info-card">
      <h1 class="info-title">Personal Info</h1>
      <p class="info-description">Please tell us a bit about yourself.</p>

      <form @submit.prevent="handleNext">
        <div class="form-group">
          <label>First Name</label>
          <input 
            type="text" 
            class="form-input" 
            v-model="firstName" 
            placeholder="e.g. Somchai"
          />
        </div>

        <div class="form-group">
          <label>Last Name</label>
          <input 
            type="text" 
            class="form-input" 
            v-model="lastName" 
            placeholder="e.g. Jaidee"
          />
        </div>

        <div class="form-group">
          <label>Phone Number</label>
          <input 
            type="tel" 
            class="form-input" 
            v-model="phoneNumber" 
            placeholder="081-234-5678"
          />
        </div>
      </form>
    </div>

    <button class="btn-next-floating" @click="handleNext">
      Next 
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import '@/assets/css/infoForm.css'; 

const firstName = ref('');
const lastName = ref('');
const phoneNumber = ref('');

const handleNext = () => {
  console.log('Next clicked with:', {
    firstName: firstName.value,
    lastName: lastName.value,
    phoneNumber: phoneNumber.value
  });
};
</script>