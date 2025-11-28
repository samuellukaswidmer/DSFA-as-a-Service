'use client'

import { useState } from 'react'
import { importAssessmentFromJSON } from '@/lib/storage'
import { useLanguage } from './LanguageProvider'
import type { DSFAData, RiskResult } from '@/lib/dsfa'

interface JSONImportProps {
  onImport: (data: DSFAData, result: RiskResult) => void
}

export function JSONImport({ onImport }: JSONImportProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [jsonText, setJsonText] = useState('')
  const [error, setError] = useState('')
  const { language } = useLanguage()

  const translations = {
    de: {
      title: 'JSON importieren',
      showImport: 'JSON importieren',
      hideImport: 'Import ausblenden',
      placeholder: 'JSON-Daten hier einfügen...',
      import: 'Importieren',
      cancel: 'Abbrechen',
      success: 'Erfolgreich importiert!',
      error: 'Fehler beim Importieren. Bitte überprüfen Sie das JSON-Format.',
    },
    en: {
      title: 'Import JSON',
      showImport: 'Import JSON',
      hideImport: 'Hide Import',
      placeholder: 'Paste JSON data here...',
      import: 'Import',
      cancel: 'Cancel',
      success: 'Successfully imported!',
      error: 'Error importing. Please check the JSON format.',
    }
  }

  const t = translations[language]

  const handleImport = () => {
    setError('')
    try {
      const assessment = importAssessmentFromJSON(jsonText)
      if (assessment) {
        onImport(assessment.data, assessment.result)
        setJsonText('')
        setIsOpen(false)
        alert(t.success)
      } else {
        setError(t.error)
      }
    } catch (err) {
      setError(t.error)
    }
  }

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-green-50 hover:bg-green-100 text-green-700 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-between"
      >
        <span>{t.showImport}</span>
        <span className="text-sm">{isOpen ? '▼' : '▶'}</span>
      </button>
      
      {isOpen && (
        <div className="mt-4 bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-gray-900 mb-4">{t.title}</h3>
          <textarea
            value={jsonText}
            onChange={(e) => {
              setJsonText(e.target.value)
              setError('')
            }}
            placeholder={t.placeholder}
            className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
          />
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleImport}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              {t.import}
            </button>
            <button
              onClick={() => {
                setIsOpen(false)
                setJsonText('')
                setError('')
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              {t.cancel}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

