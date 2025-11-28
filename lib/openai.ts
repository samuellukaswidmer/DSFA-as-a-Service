// OpenAI API Integration for enhanced recommendations

export interface AIRecommendation {
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  reasoning: string
}

export async function getAIRecommendations(
  data: any,
  existingRisks: any[],
  apiKey?: string
): Promise<AIRecommendation[]> {
  // Only call API if key is provided
  if (!apiKey || !process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
    return []
  }

  const key = apiKey || process.env.NEXT_PUBLIC_OPENAI_API_KEY

  try {
    const prompt = `Du bist ein Datenschutzexperte für schweizerisches Recht (DSG). 
Analysiere die folgende Datenschutz-Folgenabschätzung und gib zusätzliche, spezifische Empfehlungen.

Projekt: ${data.projectName}
Beschreibung: ${data.projectDescription}
Besonders schützenswerte Daten: ${data.sensitiveData ? 'Ja' : 'Nein'}
Automatisierte Entscheidungsfindung: ${data.automatedDecisionMaking ? 'Ja' : 'Nein'}
Drittstaat-Übermittlung: ${data.thirdCountryTransfer ? 'Ja' : 'Nein'}

Bereits identifizierte Risiken: ${existingRisks.length}

Gib 2-3 zusätzliche, spezifische Empfehlungen im JSON-Format:
[
  {
    "title": "Kurzer Titel",
    "description": "Detaillierte Beschreibung",
    "priority": "high|medium|low",
    "reasoning": "Begründung basierend auf DSG"
  }
]`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Du bist ein Experte für schweizerisches Datenschutzrecht (DSG). Antworte nur mit gültigem JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      console.error('OpenAI API error:', response.statusText)
      return []
    }

    const result = await response.json()
    const content = result.choices[0]?.message?.content

    if (!content) {
      return []
    }

    // Try to extract JSON from response
    const jsonMatch = content.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      const recommendations = JSON.parse(jsonMatch[0]) as AIRecommendation[]
      return recommendations
    }

    return []
  } catch (error) {
    console.error('Error fetching AI recommendations:', error)
    return []
  }
}

