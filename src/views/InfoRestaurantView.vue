<template>
  <div class="info-container">
    <div class="content-wrapper">
      <div class="info-card">
        <h1 class="info-title">Restaurant Info</h1>
        <p class="info-description">Tell us about your restaurant.</p>

        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="restaurantName">Restaurant Name</label>
            <input
              type="text"
              id="restaurantName"
              class="form-input"
              v-model="restaurantName"
              placeholder="Ex. The Burger Joint"
              :class="{ 'input-error': errors.restaurantName }"
              @input="clearError('restaurantName')"
            />
            <p v-if="errors.restaurantName" class="error-text">
              {{ errors.restaurantName }}
            </p>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="category">Category</label>
              <select
                id="category"
                class="form-input"
                :class="{
                  'placeholder-text': !category,
                  'input-error': errors.category,
                }"
                v-model="category"
                @change="clearError('category')"
              >
                <option :value="null" disabled selected>Select Category</option>
                <option
                  v-for="type in restaurantTypes"
                  :key="type.restaurant_types_id"
                  :value="type.restaurant_types_id"
                >
                  {{ type.restaurant_types_label }}
                </option>
              </select>
              <p v-if="errors.category" class="error-text">
                {{ errors.category }}
              </p>
            </div>
            <div class="form-group">
              <label for="monthlySales">Avg. Sales</label>
              <select
                id="monthlySales"
                class="form-input"
                :class="{
                  'placeholder-text': !monthlySales,
                  'input-error': errors.monthlySales,
                }"
                v-model="monthlySales"
                @change="clearError('monthlySales')"
              >
                <option :value="null" disabled selected>Select Range</option>
                <option
                  v-for="income in incomeRanges"
                  :key="income.monthly_income_ranges_id"
                  :value="income.monthly_income_ranges_id"
                >
                  {{ income.monthly_income_ranges_label }}
                </option>
              </select>
              <p v-if="errors.monthlySales" class="error-text">
                {{ errors.monthlySales }}
              </p>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="branches">Branches</label>
              <select
                id="branches"
                class="form-input"
                :class="{
                  'placeholder-text': !branches,
                  'input-error': errors.branches,
                }"
                v-model="branches"
                @change="clearError('branches')"
              >
                <option :value="null" disabled selected>Select</option>
                <option
                  v-for="branch in branchRanges"
                  :key="branch.branch_ranges_id"
                  :value="branch.branch_ranges_id"
                  :disabled="branch.branch_ranges_label !== '1 สาขา'"
                >
                  {{ branch.branch_ranges_label }}
                  {{ branch.branch_ranges_label !== "1 สาขา" ? "(Soon)" : "" }}
                </option>
              </select>
              <p v-if="errors.branches" class="error-text">
                {{ errors.branches }}
              </p>
            </div>
            <div class="form-group">
              <label for="menuItems">Menu Items</label>
              <select
                id="menuItems"
                class="form-input"
                :class="{
                  'placeholder-text': !menuItems,
                  'input-error': errors.menuItems,
                }"
                v-model="menuItems"
                @change="clearError('menuItems')"
              >
                <option :value="null" disabled selected>Select</option>
                <option
                  v-for="menu in menuRanges"
                  :key="menu.menu_ranges_id"
                  :value="menu.menu_ranges_id"
                >
                  {{ menu.menu_ranges_label }}
                </option>
              </select>
              <p v-if="errors.menuItems" class="error-text">
                {{ errors.menuItems }}
              </p>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="yearsInBusiness">Years</label>
              <select
                id="yearsInBusiness"
                class="form-input"
                :class="{
                  'placeholder-text': !yearsInBusiness,
                  'input-error': errors.yearsInBusiness,
                }"
                v-model="yearsInBusiness"
                @change="clearError('yearsInBusiness')"
              >
                <option :value="null" disabled selected>Select</option>
                <option
                  v-for="age in ageRanges"
                  :key="age.restaurant_age_ranges_id"
                  :value="age.restaurant_age_ranges_id"
                >
                  {{ age.restaurant_age_ranges_label }}
                </option>
              </select>
              <p v-if="errors.yearsInBusiness" class="error-text">
                {{ errors.yearsInBusiness }}
              </p>
            </div>
            <div class="form-group">
              <label for="posSystem">POS System</label>
              <select
                id="posSystem"
                class="form-input"
                :class="{
                  'placeholder-text': !posSystem,
                  'input-error': errors.posSystem,
                }"
                v-model="posSystem"
                @change="clearError('posSystem')"
              >
                <option :value="null" disabled selected>Select</option>
                <option
                  v-for="pos in filteredPosSystems"
                  :key="pos.pos_systems_id"
                  :value="pos.pos_systems_id"
                >
                  {{ pos.pos_systems_name }}
                </option>
              </select>
              <p v-if="errors.posSystem" class="error-text">
                {{ errors.posSystem }}
              </p>
            </div>
          </div>
        </form>
      </div>

      <div class="action-buttons">
        <button
          class="btn-nav btn-back"
          @click="handleBack"
          :disabled="isLoading"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 19L5 12L12 5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Back
        </button>

        <button
          class="btn-nav btn-next"
          @click="handleSubmit"
          :disabled="isLoading"
        >
          <span v-if="!isLoading">Done</span>
          <span v-else>Processing...</span>
        </button>
      </div>
    </div>

    <DoneSignupModal
      :show="showModal"
      :type="modalType"
      :title="modalTitle"
      :message="modalMessage"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useRegisterStore } from "@/stores/registration";
