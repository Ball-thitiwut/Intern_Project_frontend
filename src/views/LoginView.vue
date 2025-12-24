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

        <form @submit.prevent="handleLogin">
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
              placeholder="Enter your password"
              required
            />
          </div>

          <div class="forgot-password">
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" class="btn-login" :disabled="isLoading">
            {{ isLoading ? "Logging in..." : "Login" }}
          </button>
          
          <button type="button" class="btn-google">
            Log In with Google
          </button>

          <p class="signup-text">
            Don't have an account?
            <router-link to="/signup">Sign up</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import "@/assets/css/auth.css";

const router = useRouter();
const userStore = useUserStore();

const email = ref("");
const password = ref("");
const isLoading = ref(false);

const handleLogin = async () => {
  isLoading.value = true;

  try {
    await userStore.login(email.value, password.value);
    
    router.push('/dashboard'); 
    
  } catch (error) {
    console.error("Login Error:", error);
    const msg = error.response?.data?.message || "เข้าสู่ระบบไม่สำเร็จ";
    alert(msg);
  } finally {
    isLoading.value = false;
  }
};
</script>