import type { DSFAData, RiskResult } from './dsfa'

export interface SavedAssessment {
  id: string
  timestamp: string
  data: DSFAData
  result: RiskResult
}

const STORAGE_KEY = 'dsfa_assessments'

export function saveAssessment(data: DSFAData, result: RiskResult): string {
  const assessment: SavedAssessment = {
    id: `dsfa_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    data,
    result,
  }

  const existing = getSavedAssessments()
  existing.push(assessment)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
  
  return assessment.id
}

export function getSavedAssessments(): SavedAssessment[] {
  if (typeof window === 'undefined') return []
  
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return []
  
  try {
    return JSON.parse(stored) as SavedAssessment[]
  } catch {
    return []
  }
}

export function getAssessmentById(id: string): SavedAssessment | null {
  const assessments = getSavedAssessments()
  return assessments.find(a => a.id === id) || null
}

export function deleteAssessment(id: string): void {
  const assessments = getSavedAssessments()
  const filtered = assessments.filter(a => a.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

export function exportAssessmentToJSON(assessment: SavedAssessment): string {
  return JSON.stringify(assessment, null, 2)
}

export function importAssessmentFromJSON(json: string): SavedAssessment | null {
  try {
    const assessment = JSON.parse(json) as SavedAssessment
    // Validate structure
    if (assessment.data && assessment.result && assessment.timestamp) {
      return assessment
    }
    return null
  } catch {
    return null
  }
}

