import { QueryParams } from '../types';

const TOGETHER_API_KEY = import.meta.env.VITE_TOGETHER_API_KEY || '';
const API_URL = 'https://api.together.xyz/v1/chat/completions';

async function callTogetherAI(messages: any[]): Promise<string> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOGETHER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        messages,
        temperature: 0.7,
        max_tokens: 2048
      })
    });

    if (!response.ok) {
      throw new Error('API request failed: ' + await response.text());
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Together AI API Error:', error);
    throw error;
  }
}

export async function generateResponse({ queryType, language, difficulty, query }: QueryParams): Promise<string> {
  const messages = [
    {
      role: "system",
      content: `You are an expert ${language} developer. Provide detailed, practical solutions with working code examples.`
    },
    {
      role: "user",
      content: `
Query Type: ${queryType}
Programming Language: ${language}
Difficulty: ${difficulty}
Question: ${query}

Please provide a detailed solution that includes:
1. Clear explanation of the approach
2. Working code examples with comments
3. Best practices for ${language}
4. Common pitfalls to avoid
${queryType === 'debugging' ? '5. Step-by-step debugging instructions' : ''}
${queryType === 'performance' ? '5. Specific optimization techniques' : ''}
${queryType === 'testing' ? '5. Testing strategy and framework recommendations' : ''}
`
    }
  ];

  try {
    const response = await callTogetherAI(messages);
    if (!response) {
      throw new Error('Empty response from API');
    }
    return response;
  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error('Failed to generate response. Please try again.');
  }
}

export async function generateSearchResponse(query: string): Promise<string> {
  const messages = [
    {
      role: "system",
      content: "You are an expert developer. Provide clear, practical solutions with code examples when relevant."
    },
    {
      role: "user",
      content: query
    }
  ];

  try {
    const response = await callTogetherAI(messages);
    if (!response) {
      throw new Error('Empty response from API');
    }
    return response;
  } catch (error) {
    console.error('Error generating search response:', error);
    throw new Error('Failed to generate response. Please try again.');
  }
}