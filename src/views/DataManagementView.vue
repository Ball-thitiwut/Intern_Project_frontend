<script setup>
import { ref, onMounted } from "vue";
import api from "@/utils/axios";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoading = ref(false);
const historyList = ref([]);
const isDeleteModalOpen = ref(false);
const fileToDelete = ref(null);
const isDeleting = ref(false);

// Format วันที่ (DD/MM/YYYY HH:mm)
const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("th-TH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// Format เงิน
const formatCurrency = (amount) => {
  return Number(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const fetchHistory = async () => {
  isLoading.value = true;
  try {
    const response = await api.get("/sales/import-history");
    historyList.value = response.data || [];
  } catch (error) {
    console.error("Fetch History Error:", error);
    if (error.response?.status === 401) {
        router.push("/login");
    }
  } finally {
    isLoading.value = false;
  }
};

const goToUpload = () => {
  // ส่งไปหน้าเลือก POS เพื่อเริ่มกระบวนการอัปโหลดใหม่
  router.push("/select-pos");
};

const confirmDelete = (file) => {
  fileToDelete.value = file;
  isDeleteModalOpen.value = true;
};

const handleDelete = async () => {
  if (!fileToDelete.value) return;
  
  isDeleting.value = true;
  try {
    await api.delete("/sales/delete-file", {
      data: { filename: fileToDelete.value.import_filename },
    });

    isDeleteModalOpen.value = false;
    fileToDelete.value = null;
    await fetchHistory();
    
    alert("ลบข้อมูลเรียบร้อยแล้ว ระบบกำลังประมวลผลข้อมูลใหม่");
  } catch (error) {
    console.error("Delete Error:", error);
    alert(error.response?.data?.message || "เกิดข้อผิดพลาดในการลบไฟล์");
  } finally {
    isDeleting.value = false;
  }
};

onMounted(() => {
  fetchHistory();
});
</script>

<template>
  <div class="min-h-screen px-6 py-8 font-sans text-[#051960] relative">
    
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">จัดการข้อมูล</h1>
        <p class="text-gray-500 mt-1 font-light">
          จัดการไฟล์ข้อมูลยอดขายและประวัติการนำเข้า
        </p>
      </div>
      
      <div class="flex items-center gap-3">
        <button 
          @click="fetchHistory" 
          class="p-2.5 text-gray-400 hover:text-[#051960] hover:bg-white bg-gray-50 border border-transparent hover:border-gray-200 rounded-xl transition-all shadow-sm"
          title="Refresh Data"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        <button 
          @click="goToUpload"
          class="flex items-center gap-2 bg-[#F97316] hover:bg-[#ea580c] text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-100 transition-all active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          นำเข้าข้อมูลเพิ่ม
        </button>
      </div>
    </div>

    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px] relative">
      
      <div v-if="isLoading" class="absolute inset-0 z-10 bg-white/80 flex justify-center items-center">
        <div class="flex flex-col items-center gap-3">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-[#051960]"></div>
            <span class="text-sm font-medium text-gray-500">กำลังโหลดข้อมูล...</span>
        </div>
      </div>

      <div v-if="!isLoading && historyList.length === 0" class="flex flex-col items-center justify-center h-full py-20 text-center">
        <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-700">ยังไม่มีข้อมูล</h3>
        <p class="text-gray-400 text-sm mt-1 mb-6">คุณยังไม่ได้นำเข้าไฟล์ข้อมูลยอดขาย</p>
        <button 
            @click="goToUpload"
            class="bg-[#051960] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#031245] transition-colors shadow-sm"
        >
            เริ่มนำเข้าข้อมูล
        </button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/50 border-b border-gray-100 text-sm uppercase text-gray-500 font-semibold tracking-wider">
              <th class="px-6 py-4 rounded-tl-3xl">ชื่อไฟล์</th>
              <th class="px-6 py-4">สาขา</th> 
              <th class="px-6 py-4">วันที่อัปโหลด</th>
              <th class="px-6 py-4 text-center">จำนวนบิล</th>
              <th class="px-6 py-4 text-right">ยอดขายรวม</th>
              <th class="px-6 py-4 rounded-tr-3xl text-center w-20">จัดการ</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr 
                v-for="(item, index) in historyList" 
                :key="index" 
                class="border-b border-gray-50 hover:bg-blue-50/30 transition-colors group"
            >
              <td class="px-6 py-4 font-medium text-[#051960]">
                <div class="flex items-center gap-3">
                    <div class="p-2 bg-green-50 text-green-600 rounded-lg flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <span class="truncate max-w-[200px] font-semibold" :title="item.import_filename">
                      {{ item.import_filename }}
                    </span>
                </div>
              </td>
              
              <td class="px-6 py-4 text-gray-600">
                <div class="flex items-center gap-2">
                  <span v-if="item.branch_name" class="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium border border-blue-100">
                    {{ item.branch_name }}
                  </span>
                  <span v-else class="text-gray-400">-</span>
                </div>
              </td>

              <td class="px-6 py-4 text-gray-500 whitespace-nowrap">
                {{ formatDate(item.uploaded_at) }}
              </td>
              <td class="px-6 py-4 text-center">
                <span class="bg-gray-100 text-gray-700 py-1 px-3 rounded-full text-xs font-bold">
                    {{ item.total_bills }}
                </span>
              </td>
              <td class="px-6 py-4 text-right font-bold text-[#051960]">
                ฿{{ formatCurrency(item.total_sales) }}
              </td>
              <td class="px-6 py-4 text-center">
                <button 
                    @click="confirmDelete(item)"
                    class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="ลบข้อมูลนี้"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="isDeleteModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" @click="!isDeleting && (isDeleteModalOpen = false)"></div>
        <div class="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative z-10 text-center animate-in fade-in zoom-in duration-200">
            <div class="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </div>
            
            <h3 class="text-xl font-bold mb-2">ยืนยันการลบข้อมูล?</h3>
            <p class="text-sm text-gray-500 mb-6">
                คุณต้องการลบข้อมูลไฟล์ <br/>
                <span class="font-semibold text-[#051960]">"{{ fileToDelete?.import_filename }}"</span> ใช่หรือไม่?<br/>
                <span class="text-xs text-red-400 mt-1 block">*ข้อมูลยอดขายทั้งหมดจากไฟล์นี้จะหายไป</span>
            </p>

            <div class="flex gap-3">
                <button 
                    @click="isDeleteModalOpen = false" 
                    :disabled="isDeleting"
                    class="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors disabled:opacity-50"
                >
                    ยกเลิก
                </button>
                <button 
                    @click="handleDelete" 
                    :disabled="isDeleting"
                    class="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    <svg v-if="isDeleting" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ isDeleting ? 'กำลังลบ...' : 'ลบข้อมูล' }}
                </button>
            </div>
        </div>
    </div>

  </div>
</template>