import api from "@/utils/axios";
import DoneSignupModal from "@/components/DoneSignupModal.vue";
import "@/assets/css/infoForm.css";

const router = useRouter();
const registerStore = useRegisterStore();

// ตัวแปรเก็บค่าจาก Form
const restaurantName = ref("");
const category = ref(null);
const monthlySales = ref(null);
const branches = ref(null);
const menuItems = ref(null);
const yearsInBusiness = ref(null);
const posSystem = ref(null);

// ตัวแปรเก็บตัวเลือก Dropdown
const restaurantTypes = ref([]);
const incomeRanges = ref([]);
const branchRanges = ref([]);
const menuRanges = ref([]);
const ageRanges = ref([]);
const posSystems = ref([]);

// State สำหรับ UI และ Modal
const isLoading = ref(false);
const errors = reactive({});
const showModal = ref(false);
const modalType = ref("success");
const modalTitle = ref("");
const modalMessage = ref("");

// โหลดข้อมูล Dropdown เมื่อเข้าหน้าเว็บ
onMounted(async () => {
  try {
    const response = await api.get("/restaurant-registration-options");
    const data = response.data;

    restaurantTypes.value = data.restaurantTypes || [];
    incomeRanges.value = data.incomeRanges || [];
    branchRanges.value = data.branchRanges || [];
    menuRanges.value = data.menuRanges || [];
    ageRanges.value = data.ageRanges || [];
    posSystems.value = data.posSystems || [];

    if (registerStore.formData.restaurant_name)
      restaurantName.value = registerStore.formData.restaurant_name;
    if (registerStore.formData.restaurant_types_id)
      category.value = registerStore.formData.restaurant_types_id;
    if (registerStore.formData.monthly_income_ranges_id)
      monthlySales.value = registerStore.formData.monthly_income_ranges_id;
    if (registerStore.formData.branch_ranges_id)
      branches.value = registerStore.formData.branch_ranges_id;
    if (registerStore.formData.menu_ranges_id)
      menuItems.value = registerStore.formData.menu_ranges_id;
    if (registerStore.formData.restaurant_age_ranges_id)
      yearsInBusiness.value = registerStore.formData.restaurant_age_ranges_id;

    if (registerStore.formData.pos_systems_id) {
      const isAvailableInFiltered = filteredPosSystems.value.some(
        (p) => p.pos_systems_id === registerStore.formData.pos_systems_id,
      );

      if (isAvailableInFiltered) {
        posSystem.value = registerStore.formData.pos_systems_id;
      } else {
        const otherPos = filteredPosSystems.value.find(
          (p) => p.pos_systems_name === "POS อื่นๆ",
        );
        posSystem.value = otherPos ? otherPos.pos_systems_id : null;
      }
    }
  } catch (error) {
    console.error("Failed to fetch options:", error);
    triggerModal(
      "error",
      "Connection Error",
      "Cannot load options from server.",
    );
  }
});

// ตรวจสอบความถูกต้องของ Form
const validateForm = () => {
  let isValid = true;
  Object.keys(errors).forEach((key) => delete errors[key]);

  if (!restaurantName.value.trim()) {
    errors.restaurantName = "Restaurant name is required";
    isValid = false;
  }
  if (!category.value) {
    errors.category = "Please select a category";
    isValid = false;
  }
  if (!monthlySales.value) {
    errors.monthlySales = "Please select average sales";
    isValid = false;
  }
  if (!branches.value) {
    errors.branches = "Please select number of branches";
    isValid = false;
  }
  if (!menuItems.value) {
    errors.menuItems = "Please select menu range";
    isValid = false;
  }
  if (!yearsInBusiness.value) {
    errors.yearsInBusiness = "Please select years in business";
    isValid = false;
  }
  if (!posSystem.value) {
    errors.posSystem = "Please select a POS system";
    isValid = false;
  }

  return isValid;
};

const clearError = (field) => {
  if (errors[field]) {
    delete errors[field];
  }
};

