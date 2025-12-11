<template>
  <div class="bg-gray-200 rounded-full p-2 flex flex-wrap items-center justify-between text-sm">
    
    <div class="flex items-center bg-white rounded-full p-1 shadow-sm">
      <button 
        v-for="period in ['24h', '7d', '1m', '1y', 'All']" 
        :key="period"
        @click="selectPeriod(period)"
        :class="[
          'px-4 py-1 rounded-full transition duration-200',
          selectedPeriod === period 
            ? 'bg-gray-800 font-bold text-white shadow-md' 
            : 'text-gray-600 hover:bg-gray-100'
        ]"
      >
        {{ period }}
      </button>
    </div>

    <div class="hidden md:block">
        <VueDatePicker 
            v-model="dateRange" 
            range 
            :enable-time-picker="false"
            @update:model-value="onDateChange"
        >
            <template #trigger>
                <div class="flex items-center gap-4 text-gray-700 font-medium cursor-pointer hover:opacity-80 transition">
                    <div class="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm hover:ring-1 hover:ring-gray-300">
                        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <span>{{ displayDateRange.start }}</span>
                    </div>
                    
                    <span class="text-gray-400">to</span>
                    
                    <div class="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm hover:ring-1 hover:ring-gray-300">
                        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <span>{{ displayDateRange.end }}</span>
                    </div>
                </div>
            </template>
        </VueDatePicker>
    </div>

    <div class="relative">
      <button 
        @click="isOpen = !isOpen"
        class="bg-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm cursor-pointer min-w-[200px] justify-between hover:bg-gray-50 transition"
      >
        <span class="font-medium text-gray-800 truncate">{{ currentViewName }}</span>
        <svg class="w-4 h-4 text-gray-500 transform transition-transform" :class="isOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>

      <div v-if="isOpen" class="absolute right-0 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
        <div 
            v-for="item in menuOptions" 
            :key="item.id"
            @click="selectMenu(item)"
            class="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
        >
            {{ item.name }}
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const props = defineProps({
  initialPeriod: { type: String, default: '1m' },
  initialView: { type: String, default: 'sales' } 
});

const emit = defineEmits(['update:period', 'update:date-range', 'change-view']);

const selectedPeriod = ref(props.initialPeriod);
const isOpen = ref(false);
const currentView = ref(props.initialView);

// ใช้ตัวแปรเดียวเก็บเป็น Array [start, end] ตามข้อกำหนดของ Library
const dateRange = ref([new Date(), new Date()]);

const menuOptions = [
    { id: 'sales', name: 'ยอดขาย' },
    { id: 'bill', name: 'ยอดขายต่อบิลและจำนวนบิล' },
    { id: 'behavior', name: 'พฤติกรรมลูกค้า' }
];

const displayDateRange = computed(() => {
    const formatDate = (date) => {
        if (!date) return '-';
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };
    return {
        start: formatDate(dateRange.value[0]),
        end: formatDate(dateRange.value[1])
    };
});

const currentViewName = computed(() => {
    return menuOptions.find(o => o.id === currentView.value)?.name || 'ยอดขาย';
});

const selectPeriod = (period) => {
    selectedPeriod.value = period;
    const end = new Date();
    const start = new Date();

    switch(period) {
        case '24h': start.setHours(0,0,0,0); break;
        case '7d': start.setDate(end.getDate() - 7); break;
        case '1m': start.setMonth(end.getMonth() - 1); break;
        case '1y': start.setFullYear(end.getFullYear() - 1); break;
        case 'All': start.setFullYear(2023, 0, 1); break;
    }

    // อัปเดตค่าเข้า dateRange
    dateRange.value = [start, end];
    emit('update:period', period); 
    emit('update:date-range', { start, end });
};

// เมื่อมีการเลือกวันที่จากปฏิทินเอง
const onDateChange = (newRange) => {
    if (newRange) {
        selectedPeriod.value = null; // ปลด Active ปุ่ม 7d, 1m ออก
        emit('update:date-range', { start: newRange[0], end: newRange[1] });
    }
};

const selectMenu = (item) => {
    currentView.value = item.id;
    isOpen.value = false;
    emit('change-view', item.id); 
};

onMounted(() => {
    selectPeriod(props.initialPeriod);
});
</script>