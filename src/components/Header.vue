<script setup>
import UserDropdown from "@/components/UserDropdown.vue";

const emit = defineEmits(["toggle-sidebar"]);
</script>

<template>
  <header
    class="sticky top-0 z-30 w-full bg-[#F3F5F9] px-4 py-4 md:px-8 flex items-center justify-between md:justify-end transition-all"
  >
    <button
      @click="$emit('toggle-sidebar')"
      class="p-2 -ml-2 mr-2 text-gray-600 rounded-lg hover:bg-gray-200 md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        ></path>
      </svg>
    </button>

    <UserDropdown />
  </header>
</template>
