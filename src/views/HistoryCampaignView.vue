<template>
  <div
    class="w-full min-h-screen px-6 md:px-10 py-8 font-sans bg-[#F3F5F9]"
    @click="closeAnyOpenMenu"
  >
    <div class="flex items-end justify-between gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-bold text-[#051960] tracking-tight mb-2">
          ประวัติแคมเปญ
        </h1>
        <p class="text-gray-500 text-sm md:text-base font-light">
          ติดตามสถานะและผลลัพธ์ของโปรโมชั่นทั้งหมดของคุณ
        </p>
      </div>
      <button
        @click="$router.push('/ideas')"
        class="bg-[#051960] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-blue-900/20 hover:bg-[#0a237a] hover:-translate-y-0.5 transition-all flex items-center gap-2"
      >
        <span class="text-lg">+</span> สร้างแคมเปญใหม่
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div
        class="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 flex items-center gap-4"
      >
        <div
          class="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <div>
          <p class="text-gray-400 text-xs font-medium uppercase tracking-wider">
            กำลังใช้งาน
          </p>
          <h3 class="text-2xl font-bold text-[#051960]">3 แคมเปญ</h3>
        </div>
      </div>
      <div
        class="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 flex items-center gap-4"
      >
        <div
          class="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <p class="text-gray-400 text-xs font-medium uppercase tracking-wider">
            ยอดขายจากโปรฯ (เดือนนี้)
          </p>
          <h3 class="text-2xl font-bold text-[#051960]">฿24,500</h3>
        </div>
      </div>
      <div
        class="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 flex items-center gap-4"
      >
        <div
          class="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
            />
          </svg>
        </div>
        <div>
          <p class="text-gray-400 text-xs font-medium uppercase tracking-wider">
            Bill Penetration เฉลี่ย
          </p>
          <h3 class="text-2xl font-bold text-[#051960]">12.5%</h3>
        </div>
      </div>
    </div>

    <div class="mb-10">
      <h2 class="text-xl font-bold text-[#051960] mb-6 flex items-center gap-2">
        <span
          class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"
        ></span>
        กำลังดำเนินการ
      </h2>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div
          v-for="campaign in activeCampaigns"
          :key="campaign.id"
          @click="navigateToDetails(campaign.id)"
          class="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 group relative cursor-pointer"
        >
          <div class="relative z-10">
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-center gap-4">
                <div
                  class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-gray-50 group-hover:scale-110 transition-transform duration-300"
                  :class="[campaign.iconColor, campaign.iconBgColor]"
                  v-html="campaign.icon"
                ></div>
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span
                      class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                      :class="campaign.badgeColor"
                    >
                      {{ campaign.type }}
                    </span>
                    <span
                      class="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full flex items-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      เหลือเวลา {{ campaign.daysLeft }} วัน
                    </span>
                  </div>
                  <h3
                    class="text-lg font-bold text-[#051960] group-hover:text-blue-700 transition-colors"
                  >
                    {{ campaign.name }}
                  </h3>
                </div>
              </div>

              <div class="relative">
                <button
                  @click.stop="toggleMenu(campaign.id)"
                  class="w-8 h-8 flex items-center justify-center rounded-full text-gray-300 hover:text-[#051960] hover:bg-gray-100 transition-all active:scale-95"
                  :class="{
                    'bg-blue-50 text-blue-600': activeMenuId === campaign.id,
                  }"
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
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>

                <transition
                  enter-active-class="transition ease-out duration-200"
                  enter-from-class="opacity-0 translate-y-2 scale-95"
                  enter-to-class="opacity-100 translate-y-0 scale-100"
                  leave-active-class="transition ease-in duration-150"
                  leave-from-class="opacity-100 translate-y-0 scale-100"
                  leave-to-class="opacity-0 translate-y-2 scale-95"
                >
                  <div
                    v-if="activeMenuId === campaign.id"
                    @click.stop
                    class="absolute right-0 top-10 w-48 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 z-50 p-2 ring-1 ring-black/5"
                  >
                    <ul class="text-sm text-gray-600">
                      <li>
                        <button
                          @click="handleMenuAction('duplicate', campaign)"
                          class="flex w-full items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-gray-50 hover:text-blue-600 transition-colors text-left group/item"
                        >
                          <span
                            class="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover/item:bg-blue-50 group-hover/item:text-blue-500 transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 01-2-2V5a2 2 0 012-2h4.586"
                              />
                            </svg>
                          </span>
                          <span class="font-medium">ทำซ้ำ</span>
                        </button>
                      </li>
                      <li>
                        <button
                          @click="handleMenuAction('pause', campaign)"
                          class="flex w-full items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-gray-50 hover:text-orange-500 transition-colors text-left group/item"
                        >
                          <span
                            class="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover/item:bg-orange-50 group-hover/item:text-orange-500 transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </span>
                          <span class="font-medium">หยุดชั่วคราว</span>
                        </button>
                      </li>
                      <li class="my-1 border-t border-gray-100"></li>
                      <li>
                        <button
                          @click="handleMenuAction('delete', campaign)"
                          class="flex w-full items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-red-50 hover:text-red-600 text-red-500 transition-colors text-left group/item"
                        >
                          <span
                            class="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-400 group-hover/item:bg-red-100 group-hover/item:text-red-600 transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-4 w-4"
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
                          </span>
                          <span class="font-medium">ลบแคมเปญ</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </transition>
              </div>
            </div>

            <div class="mb-6">
              <div class="flex justify-between text-xs mb-2">
                <span class="text-gray-500">เป้าหมายยอดขาย</span>
                <span class="font-bold text-[#051960]"
                  >{{ campaign.progress }}%</span
                >
              </div>
              <div class="w-full bg-gray-100 rounded-full h-2">
                <div
                  class="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-1000"
                  :style="{ width: campaign.progress + '%' }"
                ></div>
              </div>
              <div class="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>{{ formatDate(campaign.startDate) }}</span>
                <span>{{ formatDate(campaign.endDate) }}</span>
              </div>
            </div>

            <div class="pt-2">
              <button
                @click.stop="navigateToEdit(campaign.id)"
                class="w-full py-3 rounded-xl bg-blue-50 text-blue-700 text-sm font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-blue-500 group-hover/btn:text-white transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                แก้ไขข้อมูล
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
      <h2 class="text-xl font-bold text-[#051960] mb-6">ประวัติย้อนหลัง</h2>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left border-b border-gray-100">
              <th
                class="pb-4 pl-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-[30%]"
              >
                ชื่อแคมเปญ
              </th>
              <th
                class="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center"
              >
                ประเภท
              </th>
              <th
                class="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center"
              >
                ระยะเวลา
              </th>
              <th
                class="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right"
              >
                ยอดขายที่ทำได้
              </th>
              <th
                class="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center"
              >
                สถานะ
              </th>
              <th
                class="pb-4 pr-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right"
              >
                จัดการ
              </th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr
              v-for="history in historyCampaigns"
              :key="history.id"
              class="group border-b border-gray-50 last:border-0 hover:bg-slate-50/50 transition-colors"
            >
              <td class="py-4 pl-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-lg flex items-center justify-center text-lg shadow-sm border border-white"
                    :class="[history.iconColor, history.iconBgColor]"
                    v-html="history.icon"
                  ></div>
                  <div>
                    <div class="font-bold text-[#051960]">
                      {{ history.name }}
                    </div>
                    <div class="text-xs text-gray-400 font-light">
                      {{ history.branch }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="py-4 text-center">
                <span
                  class="bg-gray-100 text-gray-500 px-2 py-1 rounded text-[10px] font-bold"
                >
                  {{ history.type }}
                </span>
              </td>
              <td class="py-4 text-center text-gray-500 font-medium">
                {{ calculateDuration(history.startDate, history.endDate) }} วัน
              </td>
              <td class="py-4 text-right font-bold text-[#051960]">
                ฿{{ formatCurrency(history.revenue) }}
              </td>
              <td class="py-4 text-center">
                <span
                  class="px-2.5 py-1 rounded-full text-[10px] font-bold"
                  :class="
                    history.status === 'Completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  "
                >
                  {{ history.status === "Completed" ? "จบแล้ว" : "ยกเลิก" }}
                </span>
              </td>
              <td class="py-4 pr-4 text-right">
                <button
                  @click="viewReport(history.id)"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-[#051960] hover:bg-[#051960] hover:text-white transition-all text-xs font-bold"
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  ดูรายงาน
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="historyCampaigns.length === 0"
        class="text-center py-10 text-gray-400"
      >
        ยังไม่มีประวัติแคมเปญ
      </div>
    </div>
    <EditCampaignModal
      :is-open="showEditModal"
      :campaign="editingCampaign"
      @close="showEditModal = false"
      @save="handleSaveCampaign"
    />

    <ReportCampaignModal
      :is-open="showReportModal"
      :campaign="reportCampaign"
      @close="showReportModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import EditCampaignModal from "@/components/EditCampaignModal.vue";
import ReportCampaignModal from "@/components/ReportCampaignModal.vue";

const router = useRouter();

// State
const activeMenuId = ref(null);

const showEditModal = ref(false);
const editingCampaign = ref(null);

const showReportModal = ref(false);
const reportCampaign = ref(null);

// Mock Data: Active
const activeCampaigns = ref([
  {
    id: 101,
    name: "โปรโมชั่น ข้าวมันไก่ + น้ำซุปฟัก",
    type: "Pairing",
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-50",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>`,
    badgeColor: "bg-blue-50 text-blue-600 border-blue-100",
    startDate: "2023-10-25",
    endDate: "2023-11-01",
    daysLeft: 5,
    progress: 45,
  },
  {
    id: 102,
    name: "Happy Hour ลด 20% เมนูเส้น",
    type: "Happy Hour",
    iconColor: "text-red-600",
    iconBgColor: "bg-red-50",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    badgeColor: "bg-red-50 text-red-600 border-red-100",
    startDate: "2023-10-20",
    endDate: "2023-10-30",
    daysLeft: 2,
    progress: 82,
  },
]);

// Mock Data: History
const historyCampaigns = ref([
  {
    id: 98,
    name: "ทานครบ 500 ฟรีเกี๊ยวซ่า",
    branch: "สาขา เซ็นทรัลเวิลด์",
    type: "Upsell",
    iconColor: "text-purple-600",
    iconBgColor: "bg-purple-50",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>`,
    startDate: "2023-09-15",
    endDate: "2023-09-30",
    revenue: 45000,
    status: "Completed",
  },
  {
    id: 97,
    name: "ลด 50% เค้กกล้วยหอม",
    branch: "สาขา สยามสแควร์",
    type: "Slow Moving",
    iconColor: "text-orange-600",
    iconBgColor: "bg-orange-50",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>`,
    startDate: "2023-09-01",
    endDate: "2023-09-03",
    revenue: 2100,
    status: "Cancelled",
  },
]);

// Functions
const navigateToEdit = (id) => {
  const campaign = activeCampaigns.value.find((c) => c.id === id);
  if (campaign) {
    editingCampaign.value = campaign;
    showEditModal.value = true;
  }
};

const handleSaveCampaign = (updatedData) => {
  console.log("Saving data:", updatedData);

  // Update ข้อมูลใน Array (จำลอง)
  const index = activeCampaigns.value.findIndex((c) => c.id === updatedData.id);
  if (index !== -1) {
    activeCampaigns.value[index] = {
      ...activeCampaigns.value[index],
      ...updatedData,
    };
  }

  showEditModal.value = false;
};

const toggleMenu = (id) => {
  activeMenuId.value = activeMenuId.value === id ? null : id;
};

const closeAnyOpenMenu = () => {
  activeMenuId.value = null;
};

const handleMenuAction = (action, campaign) => {
  activeMenuId.value = null;
  if (action === "duplicate") {
    alert(`กำลังทำซ้ำแคมเปญ: ${campaign.name}`);
  } else if (action === "delete") {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบแคมเปญนี้?")) {
      alert("ลบแคมเปญเรียบร้อย");
    }
  }
};

const navigateToDetails = (id) => {
  console.log("View Details", id);
};

const viewReport = (id) => {
  const campaign = historyCampaigns.value.find((c) => c.id === id); // หรือ activeCampaigns ตามที่คลิก
  if (campaign) {
    reportCampaign.value = campaign;
    showReportModal.value = true;
  }
};

// Helpers
const formatDate = (dateString) => {
  const options = { day: "numeric", month: "short" };
  return new Date(dateString).toLocaleDateString("th-TH", options);
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US").format(value);
};

const calculateDuration = (start, end) => {
  const diffTime = Math.abs(new Date(end) - new Date(start));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
</script>

<style scoped>
@media (max-width: 767px) {
  .flex.items-end.justify-between.gap-4.mb-8 {
    flex-direction: column !important;
    align-items: stretch !important; 
    gap: 0.75rem;
    margin-bottom: 1.25rem !important;
  }

  .flex.items-end.justify-between.gap-4.mb-8 > div {
    width: 100%;
  }

  .flex.items-end.justify-between.gap-4.mb-8 button {
    width: auto !important; 
    align-self: flex-end; 
    justify-content: center;
    margin-top: 0.5rem;

    padding-top: 0.4rem !important;
    padding-bottom: 0.4rem !important;

    font-weight: 600 !important;
  }

  .grid.grid-cols-1.md\:grid-cols-3.gap-6.mb-10 {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .grid.grid-cols-1.md\:grid-cols-3.gap-6.mb-10 > div {
    padding: 1rem !important;
    display: flex;
    flex-direction: column; 
    justify-content: space-between; 
    align-items: flex-start;
    min-height: 7rem; 
  }

  .grid.grid-cols-1.md\:grid-cols-3.gap-6.mb-10 > div > div:first-child {
    width: 2.25rem;
    height: 2.25rem;
    margin-bottom: 0.5rem;
  }

  .grid.grid-cols-1.md\:grid-cols-3.gap-6.mb-10 > div p {
    font-size: 0.65rem;
    line-height: 1.2;
    color: #9ca3af;
    margin-bottom: 0.25rem;
  }
  .grid.grid-cols-1.md\:grid-cols-3.gap-6.mb-10 > div h3 {
    font-size: 1.1rem; 
  }

  .grid.grid-cols-1.md\:grid-cols-3.gap-6.mb-10 > div:last-child {
    grid-column: span 2; 
    flex-direction: row !important; 
    align-items: center; 

    justify-content: flex-start !important;
    gap: 1rem; 

    min-height: auto; 
    padding: 1rem 1.25rem !important;
  }

  .grid.grid-cols-1.md\:grid-cols-3.gap-6.mb-10
    > div:last-child
    > div:first-child {
    margin-bottom: 0; 
  }

  .grid.grid-cols-1.md\:grid-cols-3.gap-6.mb-10
    > div:last-child
    > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .grid.grid-cols-1.xl\:grid-cols-2 > div .flex.justify-between.items-start {
    display: grid;
    grid-template-areas:
      "tags tags tags"
      "icon name menu";
    grid-template-columns: auto 1fr auto;
    column-gap: 0.75rem;
    row-gap: 0.5rem;
    align-items: center;
  }

  .grid.grid-cols-1.xl\:grid-cols-2
    > div
    .flex.justify-between.items-start
    > .flex.items-center.gap-4,
  .grid.grid-cols-1.xl\:grid-cols-2
    > div
    .flex.justify-between.items-start
    > .flex.items-center.gap-4
    > div:nth-child(2) {
    display: contents;
  }

  .grid.grid-cols-1.xl\:grid-cols-2 > div .flex.items-center.gap-2.mb-1 {
    grid-area: tags;
    margin-bottom: 0;
    flex-wrap: wrap;
    width: 100%;
  }

  .grid.grid-cols-1.xl\:grid-cols-2 > div .w-14.h-14 {
    grid-area: icon;
    width: 3rem !important;
    height: 3rem !important;
    min-width: 3rem !important;
    font-size: 1.5rem;
    margin: 0;
    align-self: flex-start;
    margin-top: 0.25rem;
  }
  .grid.grid-cols-1.xl\:grid-cols-2 > div .w-14.h-14 svg {
    width: 1.5rem !important;
    height: 1.5rem !important;
  }

  .grid.grid-cols-1.xl\:grid-cols-2 > div h3 {
    grid-area: name;
    font-size: 1rem;
    line-height: 1.4;
    margin: 0;

    white-space: normal;
    overflow: visible;
    word-break: break-word;

    align-self: center;
    padding-right: 0.5rem;
  }

  .grid.grid-cols-1.xl\:grid-cols-2 > div .relative {
    grid-area: menu;
    position: static;
    margin-left: auto;
    align-self: center;
  }

  .grid.grid-cols-1.xl\:grid-cols-2 > div {
    padding: 1rem !important;
  }

  table thead {
    display: none;
  }

  table,
  table tbody,
  table tr,
  table td {
    display: block;
    width: 100%;
  }

  table tbody tr {
    margin-bottom: 1rem;
    background-color: #ffffff;
    border: 1px solid #f3f4f6;
    border-radius: 1rem;
    padding: 1.25rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }

  table tbody td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: right;
    padding: 0.5rem 0;
    border-bottom: 1px solid #f8fafc;
  }

  table tbody td:last-child {
    border-bottom: none;
    padding-bottom: 0;
    padding-top: 1rem;
    justify-content: center;
  }

  table tbody td:first-child {
    display: block;
    text-align: left;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f1f5f9;
    margin-bottom: 0.5rem;
  }

  table tbody td:nth-child(2)::before {
    content: "ประเภท";
    font-size: 0.75rem;
    font-weight: bold;
    color: #9ca3af;
    text-transform: uppercase;
  }
  table tbody td:nth-child(3)::before {
    content: "ระยะเวลา";
    font-size: 0.75rem;
    font-weight: bold;
    color: #9ca3af;
    text-transform: uppercase;
  }
  table tbody td:nth-child(4)::before {
    content: "ยอดขายที่ทำได้";
    font-size: 0.75rem;
    font-weight: bold;
    color: #9ca3af;
    text-transform: uppercase;
  }
  table tbody td:nth-child(5)::before {
    content: "สถานะ";
    font-size: 0.75rem;
    font-weight: bold;
    color: #9ca3af;
    text-transform: uppercase;
  }

  table tbody td:last-child button {
    width: 100%;
    justify-content: center;
    background-color: #f8fafc;
    padding: 0.75rem;
  }
}
</style>
