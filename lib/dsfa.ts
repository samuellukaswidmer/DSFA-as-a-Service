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
  
  // Processing Characteristics
  processingPurpose: string
  legalBasis: string
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

export interface RiskResult {
  overallRisk: 'low' | 'medium' | 'high'
  risks: Risk[]
  recommendations: Recommendation[]
  complianceStatus: {
    art22: boolean
    issues: string[]
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

export function calculateRiskAssessment(data: DSFAData, language: Language = 'de'): RiskResult {
  const risks: Risk[] = []
  const recommendations: Recommendation[] = []
  const t = translations[language]
  
  // Risk Assessment based on Art. 22 DSG criteria
  
  // 1. Sensitive Data Risk
  if (data.sensitiveData) {
    risks.push({
      id: 'risk-1',
      category: 'confidentiality',
      description: t.sensitiveDataDescription,
      likelihood: 'high',
      impact: 'high',
      severity: 'high',
      mitigation: t.sensitiveDataMitigation
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
    risks.push({
      id: 'risk-2',
      category: 'transparency',
      description: t.largeScaleDescription,
      likelihood: 'medium',
      impact: 'high',
      severity: 'high',
      mitigation: t.largeScaleMitigation
    })
  }
  
  // 3. Automated Decision Making Risk
  if (data.automatedDecisionMaking) {
    risks.push({
      id: 'risk-3',
      category: 'lawfulness',
      description: t.automatedDecisionDescription,
      likelihood: 'medium',
      impact: 'high',
      severity: 'high',
      mitigation: t.automatedDecisionMitigation
    })
    
    recommendations.push({
      id: 'rec-2',
      priority: 'high',
      title: t.automatedDecisionRecTitle,
      description: t.automatedDecisionRecDescription,
      legalBasis: 'Art. 21 DSG'
    })
  }
  
  // 4. Third Country Transfer Risk
  if (data.thirdCountryTransfer) {
    risks.push({
      id: 'risk-4',
      category: 'confidentiality',
      description: t.thirdCountryDescription,
      likelihood: 'medium',
      impact: 'high',
      severity: 'high',
      mitigation: t.thirdCountryMitigation
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
    risks.push({
      id: 'risk-5',
      category: 'transparency',
      description: t.systematicMonitoringDescription,
      likelihood: 'high',
      impact: 'medium',
      severity: 'high',
      mitigation: t.systematicMonitoringMitigation
    })
  }
  
  // 6. Encryption Check
  if (!data.encryption) {
    risks.push({
      id: 'risk-6',
      category: 'confidentiality',
      description: t.encryptionDescription,
      likelihood: 'medium',
      impact: 'high',
      severity: 'medium',
      mitigation: t.encryptionMitigation
    })
    
    recommendations.push({
      id: 'rec-4',
      priority: 'medium',
      title: t.encryptionRecTitle,
      description: t.encryptionRecDescription,
      legalBasis: 'Art. 8 DSG'
    })
  }
  
  // 7. Access Controls Check
  if (!data.accessControls) {
    risks.push({
      id: 'risk-7',
      category: 'confidentiality',
      description: t.accessControlsDescription,
      likelihood: 'medium',
      impact: 'medium',
      severity: 'medium',
      mitigation: t.accessControlsMitigation
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
  
  // Calculate overall risk
  const highSeverityRisks = risks.filter(r => r.severity === 'high').length
  const mediumSeverityRisks = risks.filter(r => r.severity === 'medium').length
  
  let overallRisk: 'low' | 'medium' | 'high' = 'low'
  if (highSeverityRisks >= 2) {
    overallRisk = 'high'
  } else if (highSeverityRisks >= 1 || mediumSeverityRisks >= 3) {
    overallRisk = 'medium'
  }
  
  // Compliance check for Art. 22 DSG
  const complianceIssues: string[] = []
  let art22Compliant = true
  
  if (data.sensitiveData && !data.encryption) {
    complianceIssues.push(t.complianceSensitiveData)
    art22Compliant = false
  }
  
  if (data.largeScaleProcessing && !data.dataMinimization) {
    complianceIssues.push(t.complianceLargeScale)
  }
  
  if (data.automatedDecisionMaking && !data.profiling) {
    // This might need clarification
  }
  
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
    }
  }
}
