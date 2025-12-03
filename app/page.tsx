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
import { calculateRiskAssessment } from '@/lib/dsfa'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [dsfaData, setDsfaData] = useState<DSFAData | null>(null)
  const [riskResult, setRiskResult] = useState<RiskResult | null>(null)
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
              onSubmit={(data) => {
                setDsfaData(data)
                // Calculate risk assessment
                const result = calculateRiskAssessment(data, language)
                setRiskResult(result)
              }}
            />
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
