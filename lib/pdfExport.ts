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

  // Risk Summary
  if (result.riskSummary) {
    checkNewPage(40)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text(language === 'de' ? 'Risiko-Übersicht' : 'Risk Summary', margin, yPosition)
    yPosition += lineHeight * 1.5
    
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    const explanationLines = doc.splitTextToSize(result.riskSummary.riskExplanation, pageWidth - 2 * margin - 10)
    doc.text(explanationLines, margin, yPosition)
    yPosition += lineHeight * explanationLines.length + sectionSpacing
    
    if (result.riskSummary.missingMeasures.length > 0) {
      doc.setFont('helvetica', 'bold')
      doc.text(language === 'de' ? 'Fehlende Schutzmassnahmen:' : 'Missing Security Measures:', margin, yPosition)
      yPosition += lineHeight
      doc.setFont('helvetica', 'normal')
      result.riskSummary.missingMeasures.forEach((item) => {
        checkNewPage(20)
        doc.setFont('helvetica', 'bold')
        doc.text(`• ${item.measure}`, margin + 5, yPosition)
        yPosition += lineHeight
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(10)
        doc.text(`${language === 'de' ? 'Auswirkung' : 'Impact'}: ${item.impact}`, margin + 10, yPosition)
        yPosition += lineHeight
        const recLines = doc.splitTextToSize(`${language === 'de' ? 'Empfehlung' : 'Recommendation'}: ${item.recommendation}`, pageWidth - 2 * margin - 15)
        doc.text(recLines, margin + 10, yPosition)
        yPosition += lineHeight * recLines.length + sectionSpacing
      })
    }
    yPosition += sectionSpacing
  }

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

