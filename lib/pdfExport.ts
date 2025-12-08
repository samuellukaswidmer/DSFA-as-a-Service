import jsPDF from 'jspdf'
import type { DSFAData, RiskResult } from './dsfa'

const baseTranslations = {
  de: {
    title: 'Datenschutz-Folgenabschätzung',
    subtitle: 'Gemäss Art. 22 DSG (Schweiz)',
    projectName: 'Projektname',
    responsiblePerson: 'Verantwortliche Person',
    contactEmail: 'E-Mail',
    overallRisk: 'Gesamtrisiko',
    risks: 'Identifizierte Risiken',
    recommendations: 'Empfehlungen',
    compliance: 'Compliance-Status',
    art22Compliant: 'Art. 22 DSG konform',
    art22NonCompliant: 'Art. 22 DSG nicht vollständig konform',
    category: 'Kategorie',
    likelihood: 'Wahrscheinlichkeit',
    impact: 'Auswirkung',
    severity: 'Schweregrad',
    mitigation: 'Massnahmen',
    priority: 'Priorität',
    legalBasis: 'Rechtsgrundlage',
    low: 'Niedrig',
    medium: 'Mittel',
    high: 'Hoch',
    date: 'Erstellt am',
    dataSharing: 'Datenweitergabe',
    thirdCountryTransfer: 'Drittstaaten-Transfer',
    processingPurpose: 'Verarbeitungszweck',
    dataMinimization: 'Datensparsamkeit',
    pseudonymization: 'Pseudonymisierung',
    sensitiveData: 'Besonders schützenswerte Personendaten',
    automatedDecisionMaking: 'Automatisierte Entscheidungsfindung',
    profiling: 'Profiling',
    largeScaleProcessing: 'Grossflächige Verarbeitung',
    systematicMonitoring: 'Systematische Überwachung',
    thirdCountryRisk: 'Risikobewertung Drittstaaten',
    outsourcing: 'Outsourcing-Länder',
    riskDrivers: 'Wie entsteht das Risiko?',
    securityObjectives: 'Schutzziele der IT-Sicherheit',
    art22Green: 'Grünes Licht nach Art. 22?',
    highRiskNext: 'Was tun bei hohem Risiko?',
    bigPicture: 'Gesamtbild',
    dataCategories: 'Datenkategorien',
    dataSubjects: 'Betroffene Personengruppen',
    dataRetention: 'Aufbewahrungsdauer',
    sharing: 'Datenweitergabe',
    thirdCountry: 'Drittstaaten-Transfer',
    yes: 'Ja',
    no: 'Nein',
    otherMeasures: 'Weitere Massnahmen',
    riskFactors: 'Risikofaktoren',
    outsourcingCountries: 'Outsourcing-Länder (Risiko)',
    thirdCountryDetails: 'Drittstaaten-Details',
    thirdCountryRiskNotes: 'Risikoeinstufung Drittstaaten',
    projectDescription: 'Projektbeschreibung',
    dataVolume: 'Datenvolumen',
    stakeholderConsultation: 'Stakeholder-Konsultation',
    previousAssessments: 'Vorherige Beurteilungen'
  },
  en: {
    title: 'Data Protection Impact Assessment',
    subtitle: 'According to Art. 22 DPA (Switzerland)',
    projectName: 'Project Name',
    responsiblePerson: 'Responsible Person',
    contactEmail: 'Email',
    overallRisk: 'Overall Risk',
    risks: 'Identified Risks',
    recommendations: 'Recommendations',
    compliance: 'Compliance Status',
    art22Compliant: 'Art. 22 DPA compliant',
    art22NonCompliant: 'Art. 22 DPA not fully compliant',
    category: 'Category',
    likelihood: 'Likelihood',
    impact: 'Impact',
    severity: 'Severity',
    mitigation: 'Mitigation Measures',
    priority: 'Priority',
    legalBasis: 'Legal Basis',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    date: 'Created on',
    dataSharing: 'Data Sharing',
    thirdCountryTransfer: 'Third-country Transfer',
    processingPurpose: 'Processing Purpose',
    dataMinimization: 'Data Minimization',
    pseudonymization: 'Pseudonymization',
    sensitiveData: 'Special Category Data',
    automatedDecisionMaking: 'Automated Decision Making',
    profiling: 'Profiling',
    largeScaleProcessing: 'Large Scale Processing',
    systematicMonitoring: 'Systematic Monitoring',
    thirdCountryRisk: 'Third-country risk rating',
    outsourcing: 'Outsourcing countries',
    riskDrivers: 'How does the risk arise?',
    securityObjectives: 'Security Objectives',
    art22Green: 'Green light under Art. 22?',
    highRiskNext: 'What if the risk is high?',
    bigPicture: 'Big Picture',
    dataCategories: 'Data Categories',
    dataSubjects: 'Data Subject Groups',
    dataRetention: 'Retention Period',
    sharing: 'Data Sharing',
    thirdCountry: 'Third-country transfer',
    yes: 'Yes',
    no: 'No',
    otherMeasures: 'Other measures',
    riskFactors: 'Risk factors',
    outsourcingCountries: 'Outsourcing countries (risk)',
    thirdCountryDetails: 'Third-country details',
    thirdCountryRiskNotes: 'Third-country risk rating',
    projectDescription: 'Project Description',
    dataVolume: 'Data Volume',
    stakeholderConsultation: 'Stakeholder Consultation',
    previousAssessments: 'Previous Assessments'
  }
}

