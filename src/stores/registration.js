import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRegisterStore = defineStore('register', () => {
  const formData = ref({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    restaurant_name: "",
    restaurant_types_id: null,
    monthly_income_ranges_id: null,
    branch_ranges_id: null,
    menu_ranges_id: null,
    restaurant_age_ranges_id: null,
    pos_systems_id: null
  })

  const updateStep1 = (data) => {
    formData.value.email = data.email
    formData.value.password = data.password
    formData.value.confirm_password = data.confirm_password
  }

  const updateStep2 = (data) => {
    formData.value.first_name = data.first_name
    formData.value.last_name = data.last_name
    formData.value.phone_number = data.phone_number
  }

  return { formData, updateStep1, updateStep2 }
})