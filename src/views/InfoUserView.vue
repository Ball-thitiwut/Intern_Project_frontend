<template>
  <div class="info-container">
    <div class="content-wrapper">
      
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
              required
            />
          </div>

          <div class="form-group">
            <label>Last Name</label>
            <input 
              type="text" 
              class="form-input" 
              v-model="lastName" 
              placeholder="e.g. Jaidee"
              required
            />
          </div>

          <div class="form-group">
            <label>Phone Number</label>
            <input 
              type="tel" 
              class="form-input" 
              v-model="phoneNumber" 
              placeholder="081-234-5678"
              required
            />
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
          Next 
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useRegisterStore } from '@/stores/registration';
import '@/assets/css/infoForm.css'; 

const router = useRouter();
const registerStore = useRegisterStore();

const firstName = ref('');
const lastName = ref('');
const phoneNumber = ref('');

onMounted(() => {
  if (registerStore.formData.first_name) {
    firstName.value = registerStore.formData.first_name;
  }
  if (registerStore.formData.last_name) {
    lastName.value = registerStore.formData.last_name;
  }
  if (registerStore.formData.phone_number) {
    phoneNumber.value = registerStore.formData.phone_number;
  }
});

const handleBack = () => {
  router.push('/signup');
};

const handleNext = () => {
  registerStore.formData.first_name = firstName.value;
  registerStore.formData.last_name = lastName.value;
  registerStore.formData.phone_number = phoneNumber.value;

  router.push('/info-restaurant');
};
</script>

<style scoped>
/* จัด Layout ใหม่ */
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
  max-width: 500px; /* จำกัดความกว้างให้เท่ากับการ์ดทั่วไป */
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* ระยะห่างระหว่างการ์ดกับปุ่ม */
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem; /* ขยับเข้ามานิดหน่อยเพื่อให้ตรงกับขอบมนของการ์ด */
}

/* Style ปุ่มกด */
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
  background-color: #F97316; /* สีส้มตาม Theme */
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