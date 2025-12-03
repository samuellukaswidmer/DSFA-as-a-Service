import { NextResponse } from 'next/server'
import { generateAISummary } from '@/lib/ai'
import type { DSFAData, RiskResult } from '@/lib/dsfa'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { data, result, language } = body as {
      data: DSFAData
      result: RiskResult
      language: 'de' | 'en'
    }

    if (!data || !result) {
      return NextResponse.json({ error: 'Missing payload' }, { status: 400 })
    }

    const summary = await generateAISummary({ data, result, language: language || 'de' })

    return NextResponse.json({ summary })
  } catch (error: any) {
    console.error('AI route error:', error)
    return NextResponse.json({ error: error.message || 'AI generation failed' }, { status: 500 })
  }
}
