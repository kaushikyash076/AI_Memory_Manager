'use client';

import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

export default function SearchPage() {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false); // To track if a search has been performed

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim() || !user?.token) return;

    setIsLoading(true);
    setSearched(true);
    setResults([]);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post('http://localhost:5000/api/memories/search', { query }, config);
      setResults(data);
    } catch (error) {
      console.error('Search failed', error);
      alert('Search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-text-primary">Memory Search</h1>
        <p className="text-text-secondary mt-2">Ask a question and let the AI find the most relevant memories for you.</p>
      </header>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8 flex items-center gap-4 bg-background-alt/50 backdrop-blur-lg p-4 rounded-2xl shadow-lg border border-border">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent text-text-primary placeholder-text-secondary focus:outline-none"
          placeholder="What was our decision on the Q3 budget?"
        />
        <button 
            type="submit" 
            className="p-2 text-white bg-primary rounded-full hover:bg-primary-hover transition-colors flex-shrink-0"
            disabled={isLoading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
      </form>

      {/* Search Results */}
      <div>
        {isLoading && <LoadingSpinner />}
        <AnimatePresence>
          {!isLoading && searched && results.length === 0 && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-text-secondary py-8 bg-background-alt/50 backdrop-blur-lg rounded-lg border border-border"
            >
              <p>No memories found matching your query.</p>
            </motion.div>
          )}

          {results.length > 0 && (
            <div className="space-y-4">
              {results.map((memory, index) => (
                <motion.div
                  key={memory._id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background-alt/50 backdrop-blur-lg border border-border p-6 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <p className="text-text-primary font-medium pr-4">{memory.summary}</p>
                    <p className="text-xs font-mono px-2 py-1 rounded bg-primary/20 text-primary flex-shrink-0">
                      Score: {memory.score.toFixed(4)}
                    </p>
                  </div>
                  <p className="text-sm text-text-secondary mt-2 border-l-2 border-border pl-4">{memory.content}</p>
                  <p className="text-xs text-text-secondary mt-4 text-right">
                    {new Date(memory.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