export async function exportToPDF(data: DSFAData, result: RiskResult, language: 'de' | 'en'): Promise<void> {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  let yPosition = margin
  const lineHeight = 7
  const sectionSpacing = 10

  const translations = baseTranslations

  const t = translations[language]

  // Helper function to add new page if needed
  const checkNewPage = (requiredSpace: number) => {
    if (yPosition + requiredSpace > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage()
      yPosition = margin
    }
  }

  // Title
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text(t.title, margin, yPosition)
  yPosition += lineHeight

  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text(t.subtitle, margin, yPosition)
  yPosition += sectionSpacing

  // Date
  doc.setFontSize(10)
  doc.text(`${t.date}: ${new Date().toLocaleDateString(language === 'de' ? 'de-CH' : 'en-US')}`, margin, yPosition)
  yPosition += sectionSpacing * 2

  // Project Information
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(t.projectName, margin, yPosition)
  yPosition += lineHeight

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text(data.projectName, margin + 5, yPosition)
  yPosition += lineHeight

  doc.setFont('helvetica', 'bold')
  doc.text(t.responsiblePerson, margin, yPosition)
  yPosition += lineHeight
  doc.setFont('helvetica', 'normal')
  doc.text(data.responsiblePerson, margin + 5, yPosition)
  yPosition += lineHeight

  doc.setFont('helvetica', 'bold')
  doc.text(t.contactEmail, margin, yPosition)
  yPosition += lineHeight
  doc.setFont('helvetica', 'normal')
  doc.text(data.contactEmail, margin + 5, yPosition)
  yPosition += sectionSpacing * 2

  // Overall Risk
  checkNewPage(20)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(t.overallRisk, margin, yPosition)
  yPosition += lineHeight

  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  const riskText = t[result.overallRisk]
  doc.text(riskText, margin + 5, yPosition)
  yPosition += sectionSpacing * 2

  // Compliance Status
  checkNewPage(15)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(t.compliance, margin, yPosition)
  yPosition += lineHeight

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text(
    result.complianceStatus.art22 ? t.art22Compliant : t.art22NonCompliant,
    margin + 5,
    yPosition
  )
  yPosition += sectionSpacing * 2

  // Risks
  if (result.risks.length > 0) {
    checkNewPage(30)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text(t.risks, margin, yPosition)
    yPosition += lineHeight * 1.5

    result.risks.forEach((risk, index) => {
      checkNewPage(25)
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text(`${index + 1}. ${risk.description}`, margin, yPosition)
      yPosition += lineHeight

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.text(`${t.category}: ${risk.category}`, margin + 5, yPosition)
      yPosition += lineHeight
      doc.text(`${t.likelihood}: ${t[risk.likelihood]}`, margin + 5, yPosition)
      yPosition += lineHeight
      doc.text(`${t.impact}: ${t[risk.impact]}`, margin + 5, yPosition)
      yPosition += lineHeight
      doc.text(`${t.severity}: ${t[risk.severity]}`, margin + 5, yPosition)
      yPosition += lineHeight

      if (risk.mitigation.length > 0) {
        doc.text(t.mitigation + ':', margin + 5, yPosition)
        yPosition += lineHeight
        risk.mitigation.forEach((mit) => {
          checkNewPage(10)
          doc.text(`  • ${mit}`, margin + 10, yPosition)
          yPosition += lineHeight
        })
      }
      yPosition += sectionSpacing
    })
  }

  // Recommendations
  if (result.recommendations.length > 0) {
    checkNewPage(30)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text(t.recommendations, margin, yPosition)
    yPosition += lineHeight * 1.5

    result.recommendations.forEach((rec, index) => {
      checkNewPage(20)
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text(`${index + 1}. ${rec.title}`, margin, yPosition)
      yPosition += lineHeight

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      const splitText = doc.splitTextToSize(rec.description, pageWidth - 2 * margin - 10)
      doc.text(splitText, margin + 5, yPosition)
      yPosition += lineHeight * splitText.length

      if (rec.legalBasis) {
        doc.setFont('helvetica', 'italic')
        doc.text(`${t.legalBasis}: ${rec.legalBasis}`, margin + 5, yPosition)
        yPosition += lineHeight
      }
      yPosition += sectionSpacing
    })
  }

  // Save PDF
  const fileName = `DSFA_${data.projectName.replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(fileName)
}

export async function exportFullToPDF(data: DSFAData, result: RiskResult, language: 'de' | 'en'): Promise<void> {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  let y = margin
  const line = 7
  const section = 10

  const fullTranslations = {
    de: {
      title: 'DSFA Gesamtbericht',
      subtitle: 'Umfassender Export (Art. 22 DSG)',
      ...baseTranslations.de
    },
    en: {
      title: 'DPIA Full Report',
      subtitle: 'Comprehensive Export (Art. 22 DPA)',
      ...baseTranslations.en
    }
  }
  const t = fullTranslations[language]

  const checkPage = (need: number) => {
    if (y + need > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage()
      y = margin
    }
  }
  const addText = (text: string, size = 11, style: 'normal' | 'bold' = 'normal', indent = 0) => {
    doc.setFontSize(size)
    doc.setFont('helvetica', style)
    const wrapped = doc.splitTextToSize(text, pageWidth - 2 * margin - indent)
    wrapped.forEach((lineText) => {
      doc.text(lineText, margin + indent, y)
      y += line
    })
  }

  // Header
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text(t.title, margin, y)
  y += line
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text(t.subtitle, margin, y)
  y += section
  doc.text(`${t.date}: ${new Date().toLocaleDateString(language === 'de' ? 'de-CH' : 'en-US')}`, margin, y)
  y += section

  // Big picture
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text(t.bigPicture, margin, y)
  y += line
  addText(`${t.overallRisk}: ${t[result.overallRisk]}`, 12, 'bold', 2)
  const drivers = result.risks.slice(0, 3).map((r) => r.description).join('; ')
  addText(`${t.riskDrivers}: ${drivers || (language === 'de' ? 'Keine wesentlichen Treiber' : 'No major drivers')}`, 11, 'normal', 2)
  y += section

  // Project info
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(t.projectName, margin, y)
  y += line
  addText(`${t.projectDescription}: ${data.projectDescription}`, 11, 'normal', 2)
  addText(`${t.responsiblePerson}: ${data.responsiblePerson}`, 11, 'normal', 2)
  addText(`${t.contactEmail}: ${data.contactEmail}`, 11, 'normal', 2)
  addText(`${t.dataVolume}: ${t[data.dataVolume]}`, 11, 'normal', 2)
  addText(`${t.dataRetention}: ${data.dataRetention}`, 11, 'normal', 2)
  addText(`${t.processingPurpose}: ${data.processingPurpose}`, 11, 'normal', 2)
  addText(`${t.previousAssessments}: ${data.previousAssessments || '-'}`, 11, 'normal', 2)
  addText(`${t.stakeholderConsultation}: ${data.stakeholderConsultation || '-'}`, 11, 'normal', 2)
  y += section

  // Data categories and subjects
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text(t.dataCategories, margin, y)
  y += line
  addText(data.dataCategories.join(', ') || '-', 11, 'normal', 2)
  doc.text(t.dataSubjects, margin, y)
  y += line
  addText(data.dataSubjects.join(', ') || '-', 11, 'normal', 2)
  y += section

  // Sharing / third country
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text(t.sharing, margin, y)
  y += line
  addText(`${t.dataSharing}: ${data.dataSharing ? t.yes : t.no}`, 11, 'normal', 2)
  if (data.dataSharingDetails) addText(data.dataSharingDetails, 11, 'normal', 4)
  y += line
  doc.text(t.thirdCountry, margin, y)
  y += line
  addText(`${t.thirdCountry}: ${data.thirdCountryTransfer ? t.yes : t.no}`, 11, 'normal', 2)
  if (data.thirdCountryDetails) addText(`${t.thirdCountryDetails}: ${data.thirdCountryDetails}`, 11, 'normal', 4)
  if (data.thirdCountryRiskNotes) addText(`${t.thirdCountryRiskNotes}: ${data.thirdCountryRiskNotes}`, 11, 'normal', 4)
  if (data.outsourcingCountries) addText(`${t.outsourcingCountries}: ${data.outsourcingCountries}`, 11, 'normal', 4)
  y += section

  // Measures
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text(t.mitigation, margin, y)
  y += line
  const measures = [
    `${t.encryption}: ${data.encryption ? t.yes : t.no}`,
    `${t.accessControls}: ${data.accessControls ? t.yes : t.no}`,
    `${t.dataMinimization}: ${data.dataMinimization ? t.yes : t.no}`,
    `${t.pseudonymization}: ${data.pseudonymization ? t.yes : t.no}`
  ]
  measures.forEach((m) => addText(m, 11, 'normal', 2))
  if (data.otherMeasures) addText(`${t.otherMeasures}: ${data.otherMeasures}`, 11, 'normal', 2)
  y += section

  // Risk factors
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(t.riskFactors, margin, y)
  y += line
  const factors = [
    `${t.sensitiveData}: ${data.sensitiveData ? t.yes : t.no}`,
    `${t.automatedDecisionMaking}: ${data.automatedDecisionMaking ? t.yes : t.no}`,
    `${t.profiling}: ${data.profiling ? t.yes : t.no}`,
    `${t.largeScaleProcessing}: ${data.largeScaleProcessing ? t.yes : t.no}`,
    `${t.systematicMonitoring}: ${data.systematicMonitoring ? t.yes : t.no}`
  ]
  factors.forEach((f) => addText(f, 11, 'normal', 2))
  y += section

  // Risk summary
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(t.risks, margin, y)
  y += line
  result.risks.forEach((risk, index) => {
    checkPage(30)
    addText(`${index + 1}. ${risk.description}`, 11, 'bold', 2)
    addText(`${t.category}: ${risk.category}`, 10, 'normal', 4)
    addText(`${t.likelihood}: ${t[risk.likelihood]}`, 10, 'normal', 4)
    addText(`${t.impact}: ${t[risk.impact]}`, 10, 'normal', 4)
    addText(`${t.severity}: ${t[risk.severity]}`, 10, 'normal', 4)
    if (risk.mitigation.length) {
      risk.mitigation.forEach((m) => addText(`${t.mitigation}: ${m}`, 10, 'normal', 4))
    }
    y += line
  })

  // Recommendations
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(t.recommendations, margin, y)
  y += line
  result.recommendations.forEach((rec, index) => {
    checkPage(25)
    addText(`${index + 1}. ${rec.title}`, 11, 'bold', 2)
    addText(rec.description, 10, 'normal', 4)
  })
  y += section

  // Security objectives
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(t.securityObjectives, margin, y)
  y += line
  const catMap: Record<string, string> = {
    confidentiality: t.confidentiality,
    integrity: t.integrity,
    availability: t.availability,
    transparency: t.transparency,
    lawfulness: t.lawfulness
  }
  const categories = Array.from(new Set(result.risks.map((r) => r.category)))
  if (!categories.length) {
    addText(language === 'de' ? 'Keine Risiken identifiziert.' : 'No risks identified.', 11, 'normal', 2)
  } else {
    categories.forEach((c) => addText(`${catMap[c] || c}: ${language === 'de' ? 'betroffen' : 'impacted'}`, 11, 'normal', 2))
  }
  y += section

  // Compliance and high risk
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text(t.art22Green, margin, y)
  y += line
  addText(result.complianceStatus.art22 ? (language === 'de' ? 'Ja, konform.' : 'Yes, compliant.') : (language === 'de' ? 'Nein, nicht vollständig konform.' : 'No, not fully compliant.'), 11, 'normal', 2)
  if (result.complianceStatus.issues.length) {
    result.complianceStatus.issues.forEach((issue) => addText(issue, 10, 'normal', 4))
  }
  y += line
  doc.text(t.highRiskNext, margin, y)
  y += line
  if (result.overallRisk === 'high') {
    addText(language === 'de' ? 'Hohes Risiko: zusätzliche Massnahmen prüfen, ggf. Konsultation der Aufsicht, erneute DSFA.' : 'High risk: add safeguards, consider consulting authority, repeat DPIA.', 11, 'normal', 2)
  } else {
    addText(language === 'de' ? 'Kein hohes Risiko erkannt. Bei Änderungen erneut prüfen.' : 'No high risk detected. Re-evaluate if processing changes.', 11, 'normal', 2)
  }

  doc.save(`DSFA_full_${data.projectName.replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().split('T')[0]}.pdf`)
}
