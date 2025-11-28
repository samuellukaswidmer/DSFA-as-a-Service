import jsPDF from 'jspdf'
import type { DSFAData, RiskResult } from './dsfa'

export async function exportToPDF(data: DSFAData, result: RiskResult, language: 'de' | 'en'): Promise<void> {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  let yPosition = margin
  const lineHeight = 7
  const sectionSpacing = 10

  const translations = {
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
    }
  }

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

