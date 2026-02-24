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
        <h1 class="login-title">Login</h1>
        <p class="login-description">Please enter your details to log in.</p>

        <form @submit.prevent="handleLogin" novalidate>
          <div class="input-group">
            <label>Email</label>
            <input
              type="email"
              v-model="email"
              placeholder="name@example.com"
              :class="{ 'input-error': errors.email }"
              @input="clearError('email')"
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
                placeholder="Enter your password"
                :class="{ 'input-error': errors.password }"
                @input="clearError('password')"
              />
              <button
                type="button"
                class="toggle-password"
                @click="showPassword = !showPassword"
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

          <div class="forgot-password">
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" class="btn-login" :disabled="isLoading">
            {{ isLoading ? "Logging in..." : "Login" }}
          </button>

          <p class="signup-text">
            Don't have an account?
            <router-link to="/signup">Sign up</router-link>
          </p>
        </form>
      </div>
    </div>
    <transition name="toast">
      <div v-if="toastMessage" class="toast-container" :class="toastType">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          style="margin-right: 8px"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        {{ toastMessage }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import "@/assets/css/auth.css";

const router = useRouter();
const userStore = useUserStore();

// ตัวแปรเก็บค่าจาก Form
const email = ref("");
const password = ref("");

const isLoading = ref(false);
const showPassword = ref(false);

const toastMessage = ref("");
const toastType = ref("error");

const showToast = (msg, type = "error") => {
  toastMessage.value = msg;
  toastType.value = type;
  setTimeout(() => {
    toastMessage.value = "";
  }, 3000);
};

// เก็บข้อความ Error ของแต่ละ field
const errors = reactive({
  email: "",
  password: "",
});

// ตรวจสอบความถูกต้องของข้อมูลก่อนส่ง
const validateForm = () => {
  let isValid = true;
  errors.email = "";
  errors.password = "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.value.trim()) {
    errors.email = "Please enter your email address";
    isValid = false;
  } else if (!emailPattern.test(email.value)) {
    errors.email = "Please enter a valid email address";
    isValid = false;
  }

  // ตรวจสอบ Password (ความยาวต้องมากกว่า 8)
  if (!password.value) {
    errors.password = "Please enter your password";
    isValid = false;
  } else if (password.value.length < 8) {
    errors.password = "Password must be at least 8 characters";
    isValid = false;
  }

  return isValid;
};

const clearError = (field) => {
  errors[field] = "";
};

// ปุ่ม Login
const handleLogin = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  try {
    await userStore.login(email.value, password.value);
    router.push("/dashboard");
  } catch (error) {
    // เช็คสถานะ 401 หรือข้อความที่เกี่ยวกับ Credential
    const isAuthError =
      error.response?.status === 401 ||
      error.response?.data?.message?.toLowerCase().includes("invalid");

    if (isAuthError) {
      showToast("Invalid email or password. Please try again.");
    } else {
      // กรณี Server ล่ม หรือ Error อื่นๆ
      showToast("Something went wrong. Please try again later.");
    }

    password.value = ""; // ล้างรหัสผ่านเสมอเมื่อพลาด
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* ส่วน CSS เดิมคงไว้ */
.password-wrapper {
  position: relative;
  width: 100%;
}

.password-wrapper input {
  width: 100%;
  padding-right: 40px;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
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

/* Hide Default Browser Eye Icon */
input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
  display: none;
}

input::-webkit-password-toggle-button {
  display: none;
  -webkit-appearance: none;
}

/* Toast styles */
.toast-container {
  position: fixed;
  top: 24px;
  right: 24px;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
}

.toast-container.error {
  background-color: #fef2f2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}

/* Toast Animation */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

/* Responsive Mobile */
@media (max-width: 768px) {
  :deep(.left-panel),
  .left-panel {
    display: none !important;
  }

  :deep(.login-container),
  .login-container {
    display: flex;
    width: 100%;
    height: 100vh;
    padding: 0;
  }

  :deep(.right-panel),
  .right-panel {
    width: 100%;
    max-width: 100%;
    height: 100%;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :deep(.login-wrapper),
  .login-wrapper {
    width: 100%;
    max-width: 350px;
  }

  :deep(.login-title),
  .login-title {
    text-align: left !important;
    font-size: 2rem !important;
    margin-bottom: 0.5rem;
  }

  :deep(.login-description),
  .login-description {
    text-align: left !important;
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }

  :deep(.input-group input),
  .input-group input {
    font-size: 16px;
    padding: 12px;
  }

  :deep(.btn-login),
  .btn-login,
  :deep(.btn-google),
  .btn-google {
    padding: 12px;
  }
}
</style>
