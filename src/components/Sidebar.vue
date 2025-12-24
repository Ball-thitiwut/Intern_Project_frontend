<template>
  <aside
    class="shrink-0 bg-slate-50 min-h-screen flex flex-col font-sans border-r border-gray-200 transition-all duration-300 ease-in-out"
    :class="isCollapsed ? 'w-20' : 'w-72'"
  >
    <div
      class="h-20 flex items-center px-5 pt-4 pb-2 transition-all duration-300"
      :class="isCollapsed ? 'justify-center' : 'justify-between'"
    >
      <RouterLink
        v-if="!isCollapsed"
        to="/dashboard"
        class="flex items-center gap-3 overflow-hidden whitespace-nowrap cursor-pointer transition-opacity duration-200 hover:opacity-80"
      >
        <img
          :src="logo"
          alt="Resself Logo"
          class="h-9 w-auto object-contain flex-shrink-0"
        />
        <span class="text-xl font-bold text-[#051960] tracking-tight">
          RESSELF
        </span>
      </RouterLink>
      <button
        v-if="!isCollapsed"
        @click="toggleSidebar"
        class="p-2 rounded-lg text-gray-400 hover:bg-white hover:text-[#051960] hover:shadow-sm transition-all flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
          <line x1="9" y1="3" x2="9" y2="21" />
        </svg>
      </button>

      <button
        v-else
        @click="toggleSidebar"
        class="group relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white hover:shadow-sm transition-all"
      >
        <img
          :src="logo"
          alt="Logo"
          class="h-9 w-auto object-contain transition-all duration-200 opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-75 absolute"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 text-[#051960] transition-all duration-200 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 absolute"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
          <line x1="9" y1="3" x2="9" y2="21" />
        </svg>
      </button>
    </div>

    <nav class="flex-1 px-4 py-4 space-y-2 overflow-y-auto overflow-x-hidden">
      <RouterLink
        to="/dashboard"
        class="group w-full flex items-center px-3 py-3 text-left font-semibold rounded-lg transition-all duration-200 min-h-[48px] text-slate-600 hover:bg-gray-100 hover:text-[#051960]"
        active-class="bg-blue-50 text-[#051960]"
      >
        <div class="flex items-center gap-3 w-full">
          <svg
            class="w-5 h-5 flex-shrink-0 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            ></path>
          </svg>
          <span
            v-if="!isCollapsed"
            class="text-sm truncate transition-all duration-300"
          >
            Dashboard
          </span>
        </div>
      </RouterLink>

      <div class="space-y-1">
        <button
          @click="
            isCollapsed ? (isCollapsed = false) : (isIdeasOpen = !isIdeasOpen)
          "
          class="group w-full flex items-center justify-between px-3 py-3 text-left font-semibold rounded-lg transition-all duration-200 min-h-[48px]"
          :class="
            isIdeasActive
              ? 'bg-blue-50 text-[#051960]'
              : 'text-slate-600 hover:bg-gray-100 hover:text-[#051960]'
          "
        >
          <div class="flex items-center gap-3 w-full">
            <svg
              class="w-5 h-5 flex-shrink-0 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
            <span
              v-if="!isCollapsed"
              class="text-sm truncate transition-all duration-300"
            >
              ไอเดียเพิ่มยอดขาย
            </span>
          </div>
          <svg
            v-if="!isCollapsed"
            class="w-4 h-4 transform transition-transform duration-200"
            :class="isIdeasOpen ? 'rotate-180' : ''"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <div
          v-if="!isCollapsed && isIdeasOpen"
          class="mt-1 ml-4 pl-4 border-l-2 border-slate-100 space-y-1"
        >
          <RouterLink
            to="/ideas"
            class="block px-3 py-2 text-sm font-medium rounded-lg transition-colors truncate text-slate-500 hover:text-[#051960] hover:bg-slate-50"
            active-class="text-[#051960] bg-blue-50/50"
          >
            ค้นหาไอเดีย
          </RouterLink>
          <RouterLink
            to="/history"
            class="block px-3 py-2 text-sm font-medium rounded-lg transition-colors truncate text-slate-500 hover:text-[#051960] hover:bg-slate-50"
            active-class="text-[#051960] bg-blue-50/50"
          >
            ประวัติแคมเปญ
          </RouterLink>
        </div>
      </div>

      <div class="space-y-1">
        <button
          @click="
            isCollapsed ? (isCollapsed = false) : (isPosOpen = !isPosOpen)
          "
          class="group w-full flex items-center justify-between px-3 py-3 text-left font-semibold rounded-lg transition-all duration-200 min-h-[48px]"
          :class="
            isPosActive
              ? 'bg-blue-50 text-[#051960]'
              : 'text-slate-600 hover:bg-gray-100 hover:text-[#051960]'
          "
        >
          <div class="flex items-center gap-3 w-full">
            <svg
              class="w-5 h-5 flex-shrink-0 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              ></path>
            </svg>
            <span
              v-if="!isCollapsed"
              class="text-sm truncate transition-all duration-300"
            >
              ข้อมูล POS
            </span>
          </div>
          <svg
            v-if="!isCollapsed"
            class="w-4 h-4 transform transition-transform duration-200"
            :class="isPosOpen ? 'rotate-180' : ''"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <div
          v-if="!isCollapsed && isPosOpen"
          class="mt-1 ml-4 pl-4 border-l-2 border-slate-100 space-y-1"
        >
          <RouterLink
            to="/pos-info"
            class="block px-3 py-2 text-sm font-medium rounded-lg transition-colors truncate text-slate-500 hover:text-[#051960] hover:bg-slate-50"
            active-class="text-[#051960] bg-blue-50/50"
          >
            เชื่อมต่อ POS
          </RouterLink>
          <RouterLink
            to="/data-management"
            class="block px-3 py-2 text-sm font-medium rounded-lg transition-colors truncate text-slate-500 hover:text-[#051960] hover:bg-slate-50"
            active-class="text-[#051960] bg-blue-50/50"
          >
            จัดการข้อมูล
          </RouterLink>
        </div>
      </div>
    </nav>

    <div
      class="p-5 text-xs text-center text-gray-400 whitespace-nowrap overflow-hidden"
    >
      <span v-if="!isCollapsed">v1.0.0 Beta</span>
      <span v-else>v1.0</span>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import logo from "@/assets/images/logo.png";

const route = useRoute();
const isCollapsed = ref(false);
const isIdeasOpen = ref(true);
const isPosOpen = ref(true); // Default เปิดไว้ตาม Requirement

const isIdeasActive = computed(() => {
  return route.path.startsWith("/ideas") || route.path.startsWith("/history");
});

const isPosActive = computed(() => {
  return (
    route.path.startsWith("/data-management") ||
    route.path.startsWith("/pos-info") ||
    route.path.startsWith("/select-pos") ||
    route.path.startsWith("/branch-connect")
  );
});

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
