<template>
  <div class="login-container">
    <div class="left-panel">
      <div class="panel-text">
        <h2>Restaurant<br />Analytics</h2>
        <p>Manage your data with AI intelligence</p>
      </div>
    </div>

    <div class="right-panel">
      <div class="login-wrapper">
        <h1 class="login-title">Create an account</h1>
        <p class="login-subtitle">Enter your email and password to start</p>

        <form @submit.prevent="handleNextStep" novalidate>
          <div class="input-group">
            <label>Email</label>
            <input
              type="email"
              v-model="email"
              placeholder="name@example.com"
              :class="{ 'input-error': errors.email }"
              @input="clearError('email')"
              :disabled="isLoading"
            />
            <p v-if="errors.email" class="error-text">
              {{ errors.email }}
            </p>
          </div>

          <div class="input-group">
            <label>Password</label>
            <div class="password-wrapper">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="Create a password (min. 8 chars)"
                :class="{ 'input-error': errors.password }"
                @input="clearError('password')"
                :disabled="isLoading"
              />
              <button
                type="button"
                class="toggle-password"
                @click="showPassword = !showPassword"
                :disabled="isLoading"
              >
                <svg
                  v-if="!showPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="eye-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="eye-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="error-text">
              {{ errors.password }}
            </p>
          </div>

          <div class="input-group">
            <label>Confirm Password</label>
            <div class="password-wrapper">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="confirmPassword"
                placeholder="Confirm your password"
                :class="{ 'input-error': errors.confirmPassword }"
                @input="clearError('confirmPassword')"
                :disabled="isLoading"
              />
              <button
                type="button"
                class="toggle-password"
                @click="showConfirmPassword = !showConfirmPassword"
                :disabled="isLoading"
              >
                <svg
                  v-if="!showConfirmPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="eye-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="eye-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              </button>
            </div>
            <p v-if="errors.confirmPassword" class="error-text">
              {{ errors.confirmPassword }}
            </p>
          </div>

          <button
            type="submit"
            class="btn-login flex items-center justify-center gap-2"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">Next Step</span>
            <span v-else>Checking...</span>
            <svg
              v-if="!isLoading"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
          <p class="signup-text">
            Already have an account?
            <router-link to="/login">Login</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRegisterStore } from "@/stores/registration";
import api from "@/utils/axios";
import "@/assets/css/auth.css";

const router = useRouter();
const registerStore = useRegisterStore(); 

// เก็บค่า input
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// เก็บสถานะ UI
const isLoading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// เก็บข้อความ error
const errors = reactive({
  email: "",
  password: "",
  confirmPassword: "",
});

// ตรวจสอบความถูกต้องข้อมูลพื้นฐาน
const validateForm = () => {
  let isValid = true;
  errors.email = "";
  errors.password = "";
  errors.confirmPassword = "";

  // ตรวจ email
  if (!email.value) {
    errors.email = "Please enter your email address";
    isValid = false;
  } else if (!email.value.includes("@")) {
    errors.email = "Invalid email format. Please include '@'";
    isValid = false;
  }

  // ตรวจความยาวรหัสผ่าน
  if (!password.value) {
    errors.password = "Please create a password";
    isValid = false;
  } else if (password.value.length < 8) {
    errors.password = "Password must be at least 8 characters";
    isValid = false;
  }

  if (password.value !== confirmPassword.value) {
    errors.confirmPassword = "Passwords do not match";
    isValid = false;
  }

  return isValid;
};

const clearError = (field) => {
  errors[field] = "";
};

// เช็คกับ Server ว่า Email นี้ถูกใช้ไปหรือยัง
const checkEmailAvailability = async (emailToCheck) => {
  try {
    const response = await api.post("/auth/check-email", {
      email: emailToCheck,
    });

    if (response.data.isAvailable === false) {
      throw new Error("This email is already in use");
    }

    return true;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Unable to verify email");
    } else if (error.message) {
      throw error;
    }
    throw new Error("System error: Unable to verify email.");
  }
};

onMounted(() => {
  if (registerStore.formData.email) {
    email.value = registerStore.formData.email;
  }
  if (registerStore.formData.password) {
    password.value = registerStore.formData.password;
  }
  if (registerStore.formData.confirm_password) {
    confirmPassword.value = registerStore.formData.confirm_password;
  }
});

// ปุ่ม Next Step
const handleNextStep = async () => {
  if (!validateForm()) return;

  isLoading.value = true;

  try {
    await checkEmailAvailability(email.value);

    registerStore.updateStep1({
      email: email.value,
      password: password.value,
      confirm_password: confirmPassword.value,
    });

    router.push("/info-user");
  } catch (error) {
    errors.email = error.message;
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-subtitle {
  color: #6b7280;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.password-wrapper {
  position: relative;
  width: 100%;
}

.password-wrapper input {
  width: 100%;
  padding-right: 40px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-error {
  border-color: #ef4444 !important;
  background-color: #fef2f2;
}

.input-error:focus {
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: #666;
}

.eye-icon {
  width: 20px;
  height: 20px;
}

.error-text {
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  text-align: left;
  display: block;
}

input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
  display: none;
}

input::-webkit-password-toggle-button {
  display: none;
  -webkit-appearance: none;
}

.btn-login {
  margin-top: 2rem;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Responsive Mobile */
@media (max-width: 768px) {
  :deep(.left-panel), .left-panel {
    display: none !important;
  }

  :deep(.login-container), .login-container {
    display: flex;
    width: 100%;
    height: 100vh;
    padding: 0;
  }

  :deep(.right-panel), .right-panel {
    width: 100%;
    max-width: 100%;
    height: 100%;
    padding: 2rem; 
    display: flex;
    align-items: center; 
    justify-content: center; 
  }

  :deep(.login-wrapper), .login-wrapper {
    width: 100%;
    max-width: 350px;
  }

  :deep(.login-title), .login-title {
    text-align: left !important;
    font-size: 1.75rem !important; 
    margin-bottom: 0.5rem;
  }

  :deep(.login-subtitle), .login-subtitle {
    text-align: left !important;
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }

  :deep(.input-group input), .input-group input {
    font-size: 16px; 
    padding: 12px;
  }

  :deep(.btn-login), .btn-login {
    padding: 12px;
    margin-top: 1.5rem; 
  }
}
</style>
