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

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY && !process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      console.error('OpenAI API key not configured')
      return NextResponse.json({ 
        error: 'OpenAI API key not configured. Please set OPENAI_API_KEY or NEXT_PUBLIC_OPENAI_API_KEY environment variable.' 
      }, { status: 500 })
    }

    const summary = await generateAISummary({ data, result, language: language || 'de' })

    return NextResponse.json({ summary })
  } catch (error: any) {
    console.error('AI route error:', error)
    const errorMessage = error.message || 'AI generation failed'
    // Don't expose internal error details to client, but log them
    return NextResponse.json({ 
      error: errorMessage.includes('API key') 
        ? 'OpenAI API key not configured. Please check your environment variables.'
        : 'AI summary generation failed. Please try again later.'
    }, { status: 500 })
  }
}