export async function exportFullToPDF(data: DSFAData, result: RiskResult, language: 'de' | 'en', aiSummary?: string | null): Promise<void> {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  let y = margin
  const line = 7
  const section = 12
  
  // Helper function to draw a simple horizontal line
  const drawLine = () => {
    doc.setDrawColor(220, 220, 220)
    doc.setLineWidth(0.3)
    doc.line(margin, y, pageWidth - margin, y)
    y += line
  }
  
  // Helper function to add section header
  const addSectionHeader = (text: string, size = 14) => {
    checkPage(20)
    y += section
    doc.setFontSize(size)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0, 0, 0)
    doc.text(text, margin, y)
    y += line * 1.5
    drawLine()
  }
  
  // Helper function to add subsection
  const addSubsection = (text: string, size = 11) => {
    checkPage(12)
    y += line * 0.8
    doc.setFontSize(size)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0, 0, 0)
    doc.text(text, margin, y)
    y += line * 1.2
  }

  const fullTranslations = {
    de: {
      ...baseTranslations.de,
      title: 'DSFA Gesamtbericht',
      subtitle: 'Umfassender Export (Art. 22 DSG)'
    },
    en: {
      ...baseTranslations.en,
      title: 'DPIA Full Report',
      subtitle: 'Comprehensive Export (Art. 22 DPA)'
    }
  }
  const t = fullTranslations[language] as typeof baseTranslations.de & { title: string; subtitle: string }

  const checkPage = (need: number) => {
    if (y + need > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage()
      y = margin
    }
  }
  const addText = (text: string, size = 10, style: 'normal' | 'bold' = 'normal', indent = 0) => {
    doc.setFontSize(size)
    doc.setFont('helvetica', style)
    doc.setTextColor(0, 0, 0)
    const wrapped = doc.splitTextToSize(text, pageWidth - 2 * margin - indent)
    wrapped.forEach((lineText: string) => {
      checkPage(line)
      doc.text(lineText, margin + indent, y)
      y += line
    })
  }
  
  // Helper function to add key-value pairs
  const addKeyValue = (key: string, value: string | boolean, indent = 0) => {
    checkPage(10)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0, 0, 0)
    doc.text(`${key}:`, margin + indent, y)
    const keyWidth = doc.getTextWidth(`${key}: `)
    doc.setFont('helvetica', 'normal')
    const wrapped = doc.splitTextToSize(String(value), pageWidth - 2 * margin - indent - keyWidth)
    wrapped.forEach((lineText: string, index: number) => {
      doc.text(lineText, margin + indent + keyWidth, y + index * line)
    })
    y += wrapped.length * line + line * 0.5
  }

  // Function to parse and render Markdown content in PDF
  const addMarkdownText = (markdown: string, baseSize = 11, indent = 0) => {
    const markdownLines = markdown.split('\n').map((l) => l.trim()).filter(Boolean)
    let inList = false

    markdownLines.forEach((markdownLine) => {
      // Headers (## or ###)
      if (markdownLine.startsWith('### ')) {
        if (inList) {
          y += line * 0.5
          inList = false
        }
        checkPage(15)
        doc.setFontSize(baseSize + 2)
        doc.setFont('helvetica', 'bold')
        const headerText = markdownLine.replace(/^###\s+/, '')
        const wrapped = doc.splitTextToSize(headerText, pageWidth - 2 * margin - indent)
        wrapped.forEach((text: string) => {
          checkPage(line)
          doc.text(text, margin + indent, y)
          y += line
        })
        y += line * 0.5
      } else if (markdownLine.startsWith('## ')) {
        if (inList) {
          y += line * 0.5
          inList = false
        }
        checkPage(18)
        doc.setFontSize(baseSize + 4)
        doc.setFont('helvetica', 'bold')
        const headerText = markdownLine.replace(/^##\s+/, '')
        const wrapped = doc.splitTextToSize(headerText, pageWidth - 2 * margin - indent)
        wrapped.forEach((text: string) => {
          checkPage(line)
          doc.text(text, margin + indent, y)
          y += line
        })
        y += line * 0.5
      }
      // Numbered lists
      else if (markdownLine.match(/^\d+\.\s+/)) {
        if (!inList) {
          y += line * 0.3
          inList = true
        }
        const listText = markdownLine.replace(/^\d+\.\s+/, '')
        checkPage(12)
        doc.setFontSize(baseSize)
        doc.setFont('helvetica', 'normal')
        
        // Handle bold text in list items
        const parts = listText.split(/(\*\*.*?\*\*)/g)
        let currentX = margin + indent + 8
        parts.forEach((part) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const boldText = part.replace(/\*\*/g, '')
            doc.setFont('helvetica', 'bold')
            const wrapped = doc.splitTextToSize(boldText, pageWidth - 2 * margin - indent - 8)
            wrapped.forEach((text: string) => {
              checkPage(line)
              doc.text(text, currentX, y)
              currentX = margin + indent + 8
              y += line
            })
            doc.setFont('helvetica', 'normal')
          } else if (part.trim()) {
            const wrapped = doc.splitTextToSize(part, pageWidth - 2 * margin - indent - 8)
            wrapped.forEach((text: string) => {
              checkPage(line)
              doc.text(text, currentX, y)
              currentX = margin + indent + 8
              y += line
            })
          }
        })
        y += line * 0.3
      }
      // Bullet lists
      else if (markdownLine.startsWith('- ') || markdownLine.startsWith('* ')) {
        if (!inList) {
          y += line * 0.3
          inList = true
        }
        const listText = markdownLine.replace(/^[-*]\s+/, '')
        checkPage(12)
        doc.setFontSize(baseSize)
        doc.setFont('helvetica', 'normal')
        
        // Draw bullet point
        doc.text('•', margin + indent, y)
        
        // Handle bold text in list items
        const parts = listText.split(/(\*\*.*?\*\*)/g)
        let currentX = margin + indent + 8
        parts.forEach((part) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const boldText = part.replace(/\*\*/g, '')
            doc.setFont('helvetica', 'bold')
            const wrapped = doc.splitTextToSize(boldText, pageWidth - 2 * margin - indent - 8)
            wrapped.forEach((text: string) => {
              checkPage(line)
              doc.text(text, currentX, y)
              currentX = margin + indent + 8
              y += line
            })
            doc.setFont('helvetica', 'normal')
          } else if (part.trim()) {
            const wrapped = doc.splitTextToSize(part, pageWidth - 2 * margin - indent - 8)
            wrapped.forEach((text: string) => {
              checkPage(line)
              doc.text(text, currentX, y)
              currentX = margin + indent + 8
              y += line
            })
          }
        })
        y += line * 0.3
      }
      // Regular paragraphs with bold support
      else {
        if (inList) {
          y += line * 0.5
          inList = false
        }
        checkPage(12)
        doc.setFontSize(baseSize)
        doc.setFont('helvetica', 'normal')
        
        // Handle bold text in paragraphs
        const parts = markdownLine.split(/(\*\*.*?\*\*)/g)
        let currentX = margin + indent
        parts.forEach((part) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const boldText = part.replace(/\*\*/g, '')
            doc.setFont('helvetica', 'bold')
            const wrapped = doc.splitTextToSize(boldText, pageWidth - 2 * margin - indent)
            wrapped.forEach((text: string, index: number) => {
              checkPage(line)
              if (index === 0) {
                doc.text(text, currentX, y)
              } else {
                doc.text(text, margin + indent, y)
              }
              y += line
            })
            currentX = margin + indent
            doc.setFont('helvetica', 'normal')
          } else if (part.trim()) {
            const wrapped = doc.splitTextToSize(part, pageWidth - 2 * margin - indent)
            wrapped.forEach((text: string, index: number) => {
              checkPage(line)
              if (index === 0 && currentX > margin + indent) {
                doc.text(text, currentX, y)
              } else {
                doc.text(text, margin + indent, y)
                currentX = margin + indent
              }
              y += line
            })
          }
        })
        y += line * 0.5
      }
    })
  }

  // Header
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0, 0, 0)
  doc.text(t.title, margin, y)
  y += line * 1.2
  
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(t.subtitle, margin, y)
  y += line
  
  doc.setFontSize(9)
  doc.setTextColor(100, 100, 100)
  doc.text(`${t.date}: ${new Date().toLocaleDateString(language === 'de' ? 'de-CH' : 'en-US')}`, margin, y)
  y += section
  drawLine()

  // Executive Summary
  addSectionHeader(language === 'de' ? 'Zusammenfassung' : 'Executive Summary')
  
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text(`${t.overallRisk}:`, margin, y)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0, 0, 0)
  doc.text(t[result.overallRisk], margin + doc.getTextWidth(`${t.overallRisk}: `), y)
  y += line * 1.5
  
  const drivers = result.risks.slice(0, 3).map((r) => r.description).join('; ')
  if (drivers) {
    addSubsection(t.riskDrivers)
    addText(drivers, 10, 'normal', 5)
  }

  // Project Information
  addSectionHeader(t.projectName, 14)
  
  addKeyValue(t.projectDescription, data.projectDescription)
  addKeyValue(t.responsiblePerson, data.responsiblePerson)
  addKeyValue(t.contactEmail, data.contactEmail)
  addKeyValue(t.dataVolume, t[data.dataVolume])
  addKeyValue(t.dataRetention, data.dataRetention)
  addKeyValue(t.processingPurpose, data.processingPurpose)
  if (data.previousAssessments) {
    addKeyValue(t.previousAssessments, data.previousAssessments)
  }
  if (data.stakeholderConsultation) {
    addKeyValue(t.stakeholderConsultation, data.stakeholderConsultation)
  }
  y += section

  // Data Categories and Subjects
  addSectionHeader(language === 'de' ? 'Datenverarbeitung' : 'Data Processing', 14)
  
  addSubsection(t.dataCategories, 11)
  addText(data.dataCategories.join(', ') || (language === 'de' ? 'Keine angegeben' : 'Not specified'), 10, 'normal', 5)
  
  addSubsection(t.dataSubjects, 11)
  addText(data.dataSubjects.join(', ') || (language === 'de' ? 'Keine angegeben' : 'Not specified'), 10, 'normal', 5)
  y += section

  // Data Sharing and Third Country Transfers
  addSectionHeader(language === 'de' ? 'Datenweitergabe und Drittstaaten' : 'Data Sharing and Third Countries', 14)
  
  addSubsection(t.dataSharing, 11)
  addKeyValue(t.dataSharing, data.dataSharing ? t.yes : t.no, 5)
  if (data.dataSharingDetails) {
    addText(data.dataSharingDetails, 10, 'normal', 10)
  }
  y += line * 0.5
  
  addSubsection(t.thirdCountry, 11)
  addKeyValue(t.thirdCountryTransfer, data.thirdCountryTransfer ? t.yes : t.no, 5)
  if (data.thirdCountryDetails) {
    addKeyValue(t.thirdCountryDetails, data.thirdCountryDetails, 5)
  }
  if (data.outsourcingCountries) {
    addKeyValue(t.outsourcingCountries, data.outsourcingCountries, 5)
  }
  if (data.thirdCountryRiskNotes) {
    addKeyValue(t.thirdCountryRiskNotes, data.thirdCountryRiskNotes, 5)
  }
  y += section

  // Security Measures
  addSectionHeader(t.mitigation, 14)
  const tAny = t as any
  addKeyValue(tAny.encryption, data.encryption ? t.yes : t.no)
  addKeyValue(tAny.accessControls, data.accessControls ? t.yes : t.no)
  addKeyValue(tAny.dataMinimization, data.dataMinimization ? t.yes : t.no)
  addKeyValue(tAny.pseudonymization, data.pseudonymization ? t.yes : t.no)
  if (data.otherMeasures) {
    addKeyValue(t.otherMeasures, data.otherMeasures)
  }
  y += section

  // Risk Factors
  addSectionHeader(t.riskFactors, 14)
  addKeyValue(t.sensitiveData, data.sensitiveData ? t.yes : t.no)
  addKeyValue(t.automatedDecisionMaking, data.automatedDecisionMaking ? t.yes : t.no)
  addKeyValue(t.profiling, data.profiling ? t.yes : t.no)
  addKeyValue(t.largeScaleProcessing, data.largeScaleProcessing ? t.yes : t.no)
  addKeyValue(t.systematicMonitoring, data.systematicMonitoring ? t.yes : t.no)
  y += section

  // Risk Summary Section
  if (result.riskSummary) {
    addSectionHeader(language === 'de' ? 'Risiko-Übersicht' : 'Risk Summary')
    addText(result.riskSummary.riskExplanation, 10, 'normal', 0)
    y += line * 0.5
    
    if (result.riskSummary.missingMeasures.length > 0) {
      addSubsection(language === 'de' ? 'Fehlende Schutzmassnahmen' : 'Missing Security Measures')
      result.riskSummary.missingMeasures.forEach((item) => {
        checkPage(25)
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        addText(`• ${item.measure}`, 10, 'bold', 5)
        doc.setFont('helvetica', 'normal')
        addText(`${language === 'de' ? 'Auswirkung' : 'Impact'}: ${item.impact}`, 9, 'normal', 10)
        addText(`${language === 'de' ? 'Empfehlung' : 'Recommendation'}: ${item.recommendation}`, 9, 'normal', 10)
        y += line * 0.5
      })
    }
  }

  // Identified Risks
  addSectionHeader(t.risks)
  result.risks.forEach((risk, index) => {
    checkPage(30)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    addText(`${index + 1}. ${risk.description}`, 10, 'bold', 0)
    doc.setFont('helvetica', 'normal')
    addKeyValue(t.category, risk.category, 5)
    addKeyValue(t.likelihood, t[risk.likelihood], 5)
    addKeyValue(t.impact, t[risk.impact], 5)
    addKeyValue(t.severity, t[risk.severity], 5)
    
    if (risk.mitigation.length) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.text(`${t.mitigation}:`, margin + 5, y)
      y += line * 0.8
      doc.setFont('helvetica', 'normal')
      risk.mitigation.forEach((m) => {
        addText(`  • ${m}`, 9, 'normal', 8)
      })
    }
    y += line * 0.5
  })

  // Recommendations
  addSectionHeader(t.recommendations)
  result.recommendations.forEach((rec, index) => {
    checkPage(25)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    addText(`${index + 1}. ${rec.title}`, 10, 'bold', 0)
    doc.setFont('helvetica', 'normal')
    addText(rec.description, 10, 'normal', 5)
    
    if (rec.legalBasis) {
      doc.setFont('helvetica', 'italic')
      doc.setFontSize(9)
      doc.setTextColor(100, 100, 100)
      addText(`${t.legalBasis}: ${rec.legalBasis}`, 9, 'normal', 5)
      doc.setTextColor(0, 0, 0)
    }
    y += line * 0.5
  })

  // Security Objectives
  addSectionHeader(t.securityObjectives, 14)
  const catMap: Record<string, string> = {
    confidentiality: tAny.confidentiality,
    integrity: tAny.integrity,
    availability: tAny.availability,
    transparency: tAny.transparency,
    lawfulness: tAny.lawfulness
  }
  const categories = Array.from(new Set(result.risks.map((r) => r.category)))
  if (!categories.length) {
    addText(language === 'de' ? 'Keine Risiken identifiziert.' : 'No risks identified.', 10, 'normal', 5)
  } else {
    categories.forEach((c) => {
      addKeyValue(catMap[c] || c, language === 'de' ? 'betroffen' : 'impacted')
    })
  }
  y += section

  // Compliance Status
  addSectionHeader(t.art22Green)
  const complianceText = result.complianceStatus.art22 
    ? (language === 'de' ? 'Ja, Art. 22 DSG konform.' : 'Yes, Art. 22 DPA compliant.')
    : (language === 'de' ? 'Nein, nicht vollständig konform.' : 'No, not fully compliant.')
  addText(complianceText, 10, 'normal', 0)
  
  if (result.complianceStatus.issues.length) {
    y += line * 0.5
    addSubsection(language === 'de' ? 'Hinweise' : 'Issues')
    result.complianceStatus.issues.forEach((issue) => {
      addText(`• ${issue}`, 9, 'normal', 5)
    })
  }
  
  // High Risk Handling
  addSectionHeader(t.highRiskNext)
  if (result.overallRisk === 'high') {
    addText(
      language === 'de' 
        ? 'Hohes Risiko erkannt: Zusätzliche Massnahmen müssen geprüft werden. Eine Konsultation der Aufsichtsbehörde sollte in Betracht gezogen werden. Eine erneute DSFA ist erforderlich.'
        : 'High risk detected: Additional measures must be reviewed. Consultation with the supervisory authority should be considered. A repeat DPIA is required.',
      10,
      'normal',
      0
    )
  } else {
    addText(
      language === 'de' 
        ? 'Kein hohes Risiko erkannt. Bei Änderungen der Verarbeitung sollte eine erneute Prüfung durchgeführt werden.'
        : 'No high risk detected. Re-evaluation should be conducted if processing changes.',
      10,
      'normal',
      0
    )
  }

  // AI Summary (if available)
  if (aiSummary) {
    addSectionHeader(language === 'de' ? 'KI-Zusammenfassung' : 'AI Summary')
    addMarkdownText(aiSummary, 10, 0)
  }
  
  // Footer
  const totalPages = doc.internal.pages.length - 1
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text(
      `${language === 'de' ? 'Seite' : 'Page'} ${i} ${language === 'de' ? 'von' : 'of'} ${totalPages}`,
      pageWidth - margin - 20,
      pageHeight - 10
    )
  }

  doc.save(`DSFA_full_${data.projectName.replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().split('T')[0]}.pdf`)
}
