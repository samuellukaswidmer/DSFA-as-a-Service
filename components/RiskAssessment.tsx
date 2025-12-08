'use client'

import { useState, useEffect, useRef } from 'react'
import type { DSFAData, RiskResult } from '@/lib/dsfa'
import { useLanguage } from './LanguageProvider'
import { exportFullToPDF } from '@/lib/pdfExport'
import { saveAssessment, exportFullAssessmentToJSON } from '@/lib/storage'
import { LegalText } from './LegalText'
import { RiskSummary } from './RiskSummary'

interface RiskAssessmentProps {
  data: DSFAData
  result: RiskResult
  onNewAssessment: () => void
}

export function RiskAssessment({ data, result, onNewAssessment }: RiskAssessmentProps) {
  const { language } = useLanguage()
  const [isExporting, setIsExporting] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [aiSummary, setAiSummary] = useState<string | null>(null)
  const [aiError, setAiError] = useState<string | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const hasSavedRef = useRef(false)

  useEffect(() => {
    // Auto-save assessment
    if (hasSavedRef.current) return
    saveAssessment(data, result)
    hasSavedRef.current = true
    setIsSaved(true)
  }, [data, result])

  const translations = {
    de: {
      title: 'Risikobeurteilung',
      overallRisk: 'Gesamtrisiko',
      risks: 'Identifizierte Risiken',
      recommendations: 'Empfehlungen',
      compliance: 'Compliance-Status',
      art22Compliant: 'Art. 22 DSG konform',
      art22NonCompliant: 'Art. 22 DSG nicht vollständig konform',
      issues: 'Hinweise',
      category: 'Kategorie',
      likelihood: 'Wahrscheinlichkeit',
      impact: 'Auswirkung',
      severity: 'Schweregrad',
      mitigation: 'Massnahmen',
      priority: 'Priorität',
      newAssessment: 'Neue Beurteilung',
      export: 'Als PDF exportieren',
      exportJSON: 'Als JSON exportieren',
      saved: 'Gespeichert',
      exporting: 'Exportiere...',
      low: 'Niedrig',
      medium: 'Mittel',
      high: 'Hoch',
      confidentiality: 'Vertraulichkeit',
      integrity: 'Integrität',
      availability: 'Verfügbarkeit',
      transparency: 'Transparenz',
      lawfulness: 'Rechtmässigkeit',
      aiSummary: 'KI-Zusammenfassung',
      aiGenerate: 'KI-Zusammenfassung erstellen',
      aiLoading: 'Erstelle...',
      aiError: 'KI-Zusammenfassung konnte nicht erstellt werden'
    },
    en: {
      title: 'Risk Assessment',
      overallRisk: 'Overall Risk',
      risks: 'Identified Risks',
      recommendations: 'Recommendations',
      compliance: 'Compliance Status',
      art22Compliant: 'Art. 22 DPA compliant',
      art22NonCompliant: 'Art. 22 DPA not fully compliant',
      issues: 'Issues',
      category: 'Category',
      likelihood: 'Likelihood',
      impact: 'Impact',
      severity: 'Severity',
      mitigation: 'Mitigation Measures',
      priority: 'Priority',
      newAssessment: 'New Assessment',
      export: 'Export as PDF',
      exportJSON: 'Export as JSON',
      saved: 'Saved',
      exporting: 'Exporting...',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      confidentiality: 'Confidentiality',
      integrity: 'Integrity',
      availability: 'Availability',
      transparency: 'Transparency',
      lawfulness: 'Lawfulness',
      aiSummary: 'AI Summary',
      aiGenerate: 'Generate AI summary',
      aiLoading: 'Generating...',
      aiError: 'AI summary could not be generated'
    }
  }

  const t = translations[language]

  const getRiskColor = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300'
    }
  }

  const getCategoryLabel = (category: string) => {
    const categoryMap: { [key: string]: { de: string; en: string } } = {
      confidentiality: { de: t.confidentiality, en: t.confidentiality },
      integrity: { de: t.integrity, en: t.integrity },
      availability: { de: t.availability, en: t.availability },
      transparency: { de: t.transparency, en: t.transparency },
      lawfulness: { de: t.lawfulness, en: t.lawfulness }
    }
    return categoryMap[category]?.[language] || category
  }

  const handleGenerateAI = async () => {
    setAiLoading(true)
    setAiError(null)
    setAiSummary(null)
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, result, language })
      })
      if (!response.ok) {
        throw new Error('Request failed')
      }
      const json = await response.json()
      setAiSummary(json.summary || '')
    } catch (error) {
      console.error('AI generate error', error)
      setAiError(t.aiError)
    } finally {
      setAiLoading(false)
    }
  }

  const escapeHtml = (str: string) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')

  const renderAiSummary = (summary: string) => {
    const lines = summary.split('\n').map((line) => line.trim()).filter(Boolean)
    const html: string[] = []
    let inUl = false
    let inOl = false

    const closeLists = () => {
      if (inUl) {
        html.push('</ul>')
        inUl = false
      }
      if (inOl) {
        html.push('</ol>')
        inOl = false
      }
    }

    lines.forEach((line) => {
      const bolded = escapeHtml(line).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      if (line.match(/^\d+\.\s+/)) {
        if (inUl) {
          html.push('</ul>')
          inUl = false
        }
        if (!inOl) {
          html.push('<ol class="list-decimal ml-5 space-y-1">')
          inOl = true
        }
        html.push(`<li>${bolded.replace(/^\d+\.\s+/, '')}</li>`)
      } else if (line.startsWith('- ')) {
        if (inOl) {
          html.push('</ol>')
          inOl = false
        }
        if (!inUl) {
          html.push('<ul class="list-disc ml-5 space-y-1">')
          inUl = true
        }
        html.push(`<li>${bolded.replace(/^- /, '')}</li>`)
      } else {
        closeLists()
        html.push(`<p class="font-semibold mb-1">${bolded}</p>`)
      }
    })
    closeLists()
    return html.join('')
  }

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      await exportFullToPDF(data, result, language, aiSummary)
    } catch (error) {
      console.error('Error exporting PDF:', error)
      alert(language === 'de' ? 'Fehler beim Exportieren der PDF' : 'Error exporting PDF')
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportJSON = () => {
    const assessment = {
      id: `dsfa_${Date.now()}`,
      timestamp: new Date().toISOString(),
      data,
      result,
      aiSummary: aiSummary || undefined,
    }
    const json = exportFullAssessmentToJSON(assessment)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `DSFA_${data.projectName.replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Legal Text Component */}
      <LegalText />

      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h2>
            <p className="text-gray-600">{data.projectName}</p>
          </div>
          <button
            onClick={onNewAssessment}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            {t.newAssessment}
          </button>
        </div>

        {/* Overall Risk */}
        <div className="mt-6 p-4 rounded-lg border-2 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{t.overallRisk}</h3>
              <span className={`inline-block px-4 py-2 rounded-lg font-bold text-lg border-2 ${getRiskColor(result.overallRisk)}`}>
                {t[result.overallRisk]}
              </span>
              {isSaved && (
                <span className="ml-4 text-sm text-green-600 font-medium">✓ {t.saved}</span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExporting ? t.exporting : t.export}
              </button>
              <button
                onClick={handleExportJSON}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                {t.exportJSON}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Summary - What are the risks and missing measures */}
      <RiskSummary result={result} />

      {/* Compliance Status */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{t.compliance}</h3>
        <div className={`p-4 rounded-lg ${result.complianceStatus.art22 ? 'bg-green-50 border-2 border-green-200' : 'bg-yellow-50 border-2 border-yellow-200'}`}>
          <p className={`font-semibold mb-2 ${result.complianceStatus.art22 ? 'text-green-800' : 'text-yellow-800'}`}>
            {result.complianceStatus.art22 ? t.art22Compliant : t.art22NonCompliant}
          </p>
          {result.complianceStatus.issues.length > 0 && (
            <div className="mt-2">
              <p className="font-medium text-gray-700 mb-1">{t.issues}:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {result.complianceStatus.issues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* AI Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl font-bold text-gray-900">{t.aiSummary}</h3>
          <button
            onClick={handleGenerateAI}
            disabled={aiLoading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {aiLoading ? t.aiLoading : t.aiGenerate}
          </button>
        </div>
        {aiError && <p className="text-sm text-red-600">{aiError}</p>}
        {aiSummary && (
          <div
            className="mt-2 bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-indigo-900 space-y-2"
            dangerouslySetInnerHTML={{ __html: renderAiSummary(aiSummary) }}
          />
        )}
        {!aiSummary && !aiLoading && !aiError && (
          <p className="text-sm text-gray-600">
            {language === 'de'
              ? 'Erstelle eine KI-Zusammenfassung der aktuellen Bewertung.'
              : 'Generate an AI summary of the current assessment.'}
          </p>
        )}
      </div>

      {/* Risks */}
      {result.risks.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{t.risks}</h3>
          <p className="text-sm text-gray-600 mb-4">
            {language === 'de' 
              ? `Es wurden ${result.risks.length} Risiken identifiziert. Jedes Risiko wird mit Wahrscheinlichkeit, Auswirkung und Schweregrad bewertet.`
              : `${result.risks.length} risks were identified. Each risk is assessed with likelihood, impact, and severity.`}
          </p>
          <div className="space-y-4">
            {result.risks.map((risk) => (
              <div key={risk.id} className="border-2 border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">{risk.description}</h4>
                    <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">
                        {language === 'de' 
                          ? 'Warum ist das ein Risiko?'
                          : 'Why is this a risk?'}
                      </p>
                      <p className="text-sm text-gray-800">
                        {language === 'de'
                          ? `Dieses Risiko betrifft das Schutzziel "${getCategoryLabel(risk.category)}". Die Wahrscheinlichkeit ist ${t[risk.likelihood]}, die Auswirkung ist ${t[risk.impact]}, was zu einem ${t[risk.severity]}en Schweregrad führt.`
                          : `This risk affects the security objective "${getCategoryLabel(risk.category)}". The likelihood is ${t[risk.likelihood]}, the impact is ${t[risk.impact]}, resulting in ${t[risk.severity]} severity.`}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
                        {t.category}: {getCategoryLabel(risk.category)}
                      </span>
                      <span className={`px-2 py-1 rounded border ${getRiskColor(risk.likelihood)}`}>
                        {t.likelihood}: {t[risk.likelihood]}
                      </span>
                      <span className={`px-2 py-1 rounded border ${getRiskColor(risk.impact)}`}>
                        {t.impact}: {t[risk.impact]}
                      </span>
                      <span className={`px-2 py-1 rounded border ${getRiskColor(risk.severity)}`}>
                        {t.severity}: {t[risk.severity]} ({t[risk.likelihood]} × {t[risk.impact]})
                      </span>
                    </div>
                  </div>
                </div>
                {risk.mitigation.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="font-medium text-gray-700 mb-2">
                      {language === 'de' 
                        ? 'Wie kann dieses Risiko reduziert werden?'
                        : 'How can this risk be reduced?'}
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {risk.mitigation.map((mitigation, index) => (
                        <li key={index}>{mitigation}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{t.recommendations}</h3>
          <div className="space-y-4">
            {result.recommendations.map((rec) => (
              <div key={rec.id} className="border-l-4 border-primary-500 bg-blue-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(rec.priority)}`}>
                    {t.priority}: {t[rec.priority]}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {language === 'de' ? 'Projektübersicht' : 'Project Summary'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold text-gray-700">
              {language === 'de' ? 'Verantwortliche Person' : 'Responsible Person'}:
            </span>
            <span className="ml-2 text-gray-600">{data.responsiblePerson}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">
              {language === 'de' ? 'E-Mail' : 'Email'}:
            </span>
            <span className="ml-2 text-gray-600">{data.contactEmail}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">
              {language === 'de' ? 'Datenvolumen' : 'Data Volume'}:
            </span>
            <span className="ml-2 text-gray-600">{t[data.dataVolume]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
