<template>
  <aside class="w-64 bg-slate-50 min-h-screen flex flex-col font-sans border-r border-gray-200">
    
    <div class="h-20 flex items-center px-6 gap-3 bg-white border-b border-gray-100">
      <img :src="logo" alt="Resself Logo" class="h-9 w-auto object-contain" />
      <span class="text-xl font-bold text-slate-800 tracking-tight">Resself</span>
    </div>

    <nav class="flex-1 px-3 py-6 space-y-1">
      
      <div class="mb-2">
        <button 
          class="group w-full flex items-center justify-between px-3 py-2.5 text-left font-semibold rounded-lg transition-all duration-200
          bg-blue-50 text-blue-700" 
        >
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            <span class="text-sm">Dashboard</span>
          </div>
          <svg class="w-4 h-4 text-blue-500 transform rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div class="relative ml-5 mt-1 pl-4 border-l-2 border-blue-100 space-y-1">
          <RouterLink 
            to="/dashboard/ideas" 
            class="block px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-blue-600 hover:bg-blue-50/50 transition-colors"
            active-class="text-blue-700 bg-blue-50 font-semibold"
          >
            ไอเดียเพิ่มยอดขาย
          </RouterLink>
          <RouterLink 
            to="/dashboard/pairing" 
            class="block px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:text-blue-600 hover:bg-blue-50/50 transition-colors"
          >
            จับคู่เมนู
          </RouterLink>
        </div>
      </div>

      <RouterLink 
        to="/pos-info" 
        class="group w-full flex items-center px-3 py-2.5 text-left font-medium text-slate-600 rounded-lg hover:bg-white hover:text-slate-900 hover:shadow-sm transition-all duration-200"
      >
         <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-slate-400 group-hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            <span class="text-sm">ข้อมูล POS</span>
         </div>
      </RouterLink>

    </nav>

    <div class="p-4 border-t border-gray-200 text-xs text-center text-gray-400">
      v1.0.0 Beta
    </div>

  </aside>
</template>

<script setup>
import logo from '@/assets/images/logo.png'
</script>