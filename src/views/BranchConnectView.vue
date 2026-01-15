<template>
  <div class="w-full h-full px-6 md:px-10 flex flex-col relative">
    <div class="mb-8 flex-none">
      <h1 class="text-3xl font-bold text-[#051960] tracking-tight mb-3">
        เชื่อมต่อข้อมูลสาขา
      </h1>
      <p class="text-gray-500 text-sm md:text-base font-light">
        ระบุข้อมูลสาขาของคุณเพื่อให้ RESSELF ช่วยวิเคราะห์
      </p>
    </div>

    <div class="flex-1 overflow-y-auto pb-10 pr-2 custom-scrollbar">
      <div class="w-full max-w-4xl mx-auto flex flex-col gap-8">
        <div
          class="rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 flex flex-col bg-white"
        >
          <div class="bg-[#051960] px-8 py-6">
            <h2 class="text-white text-xl font-bold tracking-wide">
              {{ posName }}
            </h2>
          </div>

          <div class="px-6 md:px-10 py-10">
            <div class="flex flex-col gap-8 mb-8">
              <div
                v-for="(branch, index) in branches"
                :key="index"
                class="w-full relative group/item"
              >
                <div class="flex justify-between items-center mb-2">
                  <label
                    class="block text-[#051960] text-base font-semibold pl-1"
                  >
                    ข้อมูลสาขา
                  </label>
                </div>

                <div class="flex flex-col md:flex-row gap-4 items-stretch">
                  <div class="flex-1">
                    <input
                      v-model="branch.name"
                      type="text"
                      placeholder="ระบุชื่อสาขา (เช่น สาขาสยาม)"
                      class="w-full h-12 px-4 text-sm rounded-xl border-transparent bg-[#F3F4F6] focus:bg-white focus:border-[#051960]/50 focus:ring-2 focus:ring-[#051960]/20 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm"
                    />
                  </div>

                  <div v-if="allowUpload" class="flex-none w-full md:w-auto">
                    <button
                      @click="triggerUpload(index)"
                      class="group w-full md:w-auto h-12 px-5 rounded-xl border transition-all duration-200 whitespace-nowrap text-sm font-medium flex items-center justify-center gap-2 shadow-sm"
                      :class="
                        branch.files.length > 0
                          ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                          : 'bg-white text-gray-500 border-gray-200 hover:border-[#051960] hover:text-[#051960]'
                      "
                    >
                      <svg
                        v-if="branch.files.length === 0"
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
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                      <template v-else>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 group-hover:hidden"
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 hidden group-hover:block"
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
                      </template>

                      <span v-if="branch.files.length === 0">อัปโหลดไฟล์</span>
                      <span v-else>
                        <span class="inline-block group-hover:hidden"
                          >{{ branch.files.length }} ไฟล์แนบแล้ว</span
                        >
                        <span
                          class="hidden group-hover:inline-block font-semibold"
                          >เพิ่มไฟล์อีก</span
                        >
                      </span>
                    </button>

                    <input
                      type="file"
                      ref="fileInputRefs"
                      class="hidden"
                      accept=".csv, .xls, .xlsx"
                      multiple
                      @change="(e) => handleFileUpload(e, index)"
                    />
                  </div>
                </div>

                <div
                  v-if="branch.files.length > 0"
                  class="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
                >
                  <div
                    v-for="(fileItem, fIndex) in branch.files"
                    :key="fIndex"
                    class="text-xs px-3 py-1.5 rounded-xl flex items-center justify-between border transition-all duration-200"
                    :class="{
                      'bg-green-50 border-green-200 text-green-700':
                        fileItem.status === 'ready',

                      'bg-yellow-50 border-yellow-200 text-yellow-700':
                        fileItem.status === 'uploading',
                      'bg-green-100 border-green-300 text-green-800':
                        fileItem.status === 'success',
                      'bg-red-50 border-red-200 text-red-700':
                        fileItem.status === 'error',
                    }"
                  >
                    <div class="flex items-center gap-2 w-full">
                      <div class="flex-shrink-0">
                        <svg
                          v-if="fileItem.status === 'ready'"
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-3.5 w-3.5 overflow-visible"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <svg
                          v-else-if="fileItem.status === 'uploading'"
                          class="animate-spin h-3.5 w-3.5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                          ></circle>
                          <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <svg
                          v-else-if="fileItem.status === 'success'"
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <svg
                          v-else-if="fileItem.status === 'error'"
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>

                      <div class="flex flex-col min-w-0 flex-1">
                        <span
                          class="truncate font-medium text-[11px] md:text-xs leading-tight"
                          >{{ fileItem.file.name }}</span
                        >
                        <span
                          v-if="fileItem.message"
                          class="text-[9px] opacity-80 truncate leading-tight cursor-help"
                          :class="{
                            'text-red-600 font-medium':
                              fileItem.status === 'error',
                          }"
                          :title="fileItem.message"
                          >{{ fileItem.message }}</span
                        >
                      </div>

                      <button
                        @click="removeFile(index, fIndex)"
                        class="p-1 rounded-full hover:bg-black/10 transition-colors flex-shrink-0 -mr-1"
                        :class="{
                          invisible:
                            fileItem.status === 'uploading' ||
                            fileItem.status === 'success',
                        }"
                        title="ลบไฟล์นี้"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center pt-2 pb-10">
          <button
            @click="router.back()"
            class="text-gray-400 hover:text-[#051960] font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm md:text-base"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            ย้อนกลับ
          </button>

          <button
            @click="handleContinue"
            :disabled="isSubmitting"
            class="bg-[#F97316] hover:bg-[#ea580c] text-white font-bold text-base px-8 py-3 rounded-full shadow-lg shadow-orange-200 transition-all transform active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!isSubmitting">ดำเนินการต่อ</span>
            <span v-else>กำลังประมวลผล...</span>
            <svg
              v-if="!isSubmitting"
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
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="modalState.show"
        class="fixed inset-0 z-50 flex items-center justify-center px-4"
      >
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div
          class="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center transform transition-all"
        >
          <div
            class="w-20 h-20 rounded-full flex items-center justify-center mb-6"
            :class="
              modalState.type === 'success' ? 'bg-green-100' : 'bg-red-100'
            "
          >
            <svg
              v-if="modalState.type === 'success'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h3
            class="text-2xl font-bold mb-2"
            :class="
              modalState.type === 'success' ? 'text-[#051960]' : 'text-red-600'
            "
          >
            {{ modalState.title }}
          </h3>

          <p class="text-gray-500 font-light text-sm mb-6">
            {{ modalState.message }}
          </p>

          <div
            v-if="modalState.details && modalState.details.length > 0"
            class="w-full mb-6 text-left bg-red-50 rounded-xl p-4 max-h-40 overflow-y-auto custom-scrollbar border border-red-100"
          >
            <ul class="space-y-3">
              <li
                v-for="(item, idx) in modalState.details"
                :key="idx"
                class="text-xs border-b border-red-100 last:border-0 pb-2 last:pb-0"
              >
                <div class="flex items-start gap-2">
                  <span class="mt-0.5 text-red-500 text-[10px]">⚠️</span>
                  <div>
                    <div class="font-bold text-red-700 truncate">
                      {{ item.filename }}
                    </div>
                    <div class="text-red-600/80 leading-relaxed mt-0.5">
                      {{ item.reason }}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div v-if="modalState.type === 'success'">
            <p class="text-[#F97316] text-sm font-medium animate-pulse">
              กำลังนำคุณไปที่ Dashboard...
            </p>
          </div>
          <div v-else class="w-full">
            <button
              @click="modalState.show = false"
              class="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
            >
              ตกลง
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "@/utils/axios";

