import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import SearchBar from './components/SearchBar';
import QueryForm from './components/QueryForm';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
        <Hero />
        <div className="py-12 bg-gray-50">
          <SearchBar />
        </div>
        <QueryForm />
        <Features />
      </main>
    </div>
  );
}

export default App;