<script setup>
import { ref, onMounted, onActivated } from "vue";
import api from "@/utils/axios";
import { useRouter } from "vue-router";
import ConfirmManageModal from "@/components/ConfirmManageModal.vue";
import AlertManageModal from "@/components/AlertManageModal.vue";

const router = useRouter();
const isLoading = ref(false);
const historyList = ref([]);

const isDeleteModalOpen = ref(false);
const isSuccessModalOpen = ref(false);
const isErrorModalOpen = ref(false);

const fileToDelete = ref(null);
const isDeleting = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

// State สำหรับ Toggle การ์ดในมือถือ
const expandedItems = ref(new Set());

const toggleExpand = (filename) => {
  if (expandedItems.value.has(filename)) {
    expandedItems.value.delete(filename);
  } else {
    expandedItems.value.add(filename);
  }
};

// ฟังก์ชันจัดรูปแบบวันที่
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

// ฟังก์ชันจัดรูปแบบเงิน
const formatCurrency = (amount) => {
  return Number(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// ดึงข้อมูล
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

// เพิ่มไฟล์
const goToUpload = () => {
  router.push("/select-pos");
};

const confirmDelete = (file) => {
  fileToDelete.value = file;
  isDeleteModalOpen.value = true;
};

// สั่งลบไฟล์ผ่าน API
const handleDelete = async () => {
  if (!fileToDelete.value) return;

  isDeleting.value = true;
  try {
    await api.delete("/sales/delete-file", {
      data: { filename: fileToDelete.value.import_filename },
    });

    isDeleteModalOpen.value = false;

    historyList.value = historyList.value.filter(
      (item) => item.import_filename !== fileToDelete.value.import_filename
    );

    expandedItems.value.delete(fileToDelete.value.import_filename);

    successMessage.value = "ลบข้อมูลเรียบร้อยแล้ว";
    isSuccessModalOpen.value = true;

    fileToDelete.value = null;
  } catch (error) {
    console.error("Delete Error:", error);
    isDeleteModalOpen.value = false;
    errorMessage.value =
      error.response?.data?.message || "เกิดข้อผิดพลาดในการลบไฟล์";
    isErrorModalOpen.value = true;
  } finally {
    isDeleting.value = false;
  }
};

const onSuccessModalClose = () => {
  isSuccessModalOpen.value = false;
};

onMounted(() => {
  fetchHistory();
});

onActivated(() => {
  fetchHistory();
});
</script>

<template>
  <div class="min-h-screen px-4 md:px-6 py-8 font-sans text-[#051960] relative">
    <div
      class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
    >
      <div>
        <h1 class="text-xl md:text-3xl font-bold tracking-tight">
          จัดการข้อมูล
        </h1>
        <p class="text-gray-500 mt-1 font-light text-sm md:text-base">
          จัดการไฟล์ข้อมูลยอดขายและประวัติการนำเข้า
        </p>
      </div>

      <div class="flex items-center justify-end gap-3 w-full md:w-auto">
        <button
          @click="goToUpload"
          class="flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#ea580c] text-white px-4 py-2 text-sm md:px-5 md:py-2.5 md:text-base rounded-xl font-bold shadow-lg shadow-orange-100 transition-all active:scale-95 w-fit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 md:h-5 md:w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          นำเข้าข้อมูลเพิ่ม
        </button>
      </div>
    </div>

    <div
      class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px] relative"
    >
      <div
        v-if="isLoading"
        class="absolute inset-0 z-10 bg-white/80 flex justify-center items-center"
      >
        <div class="flex flex-col items-center gap-3">
          <div
            class="animate-spin rounded-full h-10 w-10 border-b-2 border-[#051960]"
          ></div>
          <span class="text-sm font-medium text-gray-500"
            >กำลังโหลดข้อมูล...</span
          >
        </div>
      </div>

      <div
        v-if="!isLoading && historyList.length === 0"
        class="flex flex-col items-center justify-center h-full py-20 text-center px-4"
      >
        <div
          class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-700">ยังไม่มีข้อมูล</h3>
        <p class="text-gray-400 text-sm mt-1 mb-6">
          คุณยังไม่ได้นำเข้าไฟล์ข้อมูลยอดขาย
        </p>
        <button
          @click="goToUpload"
          class="bg-[#051960] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#031245] transition-colors shadow-sm"
        >
          เริ่มนำเข้าข้อมูล
        </button>
      </div>

      <div v-else>
        <div class="md:hidden">
          <div
            v-for="(item, index) in historyList"
            :key="'mobile-' + item.import_filename"
            class="p-4 border-b border-gray-100"
          >
            <div class="flex justify-between items-start">
              <div class="flex items-start gap-3 pr-2">
                <div
                  class="p-2 bg-green-50 text-green-600 rounded-lg flex-shrink-0 mt-0.5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>

                <div>
                  <div
                    class="text-sm font-semibold text-[#051960] break-all line-clamp-2"
                  >
                    {{ item.import_filename }}
                  </div>
                  <div class="text-xs text-gray-400 mt-1">
                    {{ formatDate(item.uploaded_at) }}
                  </div>
                </div>
              </div>

              <button
                @click="confirmDelete(item)"
                class="text-gray-300 hover:text-red-500 flex-shrink-0 p-1 -mr-2 -mt-1"
                title="ลบข้อมูลนี้"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>

            <div
              v-if="expandedItems.has(item.import_filename)"
              class="mt-3 pt-3 border-t border-dashed border-gray-100 bg-gray-50/50 p-3 rounded-xl text-sm grid grid-cols-2 gap-4 animate-fade-in-down"
            >
              <div>
                <div class="text-xs text-gray-400 mb-1">สาขา</div>
                <span
                  v-if="item.branch_name"
                  class="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium border border-blue-100 inline-block"
                >
                  {{ item.branch_name }}
                </span>
                <span v-else class="text-gray-400">-</span>
              </div>
              <div>
                <div class="text-xs text-gray-400 mb-1">จำนวนบิล</div>
                <span class="font-medium text-gray-700"
                  >{{ item.total_bills }} บิล</span
                >
              </div>
              <div
                class="col-span-2 border-t border-gray-200 pt-2 mt-1 flex justify-between items-center"
              >
                <span class="text-xs text-gray-500">ยอดขายรวม</span>
                <span class="font-bold text-[#051960] text-base"
                  >฿{{ formatCurrency(item.total_sales) }}</span
                >
              </div>
            </div>

            <div class="flex justify-center mt-2 -mb-2">
              <button
                @click="toggleExpand(item.import_filename)"
                class="text-gray-400 hover:text-[#051960] transition-colors p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 transition-transform duration-200"
                  :class="{
                    'rotate-180': expandedItems.has(item.import_filename),
                  }"
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
            </div>
          </div>
        </div>

        <div class="overflow-x-auto hidden md:block">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr
                class="bg-gray-50/50 border-b border-gray-100 text-sm uppercase text-gray-500 font-semibold tracking-wider"
              >
                <th class="px-6 py-4 rounded-tl-3xl">ชื่อไฟล์</th>
                <th class="px-6 py-4">สาขา</th>
                <th class="px-6 py-4">วันที่อัปโหลด</th>
                <th class="px-6 py-4 text-center">จำนวนบิล</th>
                <th class="px-6 py-4 text-right">ยอดขายรวม</th>
                <th class="px-6 py-4 rounded-tr-3xl text-center w-20">
                  จัดการ
                </th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr
                v-for="(item, index) in historyList"
                :key="item.import_filename"
                class="border-b border-gray-50 hover:bg-blue-50/30 transition-colors group"
              >
                <td class="px-6 py-4 font-medium text-[#051960]">
                  <div class="flex items-center gap-3">
                    <div
                      class="p-2 bg-green-50 text-green-600 rounded-lg flex-shrink-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <span
                      class="truncate max-w-[200px] font-semibold"
                      :title="item.import_filename"
                    >
                      {{ item.import_filename }}
                    </span>
                  </div>
                </td>

                <td class="px-6 py-4 text-gray-600">
                  <div class="flex items-center gap-2">
                    <span
                      v-if="item.branch_name"
                      class="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium border border-blue-100"
                    >
                      {{ item.branch_name }}
                    </span>
                    <span v-else class="text-gray-400">-</span>
                  </div>
                </td>

                <td class="px-6 py-4 text-gray-500 whitespace-nowrap">
                  {{ formatDate(item.uploaded_at) }}
                </td>
                <td class="px-6 py-4 text-center">
                  <span
                    class="bg-gray-100 text-gray-700 py-1 px-3 rounded-full text-xs font-bold"
                  >
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <ConfirmManageModal
      :is-open="isDeleteModalOpen"
      title="ยืนยันการลบข้อมูล?"
      confirm-text="ลบข้อมูล"
      cancel-text="ยกเลิก"
      loading-text="กำลังลบ..."
      :is-loading="isDeleting"
      @close="isDeleteModalOpen = false"
      @confirm="handleDelete"
    >
      <template #content>
        คุณต้องการลบข้อมูลไฟล์ <br />
        <span class="font-semibold text-[#051960]"
          >"{{ fileToDelete?.import_filename }}"</span
        >
        ใช่หรือไม่?<br />
        <span class="text-xs text-red-400 mt-1 block"
          >*ข้อมูลยอดขายทั้งหมดจากไฟล์นี้จะหายไป</span
        >
      </template>
    </ConfirmManageModal>

    <AlertManageModal
      :is-open="isSuccessModalOpen"
      type="success"
      title="สำเร็จ!"
      :message="successMessage"
      @close="onSuccessModalClose"
    />

    <AlertManageModal
      :is-open="isErrorModalOpen"
      type="error"
      title="เกิดข้อผิดพลาด"
      :message="errorMessage"
      button-text="ปิด"
      @close="isErrorModalOpen = false"
    />
  </div>
</template>