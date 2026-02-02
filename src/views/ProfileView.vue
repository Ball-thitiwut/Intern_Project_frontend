<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import api from "@/utils/axios";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();
const { t } = useI18n();
const isLoading = ref(false);

// จัดการสถานะแจ้งเตือน
const toast = reactive({
  show: false,
  message: "",
  type: "success",
});

const showToast = (message, type = "success") => {
  toast.message = message;
  toast.type = type;
  toast.show = true;
  setTimeout(() => {
    toast.show = false;
  }, 3000);
};

// เก็บข้อมูลตัวเลือกใน Dropdown
const masterData = reactive({
  restaurantTypes: [],
  incomeRanges: [],
  branchRanges: [],
  menuRanges: [],
  ageRanges: [],
  posSystems: [],
});

// ข้อมูลหลักในฟอร์ม
const form = reactive({
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  avatarSeed: "character",
  restaurantName: "",
  categoryId: "",
  ageRangeId: "",
  avgSalesId: "",
  branchesId: "",
  menuRangeId: "",
  posSystemId: "",
});

const originalForm = reactive({});

// เช็คว่า Form มีการเปลี่ยนแปลงหรือไม่? ถ้าเปลี่ยนปุ่ม Save จะทำงาน
const isFormChanged = computed(() => {
  return JSON.stringify(form) !== JSON.stringify(originalForm);
});

const filteredBranchRanges = computed(() => {
  return masterData.branchRanges.map((branch) => ({
    ...branch,
    isDisabled: branch.branch_ranges_label !== "1 สาขา",
    label:
      branch.branch_ranges_label +
      (branch.branch_ranges_label !== "1 สาขา" ? " (Soon)" : ""),
  }));
});

const filteredPosSystems = computed(() => {
  if (!masterData.posSystems.length) return [];

  const mainPos = masterData.posSystems.filter((pos) => {
    const name = pos.pos_systems_name.trim();
    return ![
      "ไม่มี",
      "อื่นๆ",
      "None",
      "Other",
      "Standard CSV",
      "Standard CSV (Other)",
    ].some((exclude) => name.includes(exclude));
  });

  const otherOption = masterData.posSystems.find((pos) =>
    ["Standard CSV", "อื่นๆ", "Other"].some((match) =>
      pos.pos_systems_name.includes(match),
    ),
  );

  return [
    ...mainPos,
    {
      pos_systems_id: otherOption ? otherOption.pos_systems_id : 99,
      pos_systems_name: "POS อื่นๆ",
    },
  ];
});

onMounted(async () => {
  isLoading.value = true;
  try {
    const [optionsRes, userRes, restaurantRes] = await Promise.all([
      api.get("/restaurant-registration-options"),
      api.get("/user/profile"),
      api.get("/restaurant/profile"),
    ]);

    const opts = optionsRes.data;
    Object.assign(masterData, opts);

    // Map ข้อมูล User ใส่ Form
    const userData = userRes.data.profile.user;
    if (userData) {
      form.firstName = userData.first_name || "";
      form.lastName = userData.last_name || "";
      form.email = userData.email || "";
      form.phone = userData.phone || userData.phone_number || "";
      form.avatarSeed =
        userData.avatar_seed || userStore.avatarSeed || userData.first_name;

      // อัปเดต User Store เบื้องต้น
      userStore.updateState({
        firstName: form.firstName,
        lastName: form.lastName,
        avatarSeed: form.avatarSeed,
      });
    }

    // Map ข้อมูลร้านอาหาร ใส่ Form
    const restData = restaurantRes.data.restaurant;
    if (restData) {
      form.restaurantName = restData.restaurant_name || "";
      if (restData.type)
        form.categoryId = restData.type.id || restData.restaurant_types_id;
      if (restData.monthly_income)
        form.avgSalesId =
          restData.monthly_income.id || restData.monthly_income_ranges_id;
      if (restData.branches)
        form.branchesId = restData.branches.id || restData.branch_ranges_id;
      if (restData.menus)
        form.menuRangeId = restData.menus.id || restData.menu_ranges_id;
      if (restData.age)
        form.ageRangeId = restData.age.id || restData.restaurant_age_ranges_id;
      if (restData.pos_system)
        form.posSystemId = restData.pos_system.id || restData.pos_systems_id;
      if (form.posSystemId) {
        const exists = filteredPosSystems.value.some(
          (p) => p.pos_systems_id === form.posSystemId,
        );
        if (!exists) {
          const otherPos = filteredPosSystems.value.find(
            (p) => p.pos_systems_name === "POS อื่นๆ",
          );
          form.posSystemId = otherPos
            ? otherPos.pos_systems_id
            : form.posSystemId;
        }
      }
    }

    Object.assign(originalForm, JSON.parse(JSON.stringify(form)));
  } catch (error) {
    console.error("Error loading data:", error);
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem("access_token");
      router.push("/login");
    }
  } finally {
    isLoading.value = false;
  }
});

