'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { DSFAData } from '@/lib/dsfa'
import { useLanguage } from './LanguageProvider'

interface DSFAFormProps {
  onSubmit: (data: DSFAData) => void
}

export function DSFAForm({ onSubmit }: DSFAFormProps) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<any>()
  const { language } = useLanguage()
  const [currentSection, setCurrentSection] = useState(1)
  const totalSections = 5

  const formData = watch() as any

  const onFormSubmit = (data: any) => {
    // Transform form data to match DSFAData interface
    const transformedData: DSFAData = {
      projectName: data.projectName,
      projectDescription: data.projectDescription,
      responsiblePerson: data.responsiblePerson,
      contactEmail: data.contactEmail,
      dataCategories: typeof data.dataCategories === 'string' 
        ? data.dataCategories.split(',').map((s: string) => s.trim())
        : data.dataCategories || [],
      dataSubjects: typeof data.dataSubjects === 'string'
        ? data.dataSubjects.split(',').map((s: string) => s.trim())
        : data.dataSubjects || [],
      dataVolume: data.dataVolume,
      dataRetention: data.dataRetention,
      outsourcingCountries: data.outsourcingCountries,
      thirdCountryRiskNotes: data.thirdCountryRiskNotes,
      processingPurpose: data.processingPurpose,
      dataSharing: data.dataSharing === 'true' || data.dataSharing === true,
      dataSharingDetails: data.dataSharingDetails,
      thirdCountryTransfer: data.thirdCountryTransfer === 'true' || data.thirdCountryTransfer === true,
      thirdCountryDetails: data.thirdCountryDetails,
      encryption: data.encryption || false,
      accessControls: data.accessControls || false,
      dataMinimization: data.dataMinimization || false,
      pseudonymization: data.pseudonymization || false,
      otherMeasures: data.otherMeasures,
      sensitiveData: data.sensitiveData || false,
      sensitiveDataDetails: data.sensitiveDataDetails,
      automatedDecisionMaking: data.automatedDecisionMaking || false,
      profiling: data.profiling || false,
      largeScaleProcessing: data.largeScaleProcessing || false,
      systematicMonitoring: data.systematicMonitoring || false,
      previousAssessments: data.previousAssessments,
      stakeholderConsultation: data.stakeholderConsultation,
    }
    onSubmit(transformedData)
  }

  const nextSection = () => {
    if (currentSection < totalSections) {
      setCurrentSection(currentSection + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const translations = {
    de: {
      section1: 'Grundinformationen',
      section2: 'Verarbeitungsdetails',
      section3: 'Verarbeitungsmerkmale',
      section4: 'Technische Massnahmen',
      section5: 'Risikofaktoren',
      projectName: 'Projektname',
      projectDescription: 'Projektbeschreibung',
      responsiblePerson: 'Verantwortliche Person',
      contactEmail: 'E-Mail',
      dataCategories: 'Datenkategorien',
      dataSubjects: 'Betroffene Personengruppen',
      dataVolume: 'Datenvolumen',
      dataRetention: 'Aufbewahrungsdauer',
      outsourcingCountries: 'Outsourcing-Länder (mit kurzer Risikoeinschätzung)',
      thirdCountryRiskNotes: 'Risikobewertung für Drittstaaten (Art. 16 DSG)',
      processingPurpose: 'Verarbeitungszweck',
      dataSharing: 'Datenweitergabe an Dritte',
      thirdCountryTransfer: 'Datenübermittlung in Drittstaaten',
      encryption: 'Verschlüsselung',
      accessControls: 'Zugriffskontrollen',
      dataMinimization: 'Datensparsamkeit',
      pseudonymization: 'Pseudonymisierung',
      sensitiveData: 'Besonders schützenswerte Personendaten',
      automatedDecisionMaking: 'Automatisierte Entscheidungsfindung',
      profiling: 'Profiling',
      largeScaleProcessing: 'Grossflächige Verarbeitung',
      systematicMonitoring: 'Systematische Überwachung',
      yes: 'Ja',
      no: 'Nein',
      low: 'Niedrig',
      medium: 'Mittel',
      high: 'Hoch',
      next: 'Weiter',
      previous: 'Zurück',
      submit: 'Risikobeurteilung erstellen',
      required: 'Pflichtfeld'
    },
    en: {
      section1: 'Basic Information',
      section2: 'Processing Details',
      section3: 'Processing Characteristics',
      section4: 'Technical Measures',
      section5: 'Risk Factors',
      projectName: 'Project Name',
      projectDescription: 'Project Description',
      responsiblePerson: 'Responsible Person',
      contactEmail: 'Email',
      dataCategories: 'Data Categories',
      dataSubjects: 'Data Subject Groups',
      dataVolume: 'Data Volume',
      dataRetention: 'Retention Period',
      outsourcingCountries: 'Outsourcing countries (with short risk note)',
      thirdCountryRiskNotes: 'Third-country risk assessment (Art. 16 DPA)',
      processingPurpose: 'Processing Purpose',
      dataSharing: 'Data Sharing with Third Parties',
      thirdCountryTransfer: 'Third Country Transfer',
      encryption: 'Encryption',
      accessControls: 'Access Controls',
      dataMinimization: 'Data Minimization',
      pseudonymization: 'Pseudonymization',
      sensitiveData: 'Special Category Data',
      automatedDecisionMaking: 'Automated Decision Making',
      profiling: 'Profiling',
      largeScaleProcessing: 'Large Scale Processing',
      systematicMonitoring: 'Systematic Monitoring',
      yes: 'Yes',
      no: 'No',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      next: 'Next',
      previous: 'Previous',
      submit: 'Create Risk Assessment',
      required: 'Required'
    }
  }

  const t = translations[language]

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4, 5].map((section) => (
            <div
              key={section}
              className={`flex-1 mx-1 h-2 rounded-full transition-colors ${
                section <= currentSection ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="text-center text-sm text-gray-600">
          {t[`section${currentSection}` as keyof typeof t] || ''} ({currentSection}/{totalSections})
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        {/* Section 1: Basic Information */}
        {currentSection === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.section1}</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.projectName} *
              </label>
              <input
                {...register('projectName', { required: true })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {errors.projectName && <p className="mt-1 text-sm text-red-600">{t.required}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.projectDescription} *
              </label>
              <textarea
                {...register('projectDescription', { required: true })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {errors.projectDescription && <p className="mt-1 text-sm text-red-600">{t.required}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.responsiblePerson} *
              </label>
              <input
                {...register('responsiblePerson', { required: true })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {errors.responsiblePerson && <p className="mt-1 text-sm text-red-600">{t.required}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.contactEmail} *
              </label>
              <input
                type="email"
                {...register('contactEmail', { required: true })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {errors.contactEmail && <p className="mt-1 text-sm text-red-600">{t.required}</p>}
            </div>
          </div>
        )}

        {/* Section 2: Processing Details */}
        {currentSection === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.section2}</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.dataCategories} *
              </label>
              <input
                {...register('dataCategories', { required: true })}
                placeholder={language === 'de' ? 'z.B. Name, Adresse, E-Mail' : 'e.g. Name, Address, Email'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.dataSubjects} *
              </label>
              <input
                {...register('dataSubjects', { required: true })}
                placeholder={language === 'de' ? 'z.B. Kunden, Mitarbeiter' : 'e.g. Customers, Employees'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.dataVolume} *
              </label>
              <select
                {...register('dataVolume', { required: true })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="low">{t.low}</option>
                <option value="medium">{t.medium}</option>
                <option value="high">{t.high}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.dataRetention} *
              </label>
              <input
                {...register('dataRetention', { required: true })}
                placeholder={language === 'de' ? 'z.B. 5 Jahre' : 'e.g. 5 years'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Section 3: Processing Characteristics */}
        {currentSection === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.section3}</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.processingPurpose} *
              </label>
              <textarea
                {...register('processingPurpose', { required: true })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.outsourcingCountries}
              </label>
              <input
                {...register('outsourcingCountries')}
                placeholder={language === 'de' ? 'z.B. EU (niedrig), USA (hoch)' : 'e.g. EU (low), US (high)'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.dataSharing}
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register('dataSharing')}
                    value="true"
                    className="mr-2"
                  />
                  {t.yes}
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register('dataSharing')}
                    value="false"
                    defaultChecked
                    className="mr-2"
                  />
                  {t.no}
                </label>
              </div>
              {(formData.dataSharing === 'true' || formData.dataSharing === true) && (
                <textarea
                  {...register('dataSharingDetails')}
                  rows={2}
                  placeholder={language === 'de' ? 'Details zur Datenweitergabe' : 'Details on data sharing'}
                  className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.thirdCountryTransfer}
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register('thirdCountryTransfer')}
                    value="true"
                    className="mr-2"
                  />
                  {t.yes}
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register('thirdCountryTransfer')}
                    value="false"
                    defaultChecked
                    className="mr-2"
                  />
                  {t.no}
                </label>
              </div>
              {(formData.thirdCountryTransfer === 'true' || formData.thirdCountryTransfer === true) && (
                <div className="space-y-2 mt-2">
                  <textarea
                    {...register('thirdCountryDetails')}
                    rows={2}
                    placeholder={language === 'de' ? 'Details zur Drittstaat-Übermittlung' : 'Details on third country transfer'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <textarea
                    {...register('thirdCountryRiskNotes')}
                    rows={2}
                    placeholder={language === 'de' ? 'Risikoeinstufung pro Land (z.B. EU: niedrig, USA: hoch)' : 'Risk per country (e.g., EU: low, US: high)'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 4: Technical Measures */}
        {currentSection === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.section4}</h2>
            
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('encryption')}
                  className="mr-3 w-5 h-5 text-primary-600"
                />
                <span className="text-gray-700">{t.encryption}</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('accessControls')}
                  className="mr-3 w-5 h-5 text-primary-600"
                />
                <span className="text-gray-700">{t.accessControls}</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('dataMinimization')}
                  className="mr-3 w-5 h-5 text-primary-600"
                />
                <span className="text-gray-700">{t.dataMinimization}</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('pseudonymization')}
                  className="mr-3 w-5 h-5 text-primary-600"
                />
                <span className="text-gray-700">{t.pseudonymization}</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'de' ? 'Weitere Massnahmen' : 'Other Measures'}
              </label>
              <textarea
                {...register('otherMeasures')}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Section 5: Risk Factors */}
        {currentSection === 5 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.section5}</h2>
            
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('sensitiveData')}
                  className="mr-3 w-5 h-5 text-primary-600"
                />
                <span className="text-gray-700">{t.sensitiveData}</span>
              </label>
              {formData.sensitiveData && (
                <textarea
                  {...register('sensitiveDataDetails')}
                  rows={2}
                  placeholder={language === 'de' ? 'Welche besonders schützenswerten Daten?' : 'Which special category data?'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              )}

              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('automatedDecisionMaking')}
                  className="mr-3 w-5 h-5 text-primary-600"
                />
                <span className="text-gray-700">{t.automatedDecisionMaking}</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('profiling')}
                  className="mr-3 w-5 h-5 text-primary-600"
                />
                <span className="text-gray-700">{t.profiling}</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('largeScaleProcessing')}
                  className="mr-3 w-5 h-5 text-primary-600"
                />
                <span className="text-gray-700">{t.largeScaleProcessing}</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('systematicMonitoring')}
                  className="mr-3 w-5 h-5 text-primary-600"
                />
                <span className="text-gray-700">{t.systematicMonitoring}</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevSection}
          disabled={currentSection === 1}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            currentSection === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {t.previous}
        </button>
        
        {currentSection < totalSections ? (
          <button
            type="button"
            onClick={nextSection}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            {t.next}
          </button>
        ) : (
          <button
            type="submit"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
          >
            {t.submit}
          </button>
        )}
      </div>
    </form>
  )
}
