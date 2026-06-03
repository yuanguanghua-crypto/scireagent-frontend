import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zh from './locales/zh.json'

const saved = localStorage.getItem('lang') || 'en'

export const i18n = createI18n({
  legacy: false,
  locale: saved,
  fallbackLocale: 'en',
  messages: { en, zh },
})

export function switchLang(lang: string) {
  (i18n.global.locale as any).value = lang
  localStorage.setItem('lang', lang)
}

export const supportedLangs = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
]
