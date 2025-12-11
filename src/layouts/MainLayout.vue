<template>
  <div class="flex h-screen bg-gray-50 overflow-hidden">
    
    <Sidebar />

    <div class="flex-1 flex flex-col">
      
      <Header />

      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>

    </div>

  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
</script>