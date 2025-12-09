import type { DSFAData, RiskResult } from './dsfa'

interface AISummaryParams {
  data: DSFAData
  result: RiskResult
  language: 'de' | 'en'
}

export async function generateAISummary({ data, result, language }: AISummaryParams): Promise<string> {
  // Try both environment variable names for flexibility
  const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY or NEXT_PUBLIC_OPENAI_API_KEY environment variable is not set')
  }

  const promptLanguage = language === 'de' ? 'German' : 'English'
  const userPrompt = `You are an expert in data protection risk assessments (Switzerland, Art. 22 DSG / DPA). Summarize the risk result and propose 2-3 concrete next actions. Keep it under 120 words, concise bullets. Respond in ${promptLanguage}.

Input data (short): ${JSON.stringify({
    projectName: data.projectName,
    processingPurpose: data.processingPurpose,
    sensitiveData: data.sensitiveData,
    largeScaleProcessing: data.largeScaleProcessing,
    automatedDecisionMaking: data.automatedDecisionMaking,
    thirdCountryTransfer: data.thirdCountryTransfer,
  })}

Risk result: ${JSON.stringify(result)}
`

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You generate concise, actionable DPIA/DSFA follow-up summaries. Be precise, avoid fluff, and never invent legal citations beyond what is provided.'
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      temperature: 0.4,
      max_tokens: 300
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`OpenAI API error: ${errorText}`)
  }

  const json = await response.json()
  const message = json.choices?.[0]?.message?.content
  if (!message) {
    throw new Error('No content returned from OpenAI API')
  }

  return message.trim()
}
