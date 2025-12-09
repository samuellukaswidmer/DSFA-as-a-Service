// DSFA Logic based on Art. 22 DSG (Switzerland)

export interface DSFAData {
  // Basic Information
  projectName: string
  projectDescription: string
  responsiblePerson: string
  contactEmail: string
  
  // Data Processing Details
  dataCategories: string[]
  dataSubjects: string[]
  dataVolume: 'low' | 'medium' | 'high'
  dataRetention: string
  outsourcingCountries?: string
  thirdCountryRiskNotes?: string
  
  // Processing Characteristics
  processingPurpose: string
  dataSharing: boolean
  dataSharingDetails?: string
  thirdCountryTransfer: boolean
  thirdCountryDetails?: string
  
  // Technical and Organizational Measures
  encryption: boolean
  accessControls: boolean
  dataMinimization: boolean
  pseudonymization: boolean
  otherMeasures?: string
  
  // Risk Factors
  sensitiveData: boolean
  sensitiveDataDetails?: string
  automatedDecisionMaking: boolean
  profiling: boolean
  largeScaleProcessing: boolean
  systematicMonitoring: boolean
  
  // Additional Information
  previousAssessments?: string
  stakeholderConsultation?: string
}

export interface Risk {
  id: string
  category: 'confidentiality' | 'integrity' | 'availability' | 'transparency' | 'lawfulness'
  description: string
  likelihood: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high'
  severity: 'low' | 'medium' | 'high'
  mitigation: string[]
}

export interface Recommendation {
  id: string
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  legalBasis?: string
}

export interface DecisionReason {
  factor: string
  value: string | boolean
  impact: string
  reasoning: string
}

export interface RiskSummary {
  riskExplanation: string
  missingMeasures: {
    measure: string
    impact: string
    recommendation: string
  }[]
  riskDrivers: string[]
}

export interface RiskResult {
  overallRisk: 'low' | 'medium' | 'high'
  risks: Risk[]
  recommendations: Recommendation[]
  complianceStatus: {
    art22: boolean
    issues: string[]
  }
  riskSummary?: RiskSummary
  decisionLog?: {
    riskCalculation: {
      highSeverityRisks: number
      mediumSeverityRisks: number
      totalRisks: number
      criticalFactors: number
      missingMeasures: number
      reasoning: string
      steps: DecisionReason[]
    }
    complianceDecision: {
      reasoning: string
      checks: DecisionReason[]
    }
  }
}

type Language = 'de' | 'en'

const translations = {
  de: {
    sensitiveDataDescription: 'Verarbeitung von besonders schützenswerten Personendaten',
    sensitiveDataMitigation: [
      'Strikte Zugriffskontrollen implementieren',
      'Verschlüsselung für Daten in Ruhe und Übertragung',
      'Pseudonymisierung wo möglich'
    ],
    sensitiveDataRecTitle: 'Besonderer Schutz für sensible Daten',
    sensitiveDataRecDescription:
      'Aufgrund der Verarbeitung besonders schützenswerter Personendaten sind zusätzliche technische und organisatorische Massnahmen erforderlich.',
    largeScaleDescription: 'Grossflächige Verarbeitung von Personendaten',
    largeScaleMitigation: [
      'Transparente Informationspflichten erfüllen',
      'Betroffenenrechte sicherstellen',
      'Regelmässige Überprüfung der Verarbeitung'
    ],
    automatedDecisionDescription: 'Automatisierte Entscheidungsfindung',
    automatedDecisionMitigation: [
      'Menschliche Überprüfung sicherstellen',
      'Erklärbarkeit der Entscheidungen gewährleisten',
      'Widerspruchsrecht implementieren'
    ],
    automatedDecisionRecTitle: 'Transparenz bei automatisierten Entscheidungen',
    automatedDecisionRecDescription:
      'Bei automatisierter Entscheidungsfindung müssen Betroffene informiert werden und ein Widerspruchsrecht haben.',
    thirdCountryDescription: 'Datenübermittlung in Drittstaaten',
    thirdCountryMitigation: [
      'Angemessene Garantien sicherstellen (z.B. Standardvertragsklauseln)',
      'Risikobewertung für Drittstaat',
      'Dokumentation der Übermittlung'
    ],
    thirdCountryRecTitle: 'Drittstaat-Übermittlung prüfen',
    thirdCountryRecDescription:
      'Datenübermittlungen in Drittstaaten erfordern angemessene Garantien gemäss Art. 16 DSG.',
    systematicMonitoringDescription: 'Systematische Überwachung',
    systematicMonitoringMitigation: [
      'Transparente Information der Betroffenen',
      'Datenschutz-Folgenabschätzung durchführen',
      'Regelmässige Überprüfung der Notwendigkeit'
    ],
    encryptionDescription: 'Fehlende Verschlüsselung',
    encryptionMitigation: [
      'Verschlüsselung für Daten in Ruhe implementieren',
      'Verschlüsselung für Datenübertragung sicherstellen'
    ],
    encryptionRecTitle: 'Verschlüsselung implementieren',
    encryptionRecDescription: 'Verschlüsselung ist eine wichtige technische Massnahme zum Schutz der Personendaten.',
    accessControlsDescription: 'Fehlende Zugriffskontrollen',
    accessControlsMitigation: [
      'Zugriffskontrollen implementieren',
      'Berechtigungskonzept erstellen',
      'Regelmässige Überprüfung der Berechtigungen'
    ],
    dataMinimizationRecTitle: 'Datensparsamkeit beachten',
    dataMinimizationRecDescription: 'Es sollten nur die für den Zweck notwendigen Personendaten verarbeitet werden.',
    complianceSensitiveData: 'Besonders schützenswerte Daten erfordern Verschlüsselung',
    complianceLargeScale: 'Bei grossflächiger Verarbeitung ist Datensparsamkeit besonders wichtig'
  },
  en: {
    sensitiveDataDescription: 'Processing of special category personal data',
    sensitiveDataMitigation: [
      'Implement strict access controls',
      'Encrypt data at rest and in transit',
      'Use pseudonymization where possible'
    ],
    sensitiveDataRecTitle: 'Special protection for sensitive data',
    sensitiveDataRecDescription:
      'Because special category data is processed, additional technical and organizational measures are required.',
    largeScaleDescription: 'Large-scale processing of personal data',
    largeScaleMitigation: [
      'Fulfill transparency and information duties',
      'Ensure data subject rights',
      'Regularly review the processing'
    ],
    automatedDecisionDescription: 'Automated decision making',
    automatedDecisionMitigation: [
      'Ensure human review',
      'Guarantee explainability of decisions',
      'Implement the right to object'
    ],
    automatedDecisionRecTitle: 'Transparency for automated decisions',
    automatedDecisionRecDescription:
      'For automated decision making, data subjects must be informed and provided with a right to object.',
    thirdCountryDescription: 'Data transfer to third countries',
    thirdCountryMitigation: [
      'Ensure appropriate safeguards (e.g. standard contractual clauses)',
      'Assess risks for the third country',
      'Document the transfer'
    ],
    thirdCountryRecTitle: 'Review third-country transfers',
    thirdCountryRecDescription:
      'Transfers to third countries require appropriate safeguards according to Art. 16 DPA.',
    systematicMonitoringDescription: 'Systematic monitoring',
    systematicMonitoringMitigation: [
      'Provide transparent information to data subjects',
      'Conduct a data protection impact assessment',
      'Regularly review the necessity'
    ],
    encryptionDescription: 'Missing encryption',
    encryptionMitigation: [
      'Implement encryption for data at rest',
      'Ensure encryption for data in transit'
    ],
    encryptionRecTitle: 'Implement encryption',
    encryptionRecDescription: 'Encryption is an important technical measure to protect personal data.',
    accessControlsDescription: 'Missing access controls',
    accessControlsMitigation: [
      'Implement access controls',
      'Create an authorization concept',
      'Regularly review permissions'
    ],
    dataMinimizationRecTitle: 'Apply data minimization',
    dataMinimizationRecDescription: 'Only the data necessary for the purpose should be processed.',
    complianceSensitiveData: 'Special category data requires encryption',
    complianceLargeScale: 'Data minimization is especially important for large-scale processing'
  }
} as const

