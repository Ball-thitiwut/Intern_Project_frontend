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

        <form @submit.prevent="handleNextStep">
          <div class="input-group">
            <label>Email</label>
            <input
              type="email"
              v-model="email"
              placeholder="name@example.com"
              required
            />
          </div>

          <div class="input-group">
            <label>Password</label>
            <input
              type="password"
              v-model="password"
              placeholder="Create a password (min. 8 chars)"
              required
              minlength="8"
            />
          </div>

          <div class="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              v-model="confirmPassword"
              placeholder="Confirm your password"
              required
            />
            <p v-if="passwordError" class="text-red-500 text-xs mt-1">
              {{ passwordError }}
            </p>
          </div>

          <button
            type="submit"
            class="btn-login flex items-center justify-center gap-2"
          >
            <span>Next Step</span>
            <svg
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRegisterStore } from "@/stores/registration";
import "@/assets/css/auth.css";

const router = useRouter();
const registerStore = useRegisterStore();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const passwordError = ref("");

const handleNextStep = () => {
  if (password.value !== confirmPassword.value) {
    passwordError.value = "Passwords do not match!";
    return;
  }
  passwordError.value = "";

  registerStore.updateStep1({
    email: email.value,
    password: password.value,
    confirm_password: confirmPassword.value,
  });

  router.push("/info-user");
};
</script>

<style scoped>
.login-subtitle {
  color: #6b7280;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}
.text-red-500 {
  color: #ef4444;
}
.text-xs {
  font-size: 0.75rem;
}
.mt-1 {
  margin-top: 0.25rem;
}
</style>
