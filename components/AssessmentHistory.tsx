'use client'

import { useState, useEffect } from 'react'
import { getSavedAssessments, deleteAssessment, type SavedAssessment } from '@/lib/storage'
import { useLanguage } from './LanguageProvider'
import type { DSFAData, RiskResult } from '@/lib/dsfa'

interface AssessmentHistoryProps {
  onLoadAssessment: (data: DSFAData, result: RiskResult) => void
}

export function AssessmentHistory({ onLoadAssessment }: AssessmentHistoryProps) {
  const [assessments, setAssessments] = useState<SavedAssessment[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()

  useEffect(() => {
    loadAssessments()
  }, [])

  const loadAssessments = () => {
    setAssessments(getSavedAssessments().sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ))
  }

  const handleLoad = (assessment: SavedAssessment) => {
    onLoadAssessment(assessment.data, assessment.result)
    setIsOpen(false)
  }

  const handleDelete = (id: string) => {
    if (confirm(language === 'de' 
      ? 'Möchten Sie diese Beurteilung wirklich löschen?'
      : 'Do you really want to delete this assessment?')) {
      deleteAssessment(id)
      loadAssessments()
    }
  }

  const translations = {
    de: {
      title: 'Gespeicherte Beurteilungen',
      showHistory: 'Historie anzeigen',
      hideHistory: 'Historie ausblenden',
      noAssessments: 'Keine gespeicherten Beurteilungen',
      load: 'Laden',
      delete: 'Löschen',
      project: 'Projekt',
      date: 'Datum',
      risk: 'Risiko',
    },
    en: {
      title: 'Saved Assessments',
      showHistory: 'Show History',
      hideHistory: 'Hide History',
      noAssessments: 'No saved assessments',
      load: 'Load',
      delete: 'Delete',
      project: 'Project',
      date: 'Date',
      risk: 'Risk',
    }
  }

  const t = translations[language]

  if (assessments.length === 0 && !isOpen) {
    return null
  }

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-between"
      >
        <span>{t.title} ({assessments.length})</span>
        <span className="text-sm">{isOpen ? '▼' : '▶'}</span>
      </button>
      
      {isOpen && (
        <div className="mt-4 bg-white rounded-lg shadow-md p-6">
          {assessments.length === 0 ? (
            <p className="text-gray-500 text-center py-4">{t.noAssessments}</p>
          ) : (
            <div className="space-y-3">
              {assessments.map((assessment) => (
                <div
                  key={assessment.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {assessment.data.projectName}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {t.date}: {new Date(assessment.timestamp).toLocaleString(language === 'de' ? 'de-CH' : 'en-US')}
                      </p>
                      <p className="text-sm text-gray-600">
                        {t.risk}: <span className={`font-semibold ${
                          assessment.result.overallRisk === 'high' ? 'text-red-600' :
                          assessment.result.overallRisk === 'medium' ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {language === 'de' 
                            ? (assessment.result.overallRisk === 'high' ? 'Hoch' :
                               assessment.result.overallRisk === 'medium' ? 'Mittel' : 'Niedrig')
                            : assessment.result.overallRisk.charAt(0).toUpperCase() + assessment.result.overallRisk.slice(1)
                          }
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleLoad(assessment)}
                        className="px-3 py-1 bg-primary-600 text-white text-sm rounded hover:bg-primary-700 transition-colors"
                      >
                        {t.load}
                      </button>
                      <button
                        onClick={() => handleDelete(assessment.id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                      >
                        {t.delete}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

