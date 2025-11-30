// Ключ по которому authToken будет храниться в LS
export const AUTH_TOKEN_KEY = 'at'

// Маппинг языков на коды флагов
export const LANGUAGE_FLAGS = {
  en: { code: 'gb' as const, name: 'English' },
  tr: { code: 'tr' as const, name: 'Türkçe' },
  pt: { code: 'pt' as const, name: 'Português' },
  fr: { code: 'fr' as const, name: 'Français' },
  es: { code: 'es' as const, name: 'Español' },
  it: { code: 'it' as const, name: 'Italiana' },
  ph: { code: 'ph' as const, name: 'Filipino' },
  de: { code: 'de' as const, name: 'Deutsche' },
  ru: { code: 'ru' as const, name: 'Русский' },
} as const