// บันทึกข้อมูล
const saveProfile = async () => {
  if (!isFormChanged.value) return;

  isLoading.value = true;

  try {
    const userPayload = {
      first_name: form.firstName,
      last_name: form.lastName,
      phone_number: form.phone,
    };

    const restaurantPayload = {
      restaurant_name: form.restaurantName,
      restaurant_types_id: form.categoryId,
      monthly_income_ranges_id: form.avgSalesId,
      branch_ranges_id: form.branchesId,
      menu_ranges_id: form.menuRangeId,
      restaurant_age_ranges_id: form.ageRangeId,
      pos_systems_id: form.posSystemId,
    };

    const promises = [
      api.put("/user/profile/update", userPayload),
      api.put("/restaurant/update", restaurantPayload),
    ];

    await Promise.all(promises);

    userStore.updateState({
      firstName: form.firstName,
      lastName: form.lastName,
      restaurantName: form.restaurantName,
    });

    Object.assign(originalForm, JSON.parse(JSON.stringify(form)));

    showToast(t("profile_view.toast.messages.save_success"), "success");
  } catch (error) {
    console.error("Save Error:", error);
    const msg =
      error.response?.data?.message ||
      t("profile_view.toast.messages.save_error_default");
    showToast(msg, "error");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen p-6 pb-10 relative">
    <div
      class="max-w-4xl mx-auto mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div>
        <h1 class="text-2xl font-bold text-[#051960]">
          {{ $t("profile_view.header.title") }}
        </h1>
        <p class="text-gray-500 text-sm mt-1">
          {{ $t("profile_view.header.subtitle") }}
        </p>
      </div>

      <div class="flex gap-3">
        <button
          @click="router.back()"
          class="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {{ $t("profile_view.buttons.cancel") }}
        </button>
        <button
          @click="saveProfile"
          :disabled="isLoading || !isFormChanged"
          class="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-[#051960] rounded-lg hover:bg-[#031245] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          <svg
            v-if="isLoading"
            class="animate-spin h-4 w-4 text-white"
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
          {{
            isLoading
              ? $t("profile_view.buttons.saving")
              : $t("profile_view.buttons.save")
          }}
        </button>
      </div>
    </div>

    <div class="max-w-4xl mx-auto space-y-6">
      <div
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8"
      >
        <div class="flex items-center gap-3 mb-6">
          <div class="p-2 bg-blue-50 rounded-lg text-[#051960]">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 class="text-lg font-semibold text-gray-800">
            {{ $t("profile_view.personal_info.title") }}
          </h2>
        </div>

        <div class="flex flex-col md:flex-row gap-8">
          <div class="flex flex-col items-center gap-4 md:w-48 flex-shrink-0">
            <div
              class="w-32 h-32 rounded-full border-4 border-white ring-1 ring-gray-200 overflow-hidden shadow-sm bg-gray-50"
            >
              <img
                :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${form.avatarSeed}`"
                alt="Avatar"
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">{{
                $t("profile_view.personal_info.labels.first_name")
              }}</label>
              <input
                v-model="form.firstName"
                type="text"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
              />
            </div>
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">{{
                $t("profile_view.personal_info.labels.last_name")
              }}</label>
              <input
                v-model="form.lastName"
                type="text"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
              />
            </div>
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">{{
                $t("profile_view.personal_info.labels.phone")
              }}</label>
              <input
                v-model="form.phone"
                type="tel"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
              />
            </div>
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">{{
                $t("profile_view.personal_info.labels.email")
              }}</label>
              <input
                v-model="form.email"
                type="email"
                disabled
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8"
      >
        <div class="flex items-center gap-3 mb-6">
          <div class="p-2 bg-blue-50 rounded-lg text-[#051960]">
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h2 class="text-lg font-semibold text-gray-800">
            {{ $t("profile_view.restaurant_info.title") }}
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <div class="col-span-1 md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1.5">{{
              $t("profile_view.restaurant_info.labels.name")
            }}</label>
            <input
              v-model="form.restaurantName"
              type="text"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
              :placeholder="
                $t('profile_view.restaurant_info.placeholders.name')
              "
            />
          </div>

          <div class="col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1.5">{{
              $t("profile_view.restaurant_info.labels.category")
            }}</label>
            <div class="relative">
              <select
                v-model="form.categoryId"
                class="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm bg-white"
              >
                <option value="" disabled>
                  {{
                    $t(
                      "profile_view.restaurant_info.placeholders.select_category",
                    )
                  }}
                </option>
                <option
                  v-for="cat in masterData.restaurantTypes"
                  :key="cat.restaurant_types_id"
                  :value="cat.restaurant_types_id"
                >
                  {{ cat.restaurant_types_label }}
                </option>
              </select>
              <div
                class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1.5">{{
              $t("profile_view.restaurant_info.labels.age")
            }}</label>
            <div class="relative">
              <select
                v-model="form.ageRangeId"
                class="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm bg-white"
              >
                <option value="" disabled>
                  {{
                    $t("profile_view.restaurant_info.placeholders.select_age")
                  }}
                </option>
                <option
                  v-for="age in masterData.ageRanges"
                  :key="age.restaurant_age_ranges_id"
                  :value="age.restaurant_age_ranges_id"
                >
                  {{ age.restaurant_age_ranges_label }}
                </option>
              </select>
              <div
                class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div
            class="col-span-1 md:col-span-2 border-t border-gray-100 my-1"
          ></div>

          <div class="col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1.5">{{
              $t("profile_view.restaurant_info.labels.avg_sales")
            }}</label>
            <div class="relative">
              <select
                v-model="form.avgSalesId"
                class="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm bg-white"
              >
                <option value="" disabled>
                  {{
                    $t("profile_view.restaurant_info.placeholders.select_sales")
                  }}
                </option>
                <option
                  v-for="range in masterData.incomeRanges"
                  :key="range.monthly_income_ranges_id"
                  :value="range.monthly_income_ranges_id"
                >
                  {{ range.monthly_income_ranges_label }}
                </option>
              </select>
              <div
                class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1.5">{{
              $t("profile_view.restaurant_info.labels.branches")
            }}</label>
            <div class="relative">
              <select
                v-model="form.branchesId"
                class="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm bg-white"
              >
                <option value="" disabled>
                  {{
                    $t(
                      "profile_view.restaurant_info.placeholders.select_branches",
                    )
                  }}
                </option>
                <option
                  v-for="b in filteredBranchRanges"
                  :key="b.branch_ranges_id"
                  :value="b.branch_ranges_id"
                  :disabled="b.isDisabled"
                >
                  {{ b.label }}
                </option>
              </select>
              <div
                class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1.5">{{
              $t("profile_view.restaurant_info.labels.menu_items")
            }}</label>
            <div class="relative">
              <select
                v-model="form.menuRangeId"
                class="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm bg-white"
              >
                <option value="" disabled>
                  {{
                    $t("profile_view.restaurant_info.placeholders.select_menu")
                  }}
                </option>
                <option
                  v-for="m in masterData.menuRanges"
                  :key="m.menu_ranges_id"
                  :value="m.menu_ranges_id"
                >
                  {{ m.menu_ranges_label }}
                </option>
              </select>
              <div
                class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="col-span-1">
            <label class="block text-sm font-medium text-gray-700 mb-1.5">{{
              $t("profile_view.restaurant_info.labels.pos_system")
            }}</label>
            <div class="relative">
              <select
                v-model="form.posSystemId"
                class="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm bg-white"
              >
                <option value="" disabled>
                  {{
                    $t("profile_view.restaurant_info.placeholders.select_pos")
                  }}
                </option>
                <option
                  v-for="pos in filteredPosSystems"
                  :key="pos.pos_systems_id"
                  :value="pos.pos_systems_id"
                >
                  {{ pos.pos_systems_name }}
                </option>
              </select>
              <div
                class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="toast.show"
        class="fixed top-5 right-5 z-50 flex w-full max-w-xs bg-white shadow-[0_4px_20px_rgb(0,0,0,0.08)] rounded-xl border border-gray-100 overflow-hidden ring-1 ring-black ring-opacity-5"
      >
        <div class="p-3 flex items-center w-full">
          <div class="flex-shrink-0">
            <div
              v-if="toast.type === 'success'"
              class="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center"
            >
              <svg
                class="h-5 w-5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div
              v-else
              class="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center"
            >
              <svg
                class="h-5 w-5 text-red-500"
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
            </div>
          </div>

          <div class="ml-3 w-0 flex-1">
            <p class="text-sm font-bold text-[#051960]">
              {{
                toast.type === "success"
                  ? $t("profile_view.toast.titles.success")
                  : $t("profile_view.toast.titles.error")
              }}
            </p>
            <p class="text-xs text-gray-500 mt-0.5">{{ toast.message }}</p>
          </div>

          <div class="ml-2 flex-shrink-0 flex">
            <button
              @click="toast.show = false"
              class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none transition-colors"
            >
              <span class="sr-only">Close</span>
              <svg
                class="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          v-if="toast.show"
          class="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r transition-all duration-[3000ms] ease-linear w-full"
          :class="
            toast.type === 'success'
              ? 'from-green-400 to-green-500'
              : 'from-red-400 to-red-500'
          "
          style="width: 0%; animation: progress 3s linear forwards"
        ></div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
@keyframes progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

option:disabled {
  color: #cbd5e1;
  background-color: #f8fafc;
}

select option:disabled {
  opacity: 0.5;
}

@media (max-width: 767px) {
  .min-h-screen.p-6.pb-10 {
    padding: 1rem !important;
    padding-bottom: 5rem !important;
  }

  .max-w-4xl.mx-auto.mb-6 {
    margin-bottom: 1rem !important;
  }

  h1.text-2xl {
    font-size: 1.25rem !important;
  }

  .max-w-4xl.mx-auto.mb-6 > .flex.gap-3 {
    width: 100%;
    margin-top: 0.5rem;
  }

  .max-w-4xl.mx-auto.mb-6 > .flex.gap-3 button {
    flex: 1;
    justify-content: center;
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
  }

  .bg-white.rounded-xl {
    padding: 1rem !important;
  }

  .flex.items-center.gap-3.mb-6 {
    margin-bottom: 1rem !important;
  }

  .flex.flex-col.md\:flex-row.gap-8 {
    gap: 0.4rem !important;
  }

  .flex.flex-col.md\:flex-row.gap-8 > div:first-child {
    width: 100%;
    margin-bottom: 0 !important;
  }

  .w-32.h-32 {
    width: 6rem !important;
    height: 6rem !important;
    margin: 0 auto;
  }

  input[type="text"],
  input[type="tel"],
  input[type="email"],
  select {
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
    font-size: 0.85rem !important;
    height: auto !important;
  }

  .max-w-4xl.mx-auto.mb-6 > .flex.gap-3 button {
    padding-top: 0.375rem !important;
    padding-bottom: 0.375rem !important;
    font-size: 0.85rem !important;
    height: auto !important;
  }

  .grid.gap-5 {
    gap: 0.75rem !important;
  }

  label.block.text-sm {
    margin-bottom: 0.25rem !important;
    font-size: 0.8rem !important;
  }

  .grid.gap-x-6 {
    gap: 0.75rem !important;
  }

  .grid.gap-x-6 > div.border-t {
    display: none !important;
  }
}
</style>
