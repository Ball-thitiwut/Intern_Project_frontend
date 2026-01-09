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
              :class="{ 'input-error': errors.firstName }"
              @input="clearError('firstName')"
            />
            <p v-if="errors.firstName" class="error-text">
              {{ errors.firstName }}
            </p>
          </div>

          <div class="form-group">
            <label>Last Name</label>
            <input
              type="text"
              class="form-input"
              v-model="lastName"
              placeholder="e.g. Jaidee"
              :class="{ 'input-error': errors.lastName }"
              @input="clearError('lastName')"
            />
            <p v-if="errors.lastName" class="error-text">
              {{ errors.lastName }}
            </p>
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              class="form-input"
              v-model="phoneNumber"
              placeholder="081-234-5678"
              :class="{ 'input-error': errors.phoneNumber }"
              @input="handlePhoneInput"
              maxlength="12"
            />
            <p v-if="errors.phoneNumber" class="error-text">
              {{ errors.phoneNumber }}
            </p>
          </div>
        </form>
      </div>

      <div class="action-buttons">
        <button class="btn-nav btn-back" @click="handleBack">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 19L5 12L12 5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Back
        </button>

        <button class="btn-nav btn-next" @click="handleNext">
          Next
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12H19"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 5L19 12L12 19"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRegisterStore } from "@/stores/registration";
import "@/assets/css/infoForm.css";

const router = useRouter();
const registerStore = useRegisterStore();

// ตัวแปรเก็บค่าจาก Form
const firstName = ref("");
const lastName = ref("");
const phoneNumber = ref("");

const errors = reactive({
  firstName: "",
  lastName: "",
  phoneNumber: "",
});

// สำหรับจัดรูปแบบเบอร์โทร (xxx-xxx-xxxx)
const formatPhoneNumber = (value) => {
  if (!value) return value;

  const phoneNumber = value.replace(/[^\d]/g, "");

  // จำกัดความยาวไม่เกิน 10 ตัวเลข
  const phoneNumberLength = phoneNumber.length;

  // จัดรูปแบบตามความยาว
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  }
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6, 10)}`;
};

// Event Handler เมื่อมีการพิมพ์เบอร์โทร
const handlePhoneInput = (event) => {
  // รับค่า input แล้วส่งไป format ทันที
  const formatted = formatPhoneNumber(event.target.value);
  phoneNumber.value = formatted;
  clearError("phoneNumber");
};

// เช็คว่ามีข้อมูลเก่าใน Store ไหม (กรณีกดย้อนกลับมาแก้ไข)
onMounted(() => {
  if (registerStore.formData.first_name) {
    firstName.value = registerStore.formData.first_name;
  }
  if (registerStore.formData.last_name) {
    lastName.value = registerStore.formData.last_name;
  }
  if (registerStore.formData.phone_number) {
    phoneNumber.value = formatPhoneNumber(registerStore.formData.phone_number);
  }
});

// ตรวจสอบความถูกต้อง
const validateForm = () => {
  let isValid = true;
  errors.firstName = "";
  errors.lastName = "";
  errors.phoneNumber = "";

  if (!firstName.value.trim()) {
    errors.firstName = "First name is required";
    isValid = false;
  }

  if (!lastName.value.trim()) {
    errors.lastName = "Last name is required";
    isValid = false;
  }

  // ตรวจเบอร์โทร: ตัดขีดออกก่อนเช็ค แล้วดูว่าเป็นตัวเลข 9-10 หลักไหม
  if (!phoneNumber.value.trim()) {
    errors.phoneNumber = "Phone number is required";
    isValid = false;
  } else if (!/^[0-9]{9,10}$/.test(phoneNumber.value.replace(/-/g, ""))) {
    errors.phoneNumber = "Invalid phone number format";
    isValid = false;
  }

  return isValid;
};

const clearError = (field) => {
  errors[field] = "";
};

// ปุ่ม Back
const handleBack = () => {
  router.push("/signup");
};

// ปุ่ม Next
const handleNext = () => {
  if (!validateForm()) return;

  registerStore.formData.first_name = firstName.value;
  registerStore.formData.last_name = lastName.value;
  registerStore.formData.phone_number = phoneNumber.value;

  router.push("/info-restaurant");
};
</script>

<style scoped>
/* CSS เดิมของคุณ */
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
  background-color: #f97316;
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

.input-error {
  border-color: #ef4444 !important;
  background-color: #fef2f2;
}

.input-error:focus {
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

.error-text {
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  text-align: left;
  display: block;
}
</style>
