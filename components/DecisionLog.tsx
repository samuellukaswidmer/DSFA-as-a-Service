'use client'

import type { RiskResult } from '@/lib/dsfa'
import { useLanguage } from './LanguageProvider'

interface DecisionLogProps {
  result: RiskResult
}

export function DecisionLog({ result }: DecisionLogProps) {
  const { language } = useLanguage()

  if (!result.decisionLog) {
    return null
  }

  // Only show decision log if there are actual risks or missing measures
  const hasRisks = result.risks.length > 0
  const hasMissingMeasures = result.decisionLog.riskCalculation.missingMeasures > 0
  const hasHighSeverityRisks = result.decisionLog.riskCalculation.highSeverityRisks > 0
  const hasMediumSeverityRisks = result.decisionLog.riskCalculation.mediumSeverityRisks > 0
  
  // Don't show if there are no risks and no missing measures
  if (!hasRisks && !hasMissingMeasures && !hasHighSeverityRisks && !hasMediumSeverityRisks) {
    return null
  }

  const translations = {
    de: {
      title: 'Entscheidungslogik',
      subtitle: 'Wie wurde die Risikobewertung berechnet?',
      riskCalculation: 'Risikoberechnung',
      complianceDecision: 'Compliance-Entscheidung',
      factor: 'Faktor',
      value: 'Wert',
      impact: 'Auswirkung',
      reasoning: 'Begründung',
      step: 'Schritt',
      overallReasoning: 'Gesamtbegründung',
      checks: 'Compliance-Prüfungen',
      statistics: 'Statistiken',
      highSeverityRisks: 'Risiken mit hohem Schweregrad',
      mediumSeverityRisks: 'Risiken mit mittlerem Schweregrad',
      totalRisks: 'Gesamtanzahl Risiken',
      criticalFactors: 'Kritische Faktoren',
      missingMeasures: 'Fehlende Massnahmen'
    },
    en: {
      title: 'Decision Logic',
      subtitle: 'How was the risk assessment calculated?',
      riskCalculation: 'Risk Calculation',
      complianceDecision: 'Compliance Decision',
      factor: 'Factor',
      value: 'Value',
      impact: 'Impact',
      reasoning: 'Reasoning',
      step: 'Step',
      overallReasoning: 'Overall Reasoning',
      checks: 'Compliance Checks',
      statistics: 'Statistics',
      highSeverityRisks: 'High severity risks',
      mediumSeverityRisks: 'Medium severity risks',
      totalRisks: 'Total risks',
      criticalFactors: 'Critical factors',
      missingMeasures: 'Missing measures'
    }
  }

  const t = translations[language]

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{t.title}</h3>
      <p className="text-sm text-gray-600 mb-6">{t.subtitle}</p>

      {/* Statistics Overview - Only show if there are risks or missing measures */}
      {(hasRisks || hasMissingMeasures || hasHighSeverityRisks || hasMediumSeverityRisks) && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {hasHighSeverityRisks && (
            <div className="bg-red-50 rounded-lg p-3 border border-red-200">
              <p className="text-xs text-gray-600 mb-1">{t.highSeverityRisks}</p>
              <p className="text-2xl font-bold text-red-800">
                {result.decisionLog.riskCalculation.highSeverityRisks}
              </p>
            </div>
          )}
          {hasMediumSeverityRisks && (
            <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
              <p className="text-xs text-gray-600 mb-1">{t.mediumSeverityRisks}</p>
              <p className="text-2xl font-bold text-yellow-800">
                {result.decisionLog.riskCalculation.mediumSeverityRisks}
              </p>
            </div>
          )}
          {hasRisks && (
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <p className="text-xs text-gray-600 mb-1">{t.totalRisks}</p>
              <p className="text-2xl font-bold text-gray-800">
                {result.decisionLog.riskCalculation.totalRisks}
              </p>
            </div>
          )}
          {result.decisionLog.riskCalculation.criticalFactors > 0 && (
            <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
              <p className="text-xs text-gray-600 mb-1">{t.criticalFactors}</p>
              <p className="text-2xl font-bold text-purple-800">
                {result.decisionLog.riskCalculation.criticalFactors}
              </p>
            </div>
          )}
          {hasMissingMeasures && (
            <div className="bg-red-50 rounded-lg p-3 border border-red-200">
              <p className="text-xs text-gray-600 mb-1">{t.missingMeasures}</p>
              <p className="text-2xl font-bold text-red-800">
                {result.decisionLog.riskCalculation.missingMeasures}
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* Specific Risks List */}
      {result.risks.length > 0 && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            {language === 'de' ? 'Identifizierte Risiken im Detail:' : 'Identified Risks in Detail:'}
          </h4>
          <div className="space-y-2">
            {result.risks.map((risk) => {
              const severityColor = risk.severity === 'high' 
                ? 'text-red-800 bg-red-50 border-red-200' 
                : risk.severity === 'medium'
                ? 'text-yellow-800 bg-yellow-50 border-yellow-200'
                : 'text-green-800 bg-green-50 border-green-200'
              return (
                <div key={risk.id} className={`p-2 rounded border ${severityColor}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{risk.description}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      risk.severity === 'high' ? 'bg-red-200 text-red-900' :
                      risk.severity === 'medium' ? 'bg-yellow-200 text-yellow-900' :
                      'bg-green-200 text-green-900'
                    }`}>
                      {language === 'de' 
                        ? (risk.severity === 'high' ? 'Hoch' : risk.severity === 'medium' ? 'Mittel' : 'Niedrig')
                        : risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)
                      }
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Risk Calculation Steps - Only show if there are relevant steps */}
      {result.decisionLog.riskCalculation.steps.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">{t.riskCalculation}</h4>
          <div className="space-y-3">
            {result.decisionLog.riskCalculation.steps.map((step, index) => {
            // Determine color based on step content
            let stepColor = 'blue'
            if (step.factor.includes('hohem') || step.factor.includes('high') || step.impact.includes('hohem') || step.impact.includes('high')) {
              stepColor = 'red'
            } else if (step.factor.includes('mittlerem') || step.factor.includes('medium') || step.impact.includes('mittlerem') || step.impact.includes('medium')) {
              stepColor = 'yellow'
            } else if (step.factor.includes('fehlend') || step.factor.includes('missing')) {
              stepColor = 'red'
            }
            
            const borderColor = stepColor === 'red' ? 'border-red-500' : stepColor === 'yellow' ? 'border-yellow-500' : 'border-blue-500'
            const bgColor = stepColor === 'red' ? 'bg-red-50' : stepColor === 'yellow' ? 'bg-yellow-50' : 'bg-blue-50'
            const textColor = stepColor === 'red' ? 'text-red-900' : stepColor === 'yellow' ? 'text-yellow-900' : 'text-blue-900'
            
            return (
            <div
              key={index}
              className={`border-l-4 ${borderColor} ${bgColor} rounded-r-lg p-4`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-semibold ${textColor}`}>
                      {t.step} {index + 1}:
                    </span>
                    <span className="text-sm font-medium text-gray-900">{step.factor}</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    <span className="font-semibold">{t.value}:</span> {step.value} |{' '}
                    <span className="font-semibold">{t.impact}:</span> {step.impact}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700">{step.reasoning}</p>
            </div>
            )
          })}
          </div>
          {result.decisionLog.riskCalculation.reasoning && (
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg border-2 border-blue-300">
              <p className="font-semibold text-gray-900 mb-1">{t.overallReasoning}:</p>
              <p className="text-sm text-gray-800">{result.decisionLog.riskCalculation.reasoning}</p>
            </div>
          )}
        </div>
      )}

      {/* Compliance Decision */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">{t.complianceDecision}</h4>
        <div className="space-y-3 mb-4">
          {result.decisionLog.complianceDecision.checks.map((check, index) => (
            <div
              key={index}
              className={`border-l-4 rounded-r-lg p-4 ${
                check.impact.includes('Nicht konform') || check.impact.includes('Non-compliant')
                  ? 'border-red-500 bg-red-50'
                  : check.impact.includes('Hinweis') || check.impact.includes('Note')
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-green-500 bg-green-50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-gray-900">{check.factor}</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    <span className="font-semibold">{t.value}:</span> {check.value} |{' '}
                    <span className="font-semibold">{t.impact}:</span> {check.impact}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700">{check.reasoning}</p>
            </div>
          ))}
        </div>
        <div
          className={`p-4 rounded-lg border-2 ${
            result.complianceStatus.art22
              ? 'bg-green-100 border-green-300'
              : 'bg-red-100 border-red-300'
          }`}
        >
          <p className="font-semibold text-gray-900 mb-1">{t.overallReasoning}:</p>
          <p className="text-sm text-gray-800">
            {result.decisionLog.complianceDecision.reasoning}
          </p>
        </div>
      </div>
    </div>
  )
}

