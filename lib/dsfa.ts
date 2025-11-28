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

export function calculateRiskAssessment(data: DSFAData): RiskResult {
  const risks: Risk[] = []
  const recommendations: Recommendation[] = []
  
  // Risk Assessment based on Art. 22 DSG criteria
  
  // 1. Sensitive Data Risk
  if (data.sensitiveData) {
    risks.push({
      id: 'risk-1',
      category: 'confidentiality',
      description: 'Verarbeitung von besonders schützenswerten Personendaten',
      likelihood: 'high',
      impact: 'high',
      severity: 'high',
      mitigation: [
        'Strikte Zugriffskontrollen implementieren',
        'Verschlüsselung für Daten in Ruhe und Übertragung',
        'Pseudonymisierung wo möglich'
      ]
    })
    
    recommendations.push({
      id: 'rec-1',
      priority: 'high',
      title: 'Besonderer Schutz für sensible Daten',
      description: 'Aufgrund der Verarbeitung besonders schützenswerter Personendaten sind zusätzliche technische und organisatorische Massnahmen erforderlich.',
      legalBasis: 'Art. 22 Abs. 1 DSG'
    })
  }
  
  // 2. Large Scale Processing Risk
  if (data.largeScaleProcessing) {
    risks.push({
      id: 'risk-2',
      category: 'transparency',
      description: 'Grossflächige Verarbeitung von Personendaten',
      likelihood: 'medium',
      impact: 'high',
      severity: 'high',
      mitigation: [
        'Transparente Informationspflichten erfüllen',
        'Betroffenenrechte sicherstellen',
        'Regelmässige Überprüfung der Verarbeitung'
      ]
    })
  }
  
  // 3. Automated Decision Making Risk
  if (data.automatedDecisionMaking) {
    risks.push({
      id: 'risk-3',
      category: 'lawfulness',
      description: 'Automatisierte Entscheidungsfindung',
      likelihood: 'medium',
      impact: 'high',
      severity: 'high',
      mitigation: [
        'Menschliche Überprüfung sicherstellen',
        'Erklärbarkeit der Entscheidungen gewährleisten',
        'Widerspruchsrecht implementieren'
      ]
    })
    
    recommendations.push({
      id: 'rec-2',
      priority: 'high',
      title: 'Transparenz bei automatisierten Entscheidungen',
      description: 'Bei automatisierter Entscheidungsfindung müssen Betroffene informiert werden und ein Widerspruchsrecht haben.',
      legalBasis: 'Art. 21 DSG'
    })
  }
  
  // 4. Third Country Transfer Risk
  if (data.thirdCountryTransfer) {
    risks.push({
      id: 'risk-4',
      category: 'confidentiality',
      description: 'Datenübermittlung in Drittstaaten',
      likelihood: 'medium',
      impact: 'high',
      severity: 'high',
      mitigation: [
        'Angemessene Garantien sicherstellen (z.B. Standardvertragsklauseln)',
        'Risikobewertung für Drittstaat',
        'Dokumentation der Übermittlung'
      ]
    })
    
    recommendations.push({
      id: 'rec-3',
      priority: 'high',
      title: 'Drittstaat-Übermittlung prüfen',
      description: 'Datenübermittlungen in Drittstaaten erfordern angemessene Garantien gemäss Art. 16 DSG.',
      legalBasis: 'Art. 16 DSG'
    })
  }
  
  // 5. Systematic Monitoring Risk
  if (data.systematicMonitoring) {
    risks.push({
      id: 'risk-5',
      category: 'transparency',
      description: 'Systematische Überwachung',
      likelihood: 'high',
      impact: 'medium',
      severity: 'high',
      mitigation: [
        'Transparente Information der Betroffenen',
        'Datenschutz-Folgenabschätzung durchführen',
        'Regelmässige Überprüfung der Notwendigkeit'
      ]
    })
  }
  
  // 6. Encryption Check
  if (!data.encryption) {
    risks.push({
      id: 'risk-6',
      category: 'confidentiality',
      description: 'Fehlende Verschlüsselung',
      likelihood: 'medium',
      impact: 'high',
      severity: 'medium',
      mitigation: [
        'Verschlüsselung für Daten in Ruhe implementieren',
        'Verschlüsselung für Datenübertragung sicherstellen'
      ]
    })
    
    recommendations.push({
      id: 'rec-4',
      priority: 'medium',
      title: 'Verschlüsselung implementieren',
      description: 'Verschlüsselung ist eine wichtige technische Massnahme zum Schutz der Personendaten.',
      legalBasis: 'Art. 8 DSG'
    })
  }
  
  // 7. Access Controls Check
  if (!data.accessControls) {
    risks.push({
      id: 'risk-7',
      category: 'confidentiality',
      description: 'Fehlende Zugriffskontrollen',
      likelihood: 'medium',
      impact: 'medium',
      severity: 'medium',
      mitigation: [
        'Zugriffskontrollen implementieren',
        'Berechtigungskonzept erstellen',
        'Regelmässige Überprüfung der Berechtigungen'
      ]
    })
  }
  
  // 8. Data Minimization Check
  if (!data.dataMinimization) {
    recommendations.push({
      id: 'rec-5',
      priority: 'medium',
      title: 'Datensparsamkeit beachten',
      description: 'Es sollten nur die für den Zweck notwendigen Personendaten verarbeitet werden.',
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
    complianceIssues.push('Besonders schützenswerte Daten erfordern Verschlüsselung')
    art22Compliant = false
  }
  
  if (data.largeScaleProcessing && !data.dataMinimization) {
    complianceIssues.push('Bei grossflächiger Verarbeitung ist Datensparsamkeit besonders wichtig')
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

