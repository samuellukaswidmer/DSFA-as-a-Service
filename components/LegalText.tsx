'use client'

import { useState } from 'react'
import { useLanguage } from './LanguageProvider'

export function LegalText() {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()

  const translations = {
    de: {
      title: 'Art. 22 DSG - Datenschutz-Folgenabschätzung',
      showText: 'Rechtstext anzeigen',
      hideText: 'Rechtstext ausblenden',
      text: `1 Der Verantwortliche führt vor der Verarbeitung eine Datenschutz-Folgenabschätzung durch, wenn eine Verarbeitung voraussichtlich ein hohes Risiko für die Persönlichkeit oder die Grundrechte der betroffenen Person zur Folge hat.

2 Die Datenschutz-Folgenabschätzung enthält mindestens:
   a. eine systematische Beschreibung der geplanten Verarbeitung und ihrer Zwecke;
   b. eine Bewertung der Notwendigkeit und Verhältnismässigkeit der Verarbeitung im Verhältnis zum Zweck;
   c. eine Bewertung der Risiken für die Persönlichkeit oder die Grundrechte der betroffenen Person;
   d. die geplanten Massnahmen zur Behandlung der Risiken und zum Schutz der Personendaten.

3 Der Verantwortliche kann bei der Durchführung der Datenschutz-Folgenabschätzung die betroffenen Personen und andere interessierte Parteien konsultieren.

4 Der Verantwortliche dokumentiert die Datenschutz-Folgenabschätzung.`
    },
    en: {
      title: 'Art. 22 DPA - Data Protection Impact Assessment',
      showText: 'Show Legal Text',
      hideText: 'Hide Legal Text',
      text: `1 The controller shall carry out a data protection impact assessment prior to processing if a processing is likely to result in a high risk to the personality or fundamental rights of the data subject.

2 The data protection impact assessment shall contain at least:
   a. a systematic description of the planned processing and its purposes;
   b. an assessment of the necessity and proportionality of the processing in relation to the purpose;
   c. an assessment of the risks to the personality or fundamental rights of the data subject;
   d. the planned measures to address the risks and to protect the personal data.

3 The controller may consult the data subjects and other interested parties when carrying out the data protection impact assessment.

4 The controller shall document the data protection impact assessment.`
    }
  }

  const t = translations[language]

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-between"
      >
        <span>{t.title}</span>
        <span className="text-sm">{isOpen ? '▼' : '▶'}</span>
      </button>
      
      {isOpen && (
        <div className="mt-4 bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
          <h3 className="font-bold text-gray-900 mb-4">{t.title}</h3>
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono leading-relaxed">
            {t.text}
          </pre>
        </div>
      )}
    </div>
  )
}

