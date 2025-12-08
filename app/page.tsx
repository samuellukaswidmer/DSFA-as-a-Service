'use client'

import { useState } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import { PasswordProtection } from '@/components/PasswordProtection'
import { DSFAForm } from '@/components/DSFAForm'
import { RiskAssessment } from '@/components/RiskAssessment'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { AssessmentHistory } from '@/components/AssessmentHistory'
import { JSONImport } from '@/components/JSONImport'
import type { DSFAData, RiskResult } from '@/lib/dsfa'
import { calculateRiskAssessment, calculateRiskAssessmentWithAI } from '@/lib/dsfa'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [dsfaData, setDsfaData] = useState<DSFAData | null>(null)
  const [riskResult, setRiskResult] = useState<RiskResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { t, language } = useLanguage()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <PasswordProtection onAuthenticated={() => setIsAuthenticated(true)} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {t('title')}
            </h1>
            <p className="text-gray-600">
              {t('subtitle')}
            </p>
          </div>
          <LanguageSwitcher />
        </div>

        {!riskResult ? (
          <>
            <AssessmentHistory 
              onLoadAssessment={(data, result) => {
                setDsfaData(data)
                setRiskResult(result)
              }}
            />
            <JSONImport 
              onImport={(data, result) => {
                setDsfaData(data)
                setRiskResult(result)
              }}
            />
            <DSFAForm 
              onSubmit={async (data) => {
                setDsfaData(data)
                setIsCalculating(true)
                
                try {
                  // Try AI-powered assessment first
                  const aiResult = await calculateRiskAssessmentWithAI(data, language)
                  
                  if (aiResult) {
                    // Use AI result if available
                    setRiskResult(aiResult)
                  } else {
                    // Fallback to regular assessment
                    const result = calculateRiskAssessment(data, language)
                    setRiskResult(result)
                  }
                } catch (error) {
                  console.error('Error calculating risk assessment:', error)
                  // Fallback to regular assessment on error
                  const result = calculateRiskAssessment(data, language)
                  setRiskResult(result)
                } finally {
                  setIsCalculating(false)
                }
              }}
            />
            
            {isCalculating && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md mx-4">
                  <div className="flex items-center gap-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {language === 'de' ? 'Risikoeinschätzung wird berechnet...' : 'Calculating risk assessment...'}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {language === 'de' ? 'ChatGPT analysiert die Daten...' : 'ChatGPT is analyzing the data...'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <RiskAssessment 
            data={dsfaData!}
            result={riskResult}
            onNewAssessment={() => {
              setDsfaData(null)
              setRiskResult(null)
            }}
          />
        )}
      </div>
    </div>
  )
}
