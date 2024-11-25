import React, { useState } from 'react';
import { Code2, Bug, Zap, FileCode, Lock, Beaker } from 'lucide-react';
import { generateResponse } from '../services/responseGenerator';
import QueryResponse from './QueryResponse';

const LANGUAGES = [
  'JavaScript', 'Python', 'Java', 'C++', 'TypeScript', 'Go', 'Ruby', 'PHP'
];

const QUERY_TYPES = [
  { id: 'general', name: 'General Query', icon: Code2 },
  { id: 'debugging', name: 'Debugging', icon: Bug },
  { id: 'performance', name: 'Performance', icon: Zap },
  { id: 'testing', name: 'Testing', icon: Beaker },
  { id: 'security', name: 'Security', icon: Lock },
  { id: 'code', name: 'Code Review', icon: FileCode },
];

export default function QueryForm() {
  const [queryType, setQueryType] = useState('general');
  const [language, setLanguage] = useState('JavaScript');
  const [difficulty, setDifficulty] = useState('medium');
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setIsFallback(false);

    try {
      const result = await generateResponse({
        queryType,
        language,
        difficulty,
        query
      });
      setResponse(result);
      setIsFallback(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Query Type</label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {QUERY_TYPES.map(({ id, name, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setQueryType(id)}
                  className={`flex items-center p-3 rounded-lg border ${
                    queryType === id
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  <span className="text-sm">{name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Programming Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Difficulty Level</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Your Query</label>
          <div className="mt-1">
            <textarea
              rows={4}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              placeholder="Describe your programming question or paste your code here..."
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : 'Submit Query'}
          </button>
        </div>
      </form>

      {(response || error || isLoading) && (
        <div className="mt-8">
          <QueryResponse
            response={error || response}
            isError={!!error}
            isLoading={isLoading}
            isFallback={isFallback}
          />
        </div>
      )}
    </div>
  );
}