// AI-powered risk assessment using ChatGPT
export async function calculateRiskAssessmentWithAI(
  data: DSFAData,
  language: Language = 'de',
  apiKey?: string
): Promise<RiskResult | null> {
  // Try both environment variable names for flexibility
  const key = apiKey || process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY
  if (!key) {
    return null // Fallback to regular assessment
  }

  try {
    const promptLanguage = language === 'de' ? 'Deutsch' : 'English'
    const prompt = `Du bist ein Experte für Datenschutz-Folgenabschätzungen nach Art. 22 DSG (Schweiz).

Analysiere die folgende Datenschutz-Folgenabschätzung und erstelle eine vollständige Risikobewertung.

PROJEKTDATEN:
- Projektname: ${data.projectName}
- Beschreibung: ${data.projectDescription}
- Verantwortliche Person: ${data.responsiblePerson}
- E-Mail: ${data.contactEmail}
- Datenkategorien: ${data.dataCategories.join(', ')}
- Betroffene Personengruppen: ${data.dataSubjects.join(', ')}
- Datenvolumen: ${data.dataVolume}
- Aufbewahrungsdauer: ${data.dataRetention}
- Verarbeitungszweck: ${data.processingPurpose}
- Datenweitergabe: ${data.dataSharing ? 'Ja' : 'Nein'}${data.dataSharingDetails ? ` (${data.dataSharingDetails})` : ''}
- Drittstaat-Übermittlung: ${data.thirdCountryTransfer ? 'Ja' : 'Nein'}${data.thirdCountryDetails ? ` (${data.thirdCountryDetails})` : ''}
- Outsourcing-Länder: ${data.outsourcingCountries || 'Nicht angegeben'}
- Drittstaaten-Risikobewertung: ${data.thirdCountryRiskNotes || 'Nicht angegeben'}

TECHNISCHE MASSNAHMEN:
- Verschlüsselung: ${data.encryption ? 'Ja' : 'Nein'}
- Zugriffskontrollen: ${data.accessControls ? 'Ja' : 'Nein'}
- Datensparsamkeit: ${data.dataMinimization ? 'Ja' : 'Nein'}
- Pseudonymisierung: ${data.pseudonymization ? 'Ja' : 'Nein'}
${data.otherMeasures ? `- Weitere Massnahmen: ${data.otherMeasures}` : ''}

RISIKOFAKTOREN:
- Besonders schützenswerte Daten: ${data.sensitiveData ? 'Ja' : 'Nein'}${data.sensitiveDataDetails ? ` (${data.sensitiveDataDetails})` : ''}
- Automatisierte Entscheidungsfindung: ${data.automatedDecisionMaking ? 'Ja' : 'Nein'}
- Profiling: ${data.profiling ? 'Ja' : 'Nein'}
- Grossflächige Verarbeitung: ${data.largeScaleProcessing ? 'Ja' : 'Nein'}
- Systematische Überwachung: ${data.systematicMonitoring ? 'Ja' : 'Nein'}

Erstelle eine vollständige Risikobewertung im folgenden JSON-Format. Antworte NUR mit gültigem JSON, keine zusätzlichen Erklärungen:

{
  "overallRisk": "low|medium|high",
  "risks": [
    {
      "id": "risk-1",
      "category": "confidentiality|integrity|availability|transparency|lawfulness",
      "description": "Beschreibung des Risikos",
      "likelihood": "low|medium|high",
      "impact": "low|medium|high",
      "severity": "low|medium|high",
      "mitigation": ["Massnahme 1", "Massnahme 2"]
    }
  ],
  "recommendations": [
    {
      "id": "rec-1",
      "priority": "high|medium|low",
      "title": "Titel der Empfehlung",
      "description": "Detaillierte Beschreibung",
      "legalBasis": "Art. XX DSG"
    }
  ],
  "complianceStatus": {
    "art22": true|false,
    "art22Reasoning": "Begründung für Compliance-Status",
    "issues": ["Hinweis 1", "Hinweis 2"]
  }
}

WICHTIG: 
- Bewerte Risiken nach der Formel: Schweregrad = Wahrscheinlichkeit × Auswirkung
- Berücksichtige Art. 16 DSG bei Drittstaaten-Übermittlungen (unterscheide zwischen EU/EWR/UK und Hochrisikoländern)
- Art. 22 DSG Compliance: 
  * Nicht konform wenn besonders schützenswerte Daten ohne Verschlüsselung
  * Nicht konform wenn Gesamtrisiko "high" UND kritische Schutzmassnahmen fehlen
  * Nicht konform wenn Gesamtrisiko "high" - hohes Risiko bedeutet grundsätzlich nicht konform, es sei denn alle kritischen Massnahmen sind vorhanden
  * Bei hohem Risiko müssen alle kritischen Massnahmen (Verschlüsselung, Zugriffskontrollen) vorhanden sein
- Antworte in ${promptLanguage}`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Du bist ein Experte für schweizerisches Datenschutzrecht (DSG). Antworte nur mit gültigem JSON im exakten Format wie angegeben.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3, // Lower temperature for more consistent results
        max_tokens: 2000,
        response_format: { type: 'json_object' }
      }),
    })

    if (!response.ok) {
      console.error('OpenAI API error:', response.statusText)
      return null
    }

    const result = await response.json()
    const content = result.choices[0]?.message?.content

    if (!content) {
      return null
    }

    // Parse JSON response
    let aiResult: any
    try {
      aiResult = JSON.parse(content)
    } catch (parseError) {
      // Try to extract JSON from markdown code blocks
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        aiResult = JSON.parse(jsonMatch[1] || jsonMatch[0])
      } else {
        console.error('Could not parse AI response:', content)
        return null
      }
    }

    // Generate risk summary for AI result
    const aiRisks = (aiResult.risks || []).map((r: any) => ({
      id: r.id || `risk-${Math.random()}`,
      category: r.category || 'confidentiality',
      description: r.description || '',
      likelihood: r.likelihood || 'medium',
      impact: r.impact || 'medium',
      severity: r.severity || 'medium',
      mitigation: Array.isArray(r.mitigation) ? r.mitigation : []
    }))
    
    const aiOverallRisk = aiResult.overallRisk || 'low'
    const highSeverityRisks = aiRisks.filter((r: any) => r.severity === 'high').length
    
    // Generate missing measures list
    const missingMeasuresList: RiskSummary['missingMeasures'] = []
    if (!data.encryption) {
      missingMeasuresList.push({
        measure: language === 'de' ? 'Verschlüsselung' : 'Encryption',
        impact: language === 'de' 
          ? 'Daten sind ungeschützt und können bei Verletzungen gelesen werden'
          : 'Data is unprotected and can be read in case of breaches',
        recommendation: language === 'de'
          ? 'Implementieren Sie Verschlüsselung für Daten in Ruhe (at rest) und während der Übertragung (in transit) gemäss Art. 8 DSG'
          : 'Implement encryption for data at rest and in transit according to Art. 8 DPA'
      })
    }
    if (!data.accessControls) {
      missingMeasuresList.push({
        measure: language === 'de' ? 'Zugriffskontrollen' : 'Access Controls',
        impact: language === 'de'
          ? 'Unbefugte Personen könnten auf Personendaten zugreifen'
          : 'Unauthorized persons could access personal data',
        recommendation: language === 'de'
          ? 'Implementieren Sie ein Berechtigungskonzept mit rollenbasierten Zugriffskontrollen'
          : 'Implement an authorization concept with role-based access controls'
      })
    }
    if (!data.dataMinimization) {
      missingMeasuresList.push({
        measure: language === 'de' ? 'Datensparsamkeit' : 'Data Minimization',
        impact: language === 'de'
          ? 'Es werden möglicherweise mehr Daten verarbeitet als notwendig'
          : 'More data may be processed than necessary',
        recommendation: language === 'de'
          ? 'Prüfen Sie, ob alle verarbeiteten Daten für den Zweck notwendig sind'
          : 'Review whether all processed data is necessary for the purpose'
      })
    }
    
    // Generate risk drivers from AI risks
    const riskDrivers = aiRisks.slice(0, 3).map((r: any) => r.description)
    
    // Generate risk explanation
    const riskExplanation = language === 'de'
      ? `Das Gesamtrisiko wurde als "${aiOverallRisk === 'high' ? 'hoch' : aiOverallRisk === 'medium' ? 'mittel' : 'niedrig'}" bewertet. ${riskDrivers.length > 0 ? `Hauptrisiken: ${riskDrivers.join('; ')}. ` : ''}${aiRisks.length > 0 ? `Es wurden ${aiRisks.length} Risiken identifiziert, davon ${highSeverityRisks} mit hohem Schweregrad. ` : ''}${missingMeasuresList.length > 0 ? `Fehlende Schutzmassnahmen: ${missingMeasuresList.map(m => m.measure).join(', ')}. ` : ''}`
      : `The overall risk was assessed as "${aiOverallRisk}". ${riskDrivers.length > 0 ? `Main risks: ${riskDrivers.join('; ')}. ` : ''}${aiRisks.length > 0 ? `${aiRisks.length} risks were identified, ${highSeverityRisks} with high severity. ` : ''}${missingMeasuresList.length > 0 ? `Missing security measures: ${missingMeasuresList.map(m => m.measure).join(', ')}. ` : ''}`

    // Validate and transform to RiskResult format
    const riskResult: RiskResult = {
      overallRisk: aiOverallRisk,
      risks: aiRisks,
      recommendations: (aiResult.recommendations || []).map((r: any) => ({
        id: r.id || `rec-${Math.random()}`,
        priority: r.priority || 'medium',
        title: r.title || '',
        description: r.description || '',
        legalBasis: r.legalBasis
      })),
      complianceStatus: {
        // Override AI compliance if overall risk is high and critical measures are missing
        art22: (() => {
          const aiCompliant = aiResult.complianceStatus?.art22 ?? true
          
          // High risk should generally mean non-compliant
          if (aiOverallRisk === 'high') {
            // Check if critical measures are present
            const hasEncryption = data.encryption
            const hasAccessControls = data.accessControls
            
            // If critical measures missing, definitely not compliant
            if (!hasEncryption || !hasAccessControls) {
              return false
            }
            // Even with measures, high risk is generally not compliant
            return false
          }
          
          return aiCompliant
        })(),
        issues: Array.isArray(aiResult.complianceStatus?.issues) 
          ? aiResult.complianceStatus.issues 
          : []
      },
      riskSummary: {
        riskExplanation,
        missingMeasures: missingMeasuresList,
        riskDrivers
      }
    }

    return riskResult
  } catch (error) {
    console.error('Error in AI risk assessment:', error)
    return null // Fallback to regular assessment
  }
}