const router = useRouter();
const route = useRoute();

const posName = ref(route.query.posName || "My Own POS");
const posId = ref(route.query.posId || "99");

const isSubmitting = ref(false);

const modalState = reactive({
  show: false,
  type: "success", 
  title: "",
  message: "",
  details: [], 
});

// เช็คว่าเป็น RESSELF POS หรือไม่ (ถ้าใช่ ไม่ต้องอัปโหลด)
const allowUpload = computed(() => {
  return posName.value !== "RESSELF POS";
});

// เก็บรายการสาขาและไฟล์แนบ
const branches = reactive([{ name: "", files: [] }]);

const fileInputRefs = ref([]);

// ลบไฟล์ออกจากรายการ
const removeFile = (branchIndex, fileIndex) => {
  if (branches[branchIndex].files[fileIndex].status === "uploading") return;
  branches[branchIndex].files.splice(fileIndex, 1);
};

const triggerUpload = (index) => {
  if (fileInputRefs.value[index]) {
    fileInputRefs.value[index].click();
  }
};

const handleFileUpload = (event, index) => {
  const selectedFiles = Array.from(event.target.files || []);

  if (selectedFiles.length > 0) {
    selectedFiles.forEach((file) => {
      const isDuplicate = branches[index].files.some(
        (f) => f.file.name === file.name
      );
      if (!isDuplicate) {
        branches[index].files.push({
          file: file,
          status: "ready",
          message: "",
        });
      }
    });
  }
  event.target.value = "";
};

const showModal = (type, title, message, details = []) => {
  modalState.type = type;
  modalState.title = title;
  modalState.message = message;
  modalState.details = details;
  modalState.show = true;
};