const triggerModal = (type, title, message) => {
  modalType.value = type;
  modalTitle.value = title;
  modalMessage.value = message;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  if (modalType.value === "success") {
    registerStore.resetForm();
    router.push("/login");
  }
};

// ปุ่ม Back
const handleBack = () => {
  registerStore.formData.restaurant_name = restaurantName.value;
  registerStore.formData.restaurant_types_id = category.value;
  registerStore.formData.monthly_income_ranges_id = monthlySales.value;
  registerStore.formData.branch_ranges_id = branches.value;
  registerStore.formData.menu_ranges_id = menuItems.value;
  registerStore.formData.restaurant_age_ranges_id = yearsInBusiness.value;
  registerStore.formData.pos_systems_id = posSystem.value;

  router.push("/info-user");
};

// ปุ่ม Done
const handleSubmit = async () => {
  if (!validateForm()) return;

  isLoading.value = true;

  registerStore.formData.restaurant_name = restaurantName.value;
  registerStore.formData.restaurant_types_id = category.value;
  registerStore.formData.monthly_income_ranges_id = monthlySales.value;
  registerStore.formData.branch_ranges_id = branches.value;
  registerStore.formData.menu_ranges_id = menuItems.value;
  registerStore.formData.restaurant_age_ranges_id = yearsInBusiness.value;
  registerStore.formData.pos_systems_id = posSystem.value;

  try {
    const response = await api.post("/auth/register", registerStore.formData);

    if (response.status === 200 || response.status === 201) {
      triggerModal(
        "success",
        "Registration Successful!",
        "Your account has been created. Please login.",
      );
    }
  } catch (error) {
    console.error(error);
    const msg =
      error.response?.data?.message || "Registration failed. Please try again.";
    triggerModal("error", "Registration Failed", msg);
  } finally {
    isLoading.value = false;
  }
};

const filteredPosSystems = computed(() => {
  if (!posSystems.value.length) return [];

  const mainPos = posSystems.value.filter((pos) => {
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

  const otherOption = posSystems.value.find((pos) =>
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
</script>

<style scoped>
.placeholder-text {
  color: #a0aec0 !important;
}

.info-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  box-sizing: border-box;
}

.content-wrapper {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
}

.btn-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-back {
  background-color: white;
  color: #6b7280;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.btn-back:hover {
  color: #051960;
  border-color: #051960;
  background-color: #f9fafb;
}

.btn-next {
  background-color: #f97316;
  color: white;
  box-shadow: 0 4px 6px -1px rgba(249, 115, 22, 0.3);
}

.btn-next:hover:not(:disabled) {
  background-color: #ea580c;
  transform: translateY(-1px);
  box-shadow: 0 6px 8px -1px rgba(249, 115, 22, 0.4);
}

.btn-next:active:not(:disabled) {
  transform: translateY(0);
}

.btn-next:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.input-error {
  border-color: #ef4444 !important;
  background-color: #fef2f2;
}

.error-text {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  margin-bottom: 0;
}

option:disabled {
  color: #cbd5e1;
  background-color: #f8fafc;
}

select option:disabled {
  opacity: 0.5;
}

/* Responsive Mobile */
@media (max-width: 768px) {
  .info-container {
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  .content-wrapper {
    width: 100%;
    max-width: 340px !important;
    margin: 0 auto;
    gap: 0.5rem;
  }

  :deep(.info-card),
  .info-card {
    width: 100%;
    padding: 1.5rem !important;
    border-radius: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  :deep(.info-title),
  .info-title {
    font-size: 1.4rem !important;
    text-align: left !important;
    margin-bottom: 0.25rem;
  }

  :deep(.info-description),
  .info-description {
    font-size: 0.85rem !important;
    text-align: left !important;
    margin-bottom: 1.25rem;
  }

  :deep(.form-group) {
    margin-bottom: 0.85rem !important;
  }

  :deep(.form-row),
  .form-row {
    display: flex !important;
    flex-direction: row !important;
    gap: 0.75rem !important;
    margin-bottom: 0.85rem !important;
  }

  .form-row :deep(.form-group),
  .form-row .form-group {
    width: 50% !important;
    margin-bottom: 0 !important;
  }

  label {
    font-size: 0.75rem !important;
    margin-bottom: 0.35rem !important;
    display: block !important;
  }

  :deep(.form-input),
  .form-input,
  select {
    font-size: 13px !important;
    padding: 0 10px !important;
    padding-right: 25px !important;
    height: 36px !important;
    width: 100% !important;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .action-buttons {
    padding: 0 0.25rem;
    margin-top: 0.5rem;
  }

  .btn-nav {
    padding: 0 1.2rem;
    font-size: 0.9rem;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
