import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { generateSearchResponse } from '../services/responseGenerator';
import QueryResponse from './QueryResponse';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await generateSearchResponse(query);
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full p-4 pl-10 text-sm text-gray-900 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Ask your programming question here..."
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="text-white absolute right-2.5 bottom-2.5 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {(response || error || isLoading) && (
        <div className="mt-8">
          <QueryResponse
            response={error || response}
            isError={!!error}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
}