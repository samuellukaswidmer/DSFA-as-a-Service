'use client'

import type { RiskResult } from '@/lib/dsfa'
import { useLanguage } from './LanguageProvider'

interface RiskSummaryProps {
  result: RiskResult
}

export function RiskSummary({ result }: RiskSummaryProps) {
  const { language } = useLanguage()

  if (!result.riskSummary) {
    return null
  }

  const translations = {
    de: {
      title: 'Risiko-Übersicht',
      riskExplanation: 'Risikoerklärung',
      riskDrivers: 'Risikotreiber',
      missingMeasures: 'Fehlende Schutzmassnahmen',
      measure: 'Massnahme',
      impact: 'Auswirkung',
      recommendation: 'Empfehlung',
      noMissingMeasures: 'Alle kritischen Schutzmassnahmen sind vorhanden.',
      noRiskDrivers: 'Keine kritischen Risikotreiber identifiziert.'
    },
    en: {
      title: 'Risk Summary',
      riskExplanation: 'Risk Explanation',
      riskDrivers: 'Risk Drivers',
      missingMeasures: 'Missing Security Measures',
      measure: 'Measure',
      impact: 'Impact',
      recommendation: 'Recommendation',
      noMissingMeasures: 'All critical security measures are in place.',
      noRiskDrivers: 'No critical risk drivers identified.'
    }
  }

  const t = translations[language]

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{t.title}</h3>

      {/* Risk Explanation */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">{t.riskExplanation}</h4>
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4">
          <p className="text-gray-800 leading-relaxed">{result.riskSummary.riskExplanation}</p>
        </div>
      </div>

      {/* Risk Drivers */}
      {result.riskSummary.riskDrivers.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">{t.riskDrivers}</h4>
          <div className="space-y-2">
            {result.riskSummary.riskDrivers.map((driver, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-lg p-3"
              >
                <span className="text-orange-600 font-bold mt-0.5">•</span>
                <p className="text-gray-800 flex-1">{driver}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Missing Security Measures */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-3">{t.missingMeasures}</h4>
        {result.riskSummary.missingMeasures.length > 0 ? (
          <div className="space-y-4">
            {result.riskSummary.missingMeasures.map((item, index) => (
              <div
                key={index}
                className="border-2 border-red-200 bg-red-50 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-semibold text-red-900 text-lg">{item.measure}</h5>
                  <span className="px-3 py-1 bg-red-200 text-red-900 rounded-full text-xs font-semibold">
                    {language === 'de' ? 'Fehlt' : 'Missing'}
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">{t.impact}:</p>
                    <p className="text-sm text-gray-800">{item.impact}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">{t.recommendation}:</p>
                    <p className="text-sm text-gray-800">{item.recommendation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium">{t.noMissingMeasures}</p>
          </div>
        )}
      </div>
    </div>
  )
}

