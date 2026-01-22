import { createI18n } from 'vue-i18n'
import th from './locales/th.json'
import en from './locales/en.json'

const i18n = createI18n({
  legacy: false, 
  locale: localStorage.getItem('lang') || 'TH', 
  fallbackLocale: 'EN', 
  messages: {
    TH: th,
    EN: en
  }
})

export default i18n