// Helper function to analyze third country risk
function analyzeThirdCountryRisk(
  outsourcingCountries?: string,
  thirdCountryRiskNotes?: string
): boolean {
  if (!outsourcingCountries && !thirdCountryRiskNotes) {
    return false // Default: assume adequate protection if not specified
  }
  
  const text = `${outsourcingCountries || ''} ${thirdCountryRiskNotes || ''}`.toLowerCase()
  
  // Check for high-risk indicators
  const highRiskKeywords = ['hoch', 'high', 'risiko', 'risk', 'china', 'russland', 'russia', 'usa']
  const adequateKeywords = ['eu', 'ewr', 'uk', 'niedrig', 'low', 'adequate']
  
  // If explicit high-risk keywords found
  if (highRiskKeywords.some(keyword => text.includes(keyword))) {
    // But check if it's negated by adequate keywords
    if (!adequateKeywords.some(keyword => text.includes(keyword))) {
      return true
    }
  }
  
  // Check for explicit adequate protection indicators
  if (adequateKeywords.some(keyword => text.includes(keyword))) {
    return false
  }
  
  // Default: if third country transfer exists but no clear indication, assume medium risk (not high)
  return false
}

// Helper function to calculate severity from likelihood and impact
function calculateSeverity(likelihood: 'low' | 'medium' | 'high', impact: 'low' | 'medium' | 'high'): 'low' | 'medium' | 'high' {
  // Risk matrix: severity = likelihood × impact
  if (likelihood === 'high' && impact === 'high') return 'high'
  if (likelihood === 'high' && impact === 'medium') return 'high'
  if (likelihood === 'medium' && impact === 'high') return 'high'
  if (likelihood === 'high' && impact === 'low') return 'medium'
  if (likelihood === 'medium' && impact === 'medium') return 'medium'
  if (likelihood === 'low' && impact === 'high') return 'medium'
  if (likelihood === 'medium' && impact === 'low') return 'medium'
  if (likelihood === 'low' && impact === 'medium') return 'low'
  if (likelihood === 'low' && impact === 'low') return 'low'
  return 'medium' // Default fallback
}