const handleContinue = async () => {
  const validBranches = branches.filter((b) => b.name.trim() !== "");

  if (validBranches.length === 0) {
    showModal("error", "ข้อมูลไม่ครบถ้วน", "กรุณากรอกชื่อสาขา");
    return;
  }

  if (allowUpload.value) {
    const hasFiles = validBranches.some((b) => b.files.length > 0);
    if (!hasFiles) {
      showModal(
        "error",
        "ไม่พบไฟล์ข้อมูล",
        "กรุณาอัปโหลดไฟล์อย่างน้อย 1 ไฟล์"
      );
      return;
    }
  }

  isSubmitting.value = true;

  try {
    if (!allowUpload.value) {
      router.push({ name: "dashboard" });
      return;
    }

    const uploadPromises = [];

    validBranches.forEach((branch) => {
      if (branch.files.length > 0) {
        branch.files.forEach((fileItem) => {
          if (fileItem.status === "success") return;

          fileItem.status = "uploading";
          fileItem.message = "กำลังอัปโหลด...";

          const formData = new FormData();
          formData.append("pos_system_id", posId.value);
          formData.append("branch_name", branch.name);
          formData.append("file", fileItem.file);

          const p = api
            .post("/sales/import", formData)
            .then((response) => {
              const resData = response.data;
              if (resData && resData.summary && resData.summary.failed > 0) {
                 const logicalError = new Error("Business Logic Error");
                 logicalError.response = response; 
                 throw logicalError; 
              }
              fileItem.status = "success";
              fileItem.message = "นำเข้าข้อมูลสำเร็จ";
              return response;
            })
            .catch((error) => {
              fileItem.status = "error";
              const details = error.response?.data?.details;

              let specificReason = null;
              if (Array.isArray(details) && details.length > 0) {
                specificReason = details[0].reason;
              }

              const msg =
                specificReason ||
                error.response?.data?.message ||
                "เกิดข้อผิดพลาด";

              fileItem.message = msg;
              throw error;
            });

          uploadPromises.push(p);
        });
      }
    });

    if (uploadPromises.length > 0) {
      const results = await Promise.allSettled(uploadPromises);
      const hasFailure = results.some((r) => r.status === "rejected");

      if (!hasFailure) {
        showModal(
          "success",
          "นำเข้าข้อมูลสำเร็จ!",
          "ระบบบันทึกไฟล์ของคุณเรียบร้อยแล้ว"
        );
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        const failedItems = [];
        validBranches.forEach((branch) => {
          branch.files.forEach((f) => {
            if (f.status === "error") {
              failedItems.push({
                filename: f.file.name,
                reason: f.message,
              });
            }
          });
        });

        showModal(
          "error",
          "นำเข้าข้อมูลไม่สมบูรณ์",
          "พบไฟล์ที่ไม่ผ่านการตรวจสอบ:",
          failedItems
        );
      }
    } else {
      router.push("/dashboard");
    }
  } catch (error) {
    console.error("Global Submission Error:", error);
    showModal("error", "เกิดข้อผิดพลาด", "เกิดข้อผิดพลาดในการเชื่อมต่อระบบ");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

@media (max-width: 767px) {
  .w-full.h-full.px-6.md\:px-10 {
    padding-left: 1rem !important;  
    padding-right: 1rem !important;
  }

  .mb-8.flex-none {
    margin-bottom: 1.5rem !important;
  }
  h1.text-3xl {
    font-size: 1.5rem !important; 
    margin-bottom: 0.5rem !important;
  }

  .bg-\[\#051960\].px-8.py-6 {
    padding: 1rem 1.25rem !important;
  }
  h2.text-xl {
    font-size: 1.125rem !important;
  }

  .px-6.md\:px-10.py-10 {
    padding: 1.25rem !important; 
  }

  .flex.flex-col.gap-8.mb-8 {
    gap: 1.5rem !important;
    margin-bottom: 0.75rem !important;
  }

  input[type="text"] {
    height: 2.75rem !important; 
    font-size: 0.875rem !important;
  }

  button.group.w-full.md\:w-auto.h-12 {
    height: 2.75rem !important; 
  }

  .mt-3.grid.grid-cols-1.md\:grid-cols-2 {
    margin-top: 0.75rem !important;
    gap: 0.5rem !important;
  }
  
  .text-xs.px-3.py-1\.5 {
    padding: 0.5rem 0.75rem !important;
  }

  .flex.justify-between.items-center.pt-2.pb-10 {
    flex-direction: row !important;            
    justify-content: space-between !important; 
    align-items: center !important;
    gap: 1rem !important;
    padding-bottom: 2rem !important;
  }

  button.bg-\[\#F97316\] {
    width: auto !important;  
    padding-left: 1.25rem !important;
    padding-right: 1.25rem !important;
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
    font-size: 0.875rem !important; 
  }
  button.bg-\[\#F97316\] svg {
    width: 1.125rem !important;
    height: 1.125rem !important;
  }

  button.text-gray-400 {
    width: auto !important;   
    border: none !important;  
    padding: 0 !important;    
    justify-content: flex-start !important;
    background: transparent !important;
  }

  .relative.bg-white.rounded-3xl.p-8 {
    padding: 1.5rem !important;
    width: 90% !important;
  }
  .w-20.h-20.rounded-full {
    width: 4rem !important;
    height: 4rem !important;
    margin-bottom: 1rem !important;
  }
}
</style>