import { QueryParams } from '../types';

const TOGETHER_API_KEY = import.meta.env.VITE_TOGETHER_API_KEY || '';
const API_URL = 'https://api.together.xyz/inference';

async function callTogetherAI(prompt: string): Promise<string> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOGETHER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        prompt: `<s>[INST] You are an expert developer. Provide a detailed solution for the following query. Include code examples, explanations, and best practices where relevant. Format the response in markdown.

Query Type: ${prompt}

Respond with:
1. A clear explanation of the solution
2. Relevant code examples with comments
3. Best practices and potential pitfalls
4. Additional resources or tips if applicable [/INST]`,
        max_tokens: 2048,
        temperature: 0.7,
        top_p: 0.9,
        top_k: 50,
        repetition_penalty: 1.1,
        stop: ['</s>']
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'API request failed');
    }

    const data = await response.json();
    return data.output.choices[0].text.trim();
  } catch (error) {
    console.error('Together AI API Error:', error);
    throw error;
  }
}

export async function generateResponse(params: QueryParams): Promise<string> {
  const { queryType, language, difficulty, query } = params;

  const prompt = `
Programming Language: ${language}
Difficulty Level: ${difficulty}
Query Type: ${queryType}
Question: ${query}

Please provide a detailed solution specific to this ${language} ${queryType} query. Include:
- Explanation of the approach
- Code examples with comments
- Best practices specific to ${language}
- Common pitfalls to avoid
- Performance considerations
${queryType === 'debugging' ? '- Debugging steps and tips' : ''}
${queryType === 'performance' ? '- Optimization techniques' : ''}
${queryType === 'testing' ? '- Testing strategies and frameworks' : ''}
`;

  try {
    const response = await callTogetherAI(prompt);
    if (!response) {
      throw new Error('Empty response from API');
    }
    return response;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}