export function calculateRiskAssessment(data: DSFAData, language: Language = 'de'): RiskResult {
  const risks: Risk[] = []
  const recommendations: Recommendation[] = []
  const t = translations[language]
  
  // Risk Assessment based on Art. 22 DSG criteria
  
  // 1. Sensitive Data Risk
  if (data.sensitiveData) {
    const likelihood = 'high'
    const impact = 'high'
    risks.push({
      id: 'risk-1',
      category: 'confidentiality',
      description: t.sensitiveDataDescription,
      likelihood,
      impact,
      severity: calculateSeverity(likelihood, impact),
      mitigation: [...t.sensitiveDataMitigation]
    })
    
    recommendations.push({
      id: 'rec-1',
      priority: 'high',
      title: t.sensitiveDataRecTitle,
      description: t.sensitiveDataRecDescription,
      legalBasis: 'Art. 22 Abs. 1 DSG'
    })
  }
  
  // 2. Large Scale Processing Risk
  if (data.largeScaleProcessing) {
    const likelihood = 'medium'
    const impact = 'high'
    risks.push({
      id: 'risk-2',
      category: 'transparency',
      description: t.largeScaleDescription,
      likelihood,
      impact,
      severity: calculateSeverity(likelihood, impact),
      mitigation: [...t.largeScaleMitigation]
    })
  }
  
  // 3. Automated Decision Making Risk
  if (data.automatedDecisionMaking) {
    const likelihood = 'medium'
    const impact = 'high'
    risks.push({
      id: 'risk-3',
      category: 'lawfulness',
      description: t.automatedDecisionDescription,
      likelihood,
      impact,
      severity: calculateSeverity(likelihood, impact),
      mitigation: [...t.automatedDecisionMitigation]
    })
    
    recommendations.push({
      id: 'rec-2',
      priority: 'high',
      title: t.automatedDecisionRecTitle,
      description: t.automatedDecisionRecDescription,
      legalBasis: 'Art. 21 DSG'
    })
  }
  
  // 4. Third Country Transfer Risk (Art. 16 DSG)
  if (data.thirdCountryTransfer) {
    // Analyze third country risk - higher likelihood for high-risk countries
    const hasHighRiskCountry = analyzeThirdCountryRisk(data.outsourcingCountries, data.thirdCountryRiskNotes)
    const likelihood = hasHighRiskCountry ? 'high' : 'medium'
    const impact = 'high'
    risks.push({
      id: 'risk-4',
      category: 'confidentiality',
      description: hasHighRiskCountry 
        ? `${t.thirdCountryDescription} (Hochrisikoland erkannt)`
        : t.thirdCountryDescription,
      likelihood,
      impact,
      severity: calculateSeverity(likelihood, impact),
      mitigation: hasHighRiskCountry 
        ? [
            ...t.thirdCountryMitigation,
            language === 'de' ? 'Zusätzliche technische Massnahmen erforderlich' : 'Additional technical measures required',
            language === 'de' ? 'Verschärfte Vertragsklauseln (Standardvertragsklauseln)' : 'Strengthened contractual clauses (SCC)',
            language === 'de' ? 'Regelmässige Überprüfung der Garantien' : 'Regular review of guarantees'
          ]
        : [...t.thirdCountryMitigation]
    })
    
    recommendations.push({
      id: 'rec-3',
      priority: 'high',
      title: t.thirdCountryRecTitle,
      description: t.thirdCountryRecDescription,
      legalBasis: 'Art. 16 DSG'
    })
  }
  
  // 5. Systematic Monitoring Risk
  if (data.systematicMonitoring) {
    const likelihood = 'high'
    const impact = 'medium'
    risks.push({
      id: 'risk-5',
      category: 'transparency',
      description: t.systematicMonitoringDescription,
      likelihood,
      impact,
      severity: calculateSeverity(likelihood, impact),
      mitigation: [...t.systematicMonitoringMitigation]
    })
  }
  
  // 6. Encryption Check - severity depends on context
  if (!data.encryption) {
    // Higher impact if sensitive data is processed
    const impact = data.sensitiveData ? 'high' : 'high'
    const likelihood = data.sensitiveData ? 'high' : 'medium'
    risks.push({
      id: 'risk-6',
      category: 'confidentiality',
      description: t.encryptionDescription,
      likelihood,
      impact,
      severity: calculateSeverity(likelihood, impact),
      mitigation: [...t.encryptionMitigation]
    })
    
    recommendations.push({
      id: 'rec-4',
      priority: 'medium',
      title: t.encryptionRecTitle,
      description: t.encryptionRecDescription,
      legalBasis: 'Art. 8 DSG'
    })
  }
  
  // 7. Access Controls Check - severity depends on context
  if (!data.accessControls) {
    // Higher impact if sensitive data or large scale processing
    const impact = (data.sensitiveData || data.largeScaleProcessing) ? 'high' : 'medium'
    const likelihood = 'medium'
    risks.push({
      id: 'risk-7',
      category: 'confidentiality',
      description: t.accessControlsDescription,
      likelihood,
      impact,
      severity: calculateSeverity(likelihood, impact),
      mitigation: [...t.accessControlsMitigation]
    })
  }
  
  // 8. Data Minimization Check
  if (!data.dataMinimization) {
    recommendations.push({
      id: 'rec-5',
      priority: 'medium',
      title: t.dataMinimizationRecTitle,
      description: t.dataMinimizationRecDescription,
      legalBasis: 'Art. 6 Abs. 3 DSG'
    })
  }
  
  // Calculate overall risk - improved logic with decision tracking
  const highSeverityRisks = risks.filter(r => r.severity === 'high').length
  const mediumSeverityRisks = risks.filter(r => r.severity === 'medium').length
  const totalRisks = risks.length
  
  // Count critical risk factors with details
  const criticalFactorDetails = [
    { name: language === 'de' ? 'Besonders schützenswerte Daten' : 'Special category data', value: data.sensitiveData },
    { name: language === 'de' ? 'Automatisierte Entscheidungsfindung' : 'Automated decision making', value: data.automatedDecisionMaking },
    { name: language === 'de' ? 'Drittstaaten-Übermittlung' : 'Third country transfer', value: data.thirdCountryTransfer },
    { name: language === 'de' ? 'Systematische Überwachung' : 'Systematic monitoring', value: data.systematicMonitoring },
    { name: language === 'de' ? 'Grossflächige Verarbeitung' : 'Large scale processing', value: data.largeScaleProcessing }
  ]
  const criticalFactors = criticalFactorDetails.filter(f => f.value).length
  
  // Check for missing critical security measures
  const missingMeasureDetails = [
    { name: language === 'de' ? 'Verschlüsselung' : 'Encryption', value: !data.encryption },
    { name: language === 'de' ? 'Zugriffskontrollen' : 'Access Controls', value: !data.accessControls }
  ]
  const missingCriticalMeasures = missingMeasureDetails.filter(m => m.value).length
  
  // Decision log for risk calculation
  const riskDecisionSteps: DecisionReason[] = []
  
  // Get specific high severity risks
  const highSeverityRiskList = risks.filter(r => r.severity === 'high')
  const highSeverityRiskNames = highSeverityRiskList.map(r => r.description).join(', ')
  
  riskDecisionSteps.push({
    factor: language === 'de' ? 'Risiken mit hohem Schweregrad' : 'High severity risks',
    value: highSeverityRisks.toString(),
    impact: language === 'de' 
      ? `${highSeverityRisks} Risiken: ${highSeverityRiskNames || (language === 'de' ? 'Keine' : 'None')}`
      : `${highSeverityRisks} risks: ${highSeverityRiskNames || 'None'}`,
    reasoning: language === 'de' 
      ? `Es wurden ${highSeverityRisks} Risiken mit hohem Schweregrad identifiziert: ${highSeverityRiskNames || 'Keine'}. Diese Risiken erfordern dringende Massnahmen.`
      : `${highSeverityRisks} risks with high severity were identified: ${highSeverityRiskNames || 'None'}. These risks require urgent measures.`
  })
  
  // Get specific medium severity risks
  const mediumSeverityRiskList = risks.filter(r => r.severity === 'medium')
  const mediumSeverityRiskNames = mediumSeverityRiskList.map(r => r.description).join(', ')
  
  riskDecisionSteps.push({
    factor: language === 'de' ? 'Risiken mit mittlerem Schweregrad' : 'Medium severity risks',
    value: mediumSeverityRisks.toString(),
    impact: language === 'de' 
      ? `${mediumSeverityRisks} Risiken: ${mediumSeverityRiskNames || (language === 'de' ? 'Keine' : 'None')}`
      : `${mediumSeverityRisks} risks: ${mediumSeverityRiskNames || 'None'}`,
    reasoning: language === 'de'
      ? `Es wurden ${mediumSeverityRisks} Risiken mit mittlerem Schweregrad identifiziert: ${mediumSeverityRiskNames || 'Keine'}. Diese Risiken sollten überwacht werden.`
      : `${mediumSeverityRisks} risks with medium severity were identified: ${mediumSeverityRiskNames || 'None'}. These risks should be monitored.`
  })
  riskDecisionSteps.push({
    factor: language === 'de' ? 'Kritische Risikofaktoren' : 'Critical risk factors',
    value: criticalFactors.toString(),
    impact: language === 'de' 
      ? `${criticalFactors} kritische Faktoren aktiv: ${criticalFactorDetails.filter(f => f.value).map(f => f.name).join(', ')}`
      : `${criticalFactors} critical factors active: ${criticalFactorDetails.filter(f => f.value).map(f => f.name).join(', ')}`,
    reasoning: language === 'de'
      ? `Die Anzahl kritischer Risikofaktoren erhöht das Gesamtrisiko.`
      : `The number of critical risk factors increases the overall risk.`
  })
  riskDecisionSteps.push({
    factor: language === 'de' ? 'Fehlende kritische Massnahmen' : 'Missing critical measures',
    value: missingCriticalMeasures.toString(),
    impact: language === 'de'
      ? `${missingCriticalMeasures} fehlend: ${missingMeasureDetails.filter(m => m.value).map(m => m.name).join(', ')}`
      : `${missingCriticalMeasures} missing: ${missingMeasureDetails.filter(m => m.value).map(m => m.name).join(', ')}`,
    reasoning: language === 'de'
      ? `Fehlende Schutzmassnahmen erhöhen das Risiko erheblich.`
      : `Missing security measures significantly increase the risk.`
  })
  
  let overallRisk: 'low' | 'medium' | 'high' = 'low'
  let riskReasoning = ''
  
  // High risk conditions with detailed reasoning
  if (highSeverityRisks >= 2) {
    overallRisk = 'high'
    const highRiskNames = highSeverityRiskList.map(r => r.description).join(', ')
    riskReasoning = language === 'de'
      ? `Hohes Gesamtrisiko: ${highSeverityRisks} Risiken mit hohem Schweregrad identifiziert (${highRiskNames}). Gemäss Art. 22 DSG erfordert dies eine umfassende DSFA und zusätzliche Massnahmen.`
      : `High overall risk: ${highSeverityRisks} risks with high severity identified (${highRiskNames}). According to Art. 22 DPA, this requires a comprehensive DPIA and additional measures.`
    riskDecisionSteps.push({
      factor: language === 'de' ? 'Entscheidung: Gesamtrisiko' : 'Decision: Overall Risk',
      value: 'high',
      impact: language === 'de' ? 'Hohes Risiko' : 'High Risk',
      reasoning: riskReasoning
    })
  } else if (highSeverityRisks >= 1 && (criticalFactors >= 3 || missingCriticalMeasures >= 2)) {
    overallRisk = 'high'
    const highRiskName = highSeverityRiskList[0]?.description || (language === 'de' ? 'Unbekannt' : 'Unknown')
    riskReasoning = language === 'de'
      ? `Hohes Gesamtrisiko: Risiko "${highRiskName}" mit hohem Schweregrad kombiniert mit ${criticalFactors >= 3 ? criticalFactors + ' kritischen Faktoren' : missingCriticalMeasures + ' fehlenden Massnahmen'} ergibt ein hohes Gesamtrisiko.`
      : `High overall risk: Risk "${highRiskName}" with high severity combined with ${criticalFactors >= 3 ? criticalFactors + ' critical factors' : missingCriticalMeasures + ' missing measures'} results in high overall risk.`
    riskDecisionSteps.push({
      factor: language === 'de' ? 'Entscheidung: Gesamtrisiko' : 'Decision: Overall Risk',
      value: 'high',
      impact: language === 'de' ? 'Hohes Risiko' : 'High Risk',
      reasoning: riskReasoning
    })
  } else if (highSeverityRisks >= 1) {
    // Single high risk = medium to high depending on context
    overallRisk = (criticalFactors >= 2 || missingCriticalMeasures >= 1) ? 'high' : 'medium'
    const highRiskName = highSeverityRiskList[0]?.description || (language === 'de' ? 'Unbekannt' : 'Unknown')
    if (overallRisk === 'high') {
      riskReasoning = language === 'de'
        ? `Hohes Gesamtrisiko: Risiko "${highRiskName}" mit hohem Schweregrad kombiniert mit ${criticalFactors >= 2 ? criticalFactors + ' kritischen Faktoren' : missingCriticalMeasures + ' fehlenden Massnahme(n)'} ergibt ein hohes Gesamtrisiko.`
        : `High overall risk: Risk "${highRiskName}" with high severity combined with ${criticalFactors >= 2 ? criticalFactors + ' critical factors' : missingCriticalMeasures + ' missing measure(s)'} results in high overall risk.`
    } else {
      riskReasoning = language === 'de'
        ? `Mittleres Gesamtrisiko: Risiko "${highRiskName}" mit hohem Schweregrad wurde identifiziert, aber kritische Faktoren und Massnahmen sind ausreichend.`
        : `Medium overall risk: Risk "${highRiskName}" with high severity was identified, but critical factors and measures are sufficient.`
    }
    riskDecisionSteps.push({
      factor: language === 'de' ? 'Entscheidung: Gesamtrisiko' : 'Decision: Overall Risk',
      value: overallRisk,
      impact: language === 'de' ? overallRisk === 'high' ? 'Hohes Risiko' : 'Mittleres Risiko' : overallRisk === 'high' ? 'High Risk' : 'Medium Risk',
      reasoning: riskReasoning
    })
  } else if (mediumSeverityRisks >= 4 && criticalFactors >= 2) {
    overallRisk = 'high'
    riskReasoning = language === 'de'
      ? `Hohes Gesamtrisiko: ${mediumSeverityRisks} Risiken mit mittlerem Schweregrad kombiniert mit ${criticalFactors} kritischen Faktoren ergeben ein hohes Gesamtrisiko.`
      : `High overall risk: ${mediumSeverityRisks} medium severity risks combined with ${criticalFactors} critical factors result in high overall risk.`
    riskDecisionSteps.push({
      factor: language === 'de' ? 'Entscheidung: Gesamtrisiko' : 'Decision: Overall Risk',
      value: 'high',
      impact: language === 'de' ? 'Hohes Risiko' : 'High Risk',
      reasoning: riskReasoning
    })
  } else if (mediumSeverityRisks >= 3 || highSeverityRisks >= 1) {
    overallRisk = 'medium'
    const riskDescription = highSeverityRisks >= 1 
      ? (language === 'de' ? `Risiko "${highSeverityRiskList[0]?.description || 'Unbekannt'}" mit hohem Schweregrad` : `Risk "${highSeverityRiskList[0]?.description || 'Unknown'}" with high severity`)
      : `${mediumSeverityRisks} ${language === 'de' ? 'Risiken mit mittlerem Schweregrad' : 'medium severity risks'}`
    riskReasoning = language === 'de'
      ? `Mittleres Gesamtrisiko: ${riskDescription} wurde(n) identifiziert.`
      : `Medium overall risk: ${riskDescription} ${highSeverityRisks >= 1 ? 'was' : 'were'} identified.`
    riskDecisionSteps.push({
      factor: language === 'de' ? 'Entscheidung: Gesamtrisiko' : 'Decision: Overall Risk',
      value: 'medium',
      impact: language === 'de' ? 'Mittleres Risiko' : 'Medium Risk',
      reasoning: riskReasoning
    })
  } else if (totalRisks >= 3 && criticalFactors >= 2) {
    overallRisk = 'medium'
    riskReasoning = language === 'de'
      ? `Mittleres Gesamtrisiko: ${totalRisks} Risiken insgesamt kombiniert mit ${criticalFactors} kritischen Faktoren ergeben ein mittleres Gesamtrisiko.`
      : `Medium overall risk: ${totalRisks} total risks combined with ${criticalFactors} critical factors result in medium overall risk.`
    riskDecisionSteps.push({
      factor: language === 'de' ? 'Entscheidung: Gesamtrisiko' : 'Decision: Overall Risk',
      value: 'medium',
      impact: language === 'de' ? 'Mittleres Risiko' : 'Medium Risk',
      reasoning: riskReasoning
    })
  } else {
    riskReasoning = language === 'de'
      ? `Niedriges Gesamtrisiko: Keine kritischen Risiken identifiziert. Standardmassnahmen sind ausreichend.`
      : `Low overall risk: No critical risks identified. Standard measures are sufficient.`
    riskDecisionSteps.push({
      factor: language === 'de' ? 'Entscheidung: Gesamtrisiko' : 'Decision: Overall Risk',
      value: 'low',
      impact: language === 'de' ? 'Niedriges Risiko' : 'Low Risk',
      reasoning: riskReasoning
    })
  }
  
  // Compliance check for Art. 22 DSG with decision tracking
  const complianceIssues: string[] = []
  const complianceChecks: DecisionReason[] = []
  let art22Compliant = true
  let complianceReasoning = ''
  
  // Critical compliance violations - always non-compliant
  if (data.sensitiveData && !data.encryption) {
    complianceIssues.push(t.complianceSensitiveData)
    art22Compliant = false
    complianceChecks.push({
      factor: language === 'de' ? 'Besonders schützenswerte Daten ohne Verschlüsselung' : 'Special category data without encryption',
      value: 'true',
      impact: language === 'de' ? 'Nicht konform' : 'Non-compliant',
      reasoning: language === 'de'
        ? 'Art. 22 DSG verlangt Verschlüsselung für besonders schützenswerte Daten. Ohne Verschlüsselung ist das Projekt nicht konform.'
        : 'Art. 22 DPA requires encryption for special category data. Without encryption, the project is not compliant.'
    })
  }
  
  // High overall risk should generally mean non-compliant
  // Art. 22 DSG requires DSFA when there is HIGH RISK
  // If risk is high, compliance means: risks are identified AND appropriate measures are planned/implemented
  if (overallRisk === 'high') {
    // Check if critical security measures are missing
    const missingCriticalMeasures = [
      !data.encryption,
      !data.accessControls
    ].filter(Boolean).length
    
    if (missingCriticalMeasures >= 1) {
      complianceIssues.push(
        language === 'de' 
          ? 'Hohes Risiko erkannt: Kritische Schutzmassnahmen fehlen. Projekt kann nicht starten ohne zusätzliche Massnahmen.'
          : 'High risk detected: Critical security measures missing. Project cannot start without additional measures.'
      )
      art22Compliant = false
      complianceReasoning = language === 'de'
        ? `Hohes Gesamtrisiko (${overallRisk}) kombiniert mit ${missingCriticalMeasures} fehlenden kritischen Massnahmen bedeutet, dass das Projekt nicht konform ist. Gemäss Art. 22 DSG müssen alle kritischen Massnahmen implementiert sein, bevor das Projekt starten kann.`
        : `High overall risk (${overallRisk}) combined with ${missingCriticalMeasures} missing critical measures means the project is not compliant. According to Art. 22 DPA, all critical measures must be implemented before the project can start.`
      complianceChecks.push({
        factor: language === 'de' ? 'Hohes Gesamtrisiko + fehlende Massnahmen' : 'High overall risk + missing measures',
        value: `${overallRisk} + ${missingCriticalMeasures} fehlend`,
        impact: language === 'de' ? 'Nicht konform' : 'Non-compliant',
        reasoning: complianceReasoning
      })
    } else {
      // High risk but measures are in place - still needs attention
      complianceIssues.push(
        language === 'de'
          ? 'Hohes Risiko erkannt: Trotz vorhandener Massnahmen besteht erhöhtes Risiko. Regelmässige Überprüfung erforderlich.'
          : 'High risk detected: Despite existing measures, elevated risk remains. Regular review required.'
      )
      art22Compliant = false // High risk = not fully compliant by default
      complianceReasoning = language === 'de'
        ? `Hohes Gesamtrisiko (${overallRisk}) bedeutet, dass das Projekt nicht vollständig konform ist, auch wenn Massnahmen vorhanden sind. Gemäss Art. 22 DSG erfordert hohes Risiko zusätzliche Massnahmen und regelmässige Überprüfung.`
        : `High overall risk (${overallRisk}) means the project is not fully compliant, even if measures are in place. According to Art. 22 DPA, high risk requires additional measures and regular review.`
      complianceChecks.push({
        factor: language === 'de' ? 'Hohes Gesamtrisiko trotz Massnahmen' : 'High overall risk despite measures',
        value: overallRisk,
        impact: language === 'de' ? 'Nicht konform' : 'Non-compliant',
        reasoning: complianceReasoning
      })
    }
  }
  
  // Medium risk with missing measures
  if (overallRisk === 'medium') {
    if (!data.encryption && data.sensitiveData) {
      complianceIssues.push(t.complianceSensitiveData)
      art22Compliant = false
      complianceChecks.push({
        factor: language === 'de' ? 'Mittleres Risiko + sensible Daten ohne Verschlüsselung' : 'Medium risk + sensitive data without encryption',
        value: 'true',
        impact: language === 'de' ? 'Nicht konform' : 'Non-compliant',
        reasoning: language === 'de'
          ? 'Auch bei mittlerem Risiko erfordern besonders schützenswerte Daten Verschlüsselung gemäss Art. 22 DSG.'
          : 'Even with medium risk, special category data requires encryption according to Art. 22 DPA.'
      })
    } else {
      complianceReasoning = language === 'de'
        ? `Mittleres Gesamtrisiko (${overallRisk}). Das Projekt ist grundsätzlich konform, wenn alle erforderlichen Massnahmen vorhanden sind.`
        : `Medium overall risk (${overallRisk}). The project is generally compliant if all required measures are in place.`
      complianceChecks.push({
        factor: language === 'de' ? 'Mittleres Gesamtrisiko' : 'Medium overall risk',
        value: overallRisk,
        impact: language === 'de' ? 'Konform (mit Massnahmen)' : 'Compliant (with measures)',
        reasoning: complianceReasoning
      })
    }
  }
  
  // Low risk
  if (overallRisk === 'low') {
    complianceReasoning = language === 'de'
      ? `Niedriges Gesamtrisiko (${overallRisk}). Das Projekt erfüllt die Anforderungen gemäss Art. 22 DSG.`
      : `Low overall risk (${overallRisk}). The project meets the requirements according to Art. 22 DPA.`
    complianceChecks.push({
      factor: language === 'de' ? 'Niedriges Gesamtrisiko' : 'Low overall risk',
      value: overallRisk,
      impact: language === 'de' ? 'Konform' : 'Compliant',
      reasoning: complianceReasoning
    })
  }
  
  // Additional compliance checks
  if (data.largeScaleProcessing && !data.dataMinimization) {
    complianceIssues.push(t.complianceLargeScale)
    complianceChecks.push({
      factor: language === 'de' ? 'Grossflächige Verarbeitung ohne Datensparsamkeit' : 'Large scale processing without data minimization',
      value: 'true',
      impact: language === 'de' ? 'Hinweis (nicht kritisch)' : 'Note (not critical)',
      reasoning: language === 'de'
        ? 'Bei grossflächiger Verarbeitung ist Datensparsamkeit besonders wichtig, aber nicht zwingend konformitätskritisch.'
        : 'Data minimization is especially important for large-scale processing, but not necessarily compliance-critical.'
    })
  }
  
  // Third country transfer to high-risk country without encryption
  if (data.thirdCountryTransfer) {
    const hasHighRiskCountry = analyzeThirdCountryRisk(data.outsourcingCountries, data.thirdCountryRiskNotes)
    if (hasHighRiskCountry && !data.encryption) {
      complianceIssues.push(
        language === 'de'
          ? 'Drittstaat-Übermittlung in Hochrisikoland erfordert Verschlüsselung'
          : 'Third-country transfer to high-risk country requires encryption'
      )
      art22Compliant = false
      complianceChecks.push({
        factor: language === 'de' ? 'Drittstaaten-Übermittlung in Hochrisikoland ohne Verschlüsselung' : 'Third-country transfer to high-risk country without encryption',
        value: 'true',
        impact: language === 'de' ? 'Nicht konform' : 'Non-compliant',
        reasoning: language === 'de'
          ? 'Gemäss Art. 16 DSG erfordert die Übermittlung in Hochrisikoländer zusätzliche Massnahmen, insbesondere Verschlüsselung.'
          : 'According to Art. 16 DPA, transfers to high-risk countries require additional measures, particularly encryption.'
      })
    }
  }
  
  if (data.automatedDecisionMaking && !data.profiling) {
    // This might need clarification - automated decision making without profiling info
  }
  
  // Final compliance reasoning
  if (!complianceReasoning && art22Compliant) {
    complianceReasoning = language === 'de'
      ? 'Das Projekt erfüllt alle Anforderungen gemäss Art. 22 DSG. Keine kritischen Compliance-Verstösse identifiziert.'
      : 'The project meets all requirements according to Art. 22 DPA. No critical compliance violations identified.'
  } else if (!complianceReasoning && !art22Compliant) {
    complianceReasoning = language === 'de'
      ? 'Das Projekt erfüllt nicht alle Anforderungen gemäss Art. 22 DSG. Zusätzliche Massnahmen sind erforderlich.'
      : 'The project does not meet all requirements according to Art. 22 DPA. Additional measures are required.'
  }
  
  // Generate risk summary with explanations
  const missingMeasuresList: RiskSummary['missingMeasures'] = []
  
  if (!data.encryption) {
    missingMeasuresList.push({
      measure: language === 'de' ? 'Verschlüsselung' : 'Encryption',
      impact: language === 'de' 
        ? 'Daten sind ungeschützt und können bei Verletzungen gelesen werden'
        : 'Data is unprotected and can be read in case of breaches',
      recommendation: language === 'de'
        ? 'Implementieren Sie Verschlüsselung für Daten in Ruhe (at rest) und während der Übertragung (in transit) gemäss Art. 8 DSG'
        : 'Implement encryption for data at rest and in transit according to Art. 8 DPA'
    })
  }
  
  if (!data.accessControls) {
    missingMeasuresList.push({
      measure: language === 'de' ? 'Zugriffskontrollen' : 'Access Controls',
      impact: language === 'de'
        ? 'Unbefugte Personen könnten auf Personendaten zugreifen'
        : 'Unauthorized persons could access personal data',
      recommendation: language === 'de'
        ? 'Implementieren Sie ein Berechtigungskonzept mit rollenbasierten Zugriffskontrollen und regelmässiger Überprüfung'
        : 'Implement an authorization concept with role-based access controls and regular review'
    })
  }
  
  if (!data.dataMinimization) {
    missingMeasuresList.push({
      measure: language === 'de' ? 'Datensparsamkeit' : 'Data Minimization',
      impact: language === 'de'
        ? 'Es werden möglicherweise mehr Daten verarbeitet als notwendig, was das Risiko erhöht'
        : 'More data may be processed than necessary, increasing risk',
      recommendation: language === 'de'
        ? 'Prüfen Sie, ob alle verarbeiteten Daten für den Zweck notwendig sind gemäss Art. 6 Abs. 3 DSG'
        : 'Review whether all processed data is necessary for the purpose according to Art. 6 para. 3 DPA'
    })
  }
  
  if (!data.pseudonymization && data.sensitiveData) {
    missingMeasuresList.push({
      measure: language === 'de' ? 'Pseudonymisierung' : 'Pseudonymization',
      impact: language === 'de'
        ? 'Besonders schützenswerte Daten sind direkt identifizierbar'
        : 'Special category data is directly identifiable',
      recommendation: language === 'de'
        ? 'Erwägen Sie Pseudonymisierung, wo möglich, um das Risiko zu reduzieren'
        : 'Consider pseudonymization where possible to reduce risk'
    })
  }
  
  // Risk drivers explanation
  const riskDrivers: string[] = []
  if (data.sensitiveData) {
    riskDrivers.push(language === 'de' 
      ? 'Verarbeitung besonders schützenswerter Personendaten erhöht das Risiko erheblich'
      : 'Processing special category personal data significantly increases risk')
  }
  if (data.thirdCountryTransfer) {
    const hasHighRisk = analyzeThirdCountryRisk(data.outsourcingCountries, data.thirdCountryRiskNotes)
    riskDrivers.push(language === 'de'
      ? `Drittstaaten-Übermittlung${hasHighRisk ? ' in Hochrisikoland' : ''} birgt erhöhte Risiken`
      : `Third-country transfer${hasHighRisk ? ' to high-risk country' : ''} poses increased risks`)
  }
  if (data.automatedDecisionMaking) {
    riskDrivers.push(language === 'de'
      ? 'Automatisierte Entscheidungsfindung kann zu Diskriminierung führen'
      : 'Automated decision making can lead to discrimination')
  }
  if (data.largeScaleProcessing) {
    riskDrivers.push(language === 'de'
      ? 'Grossflächige Verarbeitung betrifft viele Personen gleichzeitig'
      : 'Large-scale processing affects many persons simultaneously')
  }
  if (data.systematicMonitoring) {
    riskDrivers.push(language === 'de'
      ? 'Systematische Überwachung kann die Privatsphäre erheblich beeinträchtigen'
      : 'Systematic monitoring can significantly impact privacy')
  }
  
  // Generate risk explanation
  const riskExplanation = language === 'de'
    ? `Das Gesamtrisiko wurde als "${overallRisk === 'high' ? 'hoch' : overallRisk === 'medium' ? 'mittel' : 'niedrig'}" bewertet. ${riskDrivers.length > 0 ? `Hauptrisikotreiber sind: ${riskDrivers.join('; ')}. ` : ''}${risks.length > 0 ? `Es wurden ${risks.length} Risiken identifiziert, davon ${highSeverityRisks} mit hohem Schweregrad. ` : ''}${missingMeasuresList.length > 0 ? `Fehlende Schutzmassnahmen: ${missingMeasuresList.map(m => m.measure).join(', ')}. ` : ''}${overallRisk === 'high' ? 'Bei hohem Risiko müssen zusätzliche Massnahmen implementiert werden, bevor das Projekt starten kann.' : overallRisk === 'medium' ? 'Bei mittlerem Risiko werden zusätzliche Massnahmen empfohlen.' : 'Das Risikoniveau ist akzeptabel, Standardmassnahmen sind ausreichend.'}`
    : `The overall risk was assessed as "${overallRisk}". ${riskDrivers.length > 0 ? `Main risk drivers are: ${riskDrivers.join('; ')}. ` : ''}${risks.length > 0 ? `${risks.length} risks were identified, ${highSeverityRisks} with high severity. ` : ''}${missingMeasuresList.length > 0 ? `Missing security measures: ${missingMeasuresList.map(m => m.measure).join(', ')}. ` : ''}${overallRisk === 'high' ? 'With high risk, additional measures must be implemented before the project can start.' : overallRisk === 'medium' ? 'With medium risk, additional measures are recommended.' : 'The risk level is acceptable, standard measures are sufficient.'}`
  
  return {
    overallRisk,
    risks,
    recommendations: recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    }),
    complianceStatus: {
      art22: art22Compliant,
      issues: complianceIssues
    },
    riskSummary: {
      riskExplanation,
      missingMeasures: missingMeasuresList,
      riskDrivers
    },
    decisionLog: {
      riskCalculation: {
        highSeverityRisks,
        mediumSeverityRisks,
        totalRisks,
        criticalFactors,
        missingMeasures: missingCriticalMeasures,
        reasoning: riskReasoning,
        steps: riskDecisionSteps
      },
      complianceDecision: {
        reasoning: complianceReasoning,
        checks: complianceChecks
    }
  }
}
}
