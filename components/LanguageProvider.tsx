'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'de' | 'en'

interface Translations {
  [key: string]: {
    de: string
    en: string
  }
}

const translations: Translations = {
  title: {
    de: 'DSFA Tool',
    en: 'DPIA Tool'
  },
  subtitle: {
    de: 'Datenschutz-Folgenabschätzung nach Art. 22 DSG (Schweiz)',
    en: 'Data Protection Impact Assessment according to Art. 22 DPA (Switzerland)'
  },
  passwordTitle: {
    de: 'Zugriff geschützt',
    en: 'Access Protected'
  },
  passwordPlaceholder: {
    de: 'Passwort eingeben',
    en: 'Enter password'
  },
  passwordSubmit: {
    de: 'Zugriff erhalten',
    en: 'Get Access'
  },
  passwordError: {
    de: 'Falsches Passwort',
    en: 'Incorrect password'
  },
  // Add more translations as needed
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('de')

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved && (saved === 'de' || saved === 'en')) {
      setLanguage(saved)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = (key: string): string => {
    const translation = translations[key]
    if (translation) {
      return translation[language] || key
    }
    return key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

