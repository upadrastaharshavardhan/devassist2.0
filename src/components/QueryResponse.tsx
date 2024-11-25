import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface QueryResponseProps {
  response: string;
  isError?: boolean;
  isLoading?: boolean;
  isFallback?: boolean;
}

export default function QueryResponse({ response, isError, isLoading, isFallback }: QueryResponseProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse flex space-x-4 p-6 bg-white rounded-lg shadow">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-lg shadow ${
      isError ? 'bg-red-50' : isFallback ? 'bg-yellow-50' : 'bg-white'
    }`}>
      <div className="flex items-start">
        {isError ? (
          <XCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
        ) : isFallback ? (
          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
        ) : (
          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
        )}
        <div className="flex-1 prose max-w-none">
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}