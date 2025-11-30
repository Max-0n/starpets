export type FlagCode =
  | 'gb' // English
  | 'tr' // Türkçe
  | 'pt' // Português
  | 'fr' // Français
  | 'es' // Español
  | 'it' // Italiana
  | 'ph' // Filipino
  | 'de' // Deutsche
  | 'ru' // Русский

export interface FlagProps {
  code: FlagCode
  name?: string
}
