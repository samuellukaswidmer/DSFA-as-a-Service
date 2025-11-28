'use client'

import { useLanguage } from './LanguageProvider'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex gap-2 bg-white rounded-lg shadow-sm p-1">
      <button
        onClick={() => setLanguage('de')}
        className={`px-4 py-2 rounded-md font-medium transition-colors ${
          language === 'de'
            ? 'bg-primary-600 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        DE
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-4 py-2 rounded-md font-medium transition-colors ${
          language === 'en'
            ? 'bg-primary-600 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        EN
      </button>
    </div>
  )
}

