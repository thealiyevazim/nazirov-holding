import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react'
import { translations, type Language, type TranslationSchema } from '../i18n/translations'

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: TranslationSchema
}

const LANGUAGE_STORAGE_KEY = 'nazirov-language'

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

function readInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'uz'
  }

  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
  if (stored === 'uz' || stored === 'ru' || stored === 'en') {
    return stored
  }

  return 'uz'
}

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<Language>(readInitialLanguage)

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage)
    }
  }

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }
  return context
}
