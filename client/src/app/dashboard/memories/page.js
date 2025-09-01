'use client';

import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import EditMemoryModal from '../../../components/dashboard/EditMemoryModal'; // Import the new modal

export default function MemoriesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [memories, setMemories] = useState([]);
  const [newMemoryContent, setNewMemoryContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataVersion, setDataVersion] = useState(0);

  // State for the edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    const fetchMemories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('http://localhost:5000/api/memories', config);
        setMemories(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (err) {
        setError('Failed to fetch memories.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMemories();
  }, [user, router, dataVersion]);

  const handleCreateMemory = async (e) => {
    e.preventDefault();
    if (!newMemoryContent.trim()) return;
    try {
      const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` } };
      await axios.post('http://localhost:5000/api/memories', { content: newMemoryContent }, config);
      setNewMemoryContent('');
      setDataVersion(v => v + 1); // Re-fetch memories
    } catch (err) {
      alert('Failed to create memory.');
    }
  };

  const handleDeleteMemory = async (id) => {
    // A simple confirmation dialog
    if (window.confirm('Are you sure you want to delete this memory? This action cannot be undone.')) {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.delete(`http://localhost:5000/api/memories/${id}`, config);
            setDataVersion(v => v + 1); // Re-fetch memories
        } catch (err) {
            alert('Failed to delete memory.');
        }
    }
  };

  const handleOpenEditModal = (memory) => {
    setSelectedMemory(memory);
    setIsModalOpen(true);
  };

  const handleUpdateMemory = async (id, content) => {
    try {
        const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` } };
        await axios.put(`http://localhost:5000/api/memories/${id}`, { content }, config);
        setIsModalOpen(false);
        setDataVersion(v => v + 1); // Re-fetch memories
    } catch (err) {
        alert('Failed to update memory.');
    }
  };

  if (!user) return null;

  return (
    <>
      <EditMemoryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        memory={selectedMemory}
        onSave={handleUpdateMemory}
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary">Memory Bank</h1>
          <p className="text-text-secondary mt-2">Browse, manage, and create new memories. Your AI assistant will handle the rest.</p>
        </header>
        
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <form onSubmit={handleCreateMemory} className="mb-8 flex items-center gap-4 bg-background-alt/50 backdrop-blur-lg p-4 rounded-2xl shadow-lg border border-border">
              <input
                type="text"
                value={newMemoryContent}
                onChange={(e) => setNewMemoryContent(e.target.value)}
                className="w-full bg-transparent text-text-primary placeholder-text-secondary focus:outline-none"
                placeholder="Add a new memory..."
              />
              <button type="submit" className="p-2 text-white bg-primary rounded-full hover:bg-primary-hover transition-colors flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
              </button>
            </form>
        </motion.div>
        
        <div>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Chronological Feed</h2>
          {isLoading ? <LoadingSpinner /> : error ? <p className="text-red-400">{error}</p> : (
            <AnimatePresence>
              {memories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {memories.map((memory, index) => (
                    <motion.div
                      key={memory._id}
                      layout
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="bg-background-alt/50 backdrop-blur-lg border border-border p-6 rounded-lg flex flex-col justify-between"
                    >
                      <div>
                          <p className="text-text-primary font-medium mb-4">{memory.summary}</p>
                          {memory.tasks && memory.tasks.length > 0 && (
                            <div className="mb-4">
                                <h4 className="text-sm font-semibold text-primary mb-2">Action Items:</h4>
                                <ul className="space-y-2">
                                    {memory.tasks.map((task, taskIndex) => (
                                        <li key={taskIndex} className="flex items-start gap-3 text-text-secondary text-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" /></svg>
                                            <span>{task}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                          )}
                      </div>
                      <div className="flex justify-between items-center mt-4">
                          <p className="text-xs text-text-secondary">{new Date(memory.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                          <div className="flex gap-2">
                              <button onClick={() => handleOpenEditModal(memory)} className="text-text-secondary hover:text-primary transition-colors">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
                              </button>
                              <button onClick={() => handleDeleteMemory(memory._id)} className="text-text-secondary hover:text-red-500 transition-colors">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                              </button>
                          </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-text-secondary py-8 bg-background-alt/50 backdrop-blur-lg rounded-lg border border-border">
                  <p>Your memory bank is empty.</p>
                  <p>Add your first memory above to get started!</p>
                </div>
              )}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </>
  );
}
