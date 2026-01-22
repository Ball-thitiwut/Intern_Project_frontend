<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-[#051960]/20 backdrop-blur-sm p-4 transition-all duration-300"
  >
    <div
      class="bg-white rounded-3xl w-full max-w-[480px] p-8 relative shadow-xl animate-fade-in-up border border-gray-100"
    >
      <button
        @click="$emit('close')"
        class="absolute top-5 right-5 text-gray-400 hover:text-[#051960] bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors duration-200"
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div class="text-center mb-8 mt-2">
        <div class="mb-5 flex justify-center">
          <img
            src="@/assets/images/logo.png"
            alt="RESSELF Logo"
            class="h-16 w-auto object-contain"
          />
        </div>

        <h2 class="text-2xl font-bold text-[#051960] tracking-tight">
          {{ $t("connect_pos_modal.title") }}
        </h2>
        <p class="text-gray-500 text-sm mt-2 font-light">
          {{ $t("connect_pos_modal.instruction") }}
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2 ml-1">{{
            $t("connect_pos_modal.form.api_url_label")
          }}</label>
          <input
            v-model="form.apiUrl"
            type="text"
            :placeholder="$t('connect_pos_modal.form.api_url_placeholder')"
            class="w-full bg-[#F3F4F6] border-transparent focus:bg-white focus:border-[#051960]/50 focus:ring-2 focus:ring-[#051960]/20 rounded-xl h-12 px-5 text-gray-800 placeholder-gray-400 transition-all duration-200"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2 ml-1">{{
            $t("connect_pos_modal.form.ref_code_label")
          }}</label>
          <input
            v-model="form.refCode"
            type="text"
            :placeholder="$t('connect_pos_modal.form.ref_code_placeholder')"
            class="w-full bg-[#F3F4F6] border-transparent focus:bg-white focus:border-[#051960]/50 focus:ring-2 focus:ring-[#051960]/20 rounded-xl h-12 px-5 text-gray-800 placeholder-gray-400 transition-all duration-200"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2 ml-1">{{
            $t("connect_pos_modal.form.key_name_label")
          }}</label>
          <input
            v-model="form.keyName"
            type="text"
            :placeholder="$t('connect_pos_modal.form.key_name_placeholder')"
            class="w-full bg-[#F3F4F6] border-transparent focus:bg-white focus:border-[#051960]/50 focus:ring-2 focus:ring-[#051960]/20 rounded-xl h-12 px-5 text-gray-800 placeholder-gray-400 transition-all duration-200"
            required
          />
        </div>

        <div class="pt-4">
          <button
            type="submit"
            class="w-full bg-[#F97316] hover:bg-[#ea580c] text-white font-bold text-lg py-3.5 px-6 rounded-full shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>{{ $t("connect_pos_modal.form.submit_button") }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useI18n } from "vue-i18n";

const emit = defineEmits(["close", "submit"]);
const { t } = useI18n();

const form = reactive({
  apiUrl: "",
  refCode: "",
  keyName: "",
});

const handleSubmit = () => {
  if (!form.apiUrl || !form.refCode || !form.keyName) {
    alert(t("connect_pos_modal.validation.incomplete_form"));
    return;
  }
  emit("submit", form);
};
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
