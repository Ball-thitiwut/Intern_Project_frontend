<template>
  <div class="flex h-screen bg-[#F3F5F9] overflow-hidden">
    
    <Sidebar />

    <div class="flex-1 flex flex-col min-w-0">
      
      <Header />

      <main class="flex-1 overflow-y-auto px-6 pb-8">
        <slot />
      </main>

    </div>

  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
</script>