'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function EditMemoryModal({ memory, isOpen, onClose, onSave }) {
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    if (memory) {
      setEditedContent(memory.content);
    }
  }, [memory]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(memory._id, editedContent);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-background-alt w-full max-w-lg rounded-2xl shadow-2xl border border-border p-6"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h2 className="text-2xl font-bold text-text-primary mb-4">Edit Memory</h2>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full h-48 p-3 text-text-primary bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="mt-6 flex justify-end gap-4">
              <button onClick={onClose} className="px-4 py-2 text-text-secondary hover:bg-background rounded-md transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} className="px-6 py-2 font-bold text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors">
                Save Changes
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
