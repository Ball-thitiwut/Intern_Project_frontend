<template>
  <div class="flex h-screen bg-[#F3F5F9] overflow-hidden">
    <Sidebar ref="sidebarRef" />

    <div class="flex-1 flex flex-col min-w-0">
      <Header @toggle-sidebar="handleToggleSidebar" />

      <main class="flex-1 overflow-y-auto px-4 pb-10 md:px-6 md:pb-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";

const sidebarRef = ref(null);

// ฟังก์ชันที่จะทำงานเมื่อกดปุ่ม Hamburger ที่ Header
const handleToggleSidebar = () => {
  if (sidebarRef.value) {
    sidebarRef.value.toggleMobileMenu();
  }
};
</script>