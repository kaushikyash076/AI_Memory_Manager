'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export default function MemoriesPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [memories, setMemories] = useState([]);
  const [newMemoryContent, setNewMemoryContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchMemories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get('https://memento-e6sp.onrender.com/api/memories', config);
        setMemories(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))); // Sort newest first
      } catch (err) {
        setError('Failed to fetch memories.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemories();
  }, [user, router]);

const handleCreateMemory = async (e) => {
  e.preventDefault();
  if (!newMemoryContent.trim()) return;

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    console.log("1. Sending new memory to backend...");

    const { data } = await axios.post('https://memento-e6sp.onrender.com/api/memories', { content: newMemoryContent }, config);

    console.log("2. Received successful response from backend:", data);
    console.log("3. Current memories state (before update):", memories);

    setMemories([data, ...memories]);
    setNewMemoryContent('');

    console.log("4. State has been updated in the code.");

  } catch (err) {
    alert('Failed to create memory. Please try again.');
    console.error("API Error:", err); // Added a label here for clarity
  }
};

  if (!user) {
    return null; // or a loading spinner, since the redirect will happen
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-slate-50 mb-8">Your Memories</h1>
      
      {/* Create Memory Form Card */}
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="mb-8 p-6 bg-black/20 backdrop-blur-md rounded-xl border border-white/10">
          <form onSubmit={handleCreateMemory}>
            <h2 className="text-xl font-semibold text-slate-100 mb-4">Add a New Memory</h2>
            <textarea
              value={newMemoryContent}
              onChange={(e) => setNewMemoryContent(e.target.value)}
              className="w-full h-28 p-3 text-white bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="What happened today? The AI will summarize and index it for you..."
            ></textarea>
            <button
              type="submit"
              className="mt-4 px-6 py-2 font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all"
            >
              Commit to Memory
            </button>
          </form>
        </div>
      </motion.div>
      
      {/* Memory Feed */}
      <div>
        {isLoading ? (
          <p>Loading memories...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : (
          <AnimatePresence>
            {memories.length > 0 ? (
              memories.map((memory, index) => (
                <motion.div
                  key={memory._id}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-black/20 backdrop-blur-md border border-white/10 p-4 rounded-lg mb-4"
                >
                  <p className="text-slate-200 font-medium">{memory.summary}</p>
                  <p className="text-xs text-slate-500 mt-2">
                    {new Date(memory.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-slate-400 py-8">Your memory bank is empty. Add your first memory above!</p>
            )}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}