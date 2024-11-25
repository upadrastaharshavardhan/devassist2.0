import React from 'react';
import { Code2, MessageSquareText, Zap } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Code2 className="h-8 w-8 text-indigo-600" />
            <div className="ml-2">
              <div className="text-xl font-bold text-gray-900">DevAssist</div>
              <div className="text-xs text-gray-600">by Harsha Upadrasta</div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition">Features</a>
            <a href="#tools" className="text-gray-600 hover:text-gray-900 transition">Tools</a>
            <a href="#get-started" className="text-gray-600 hover:text-gray-900 transition">Get Started</a>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
              Try Now
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}