const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Memory = require('../models/memoryModel');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Configure the Google AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @route   POST /api/memories
// @desc    Create a new memory
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content cannot be empty' });
    }

    // --- AI Processing Step ---
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // 1. Generate Embedding (as before)
    const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });
    const embeddingResult = await embeddingModel.embedContent(content);
    const textEmbedding = embeddingResult.embedding.values;

    // 2. Generate Summary (as before)
    const summaryPrompt = `Summarize the following memory content in one concise sentence: "${content}"`;
    const summaryResult = await model.generateContent(summaryPrompt);
    const summary = summaryResult.response.text();

    // 3. NEW: Extract Tasks
    let tasks = [];
    const taskExtractionPrompt = `
      Analyze the following text and identify any actionable tasks or to-do items. 
      Return the response as a JSON object with a single key "tasks", which should be an array of strings. 
      Each string in the array should be a clear, concise task. 
      If no tasks are found, return an empty array.
      Text: "${content}"
    `;
    
    try {
        const taskResult = await model.generateContent(taskExtractionPrompt);
        const taskResponseText = taskResult.response.text();
        // Clean the response to ensure it's valid JSON
        const cleanedJsonString = taskResponseText.replace(/```json|```/g, '').trim();
        const parsedResponse = JSON.parse(cleanedJsonString);
        if (parsedResponse && Array.isArray(parsedResponse.tasks)) {
            tasks = parsedResponse.tasks;
        }
    } catch (e) {
        console.error("Failed to parse tasks from AI response:", e);
        // If parsing fails, we default to an empty array so the app doesn't crash.
    }

    // --- End of AI Processing ---

    const memory = await Memory.create({
      content,
      summary,
      textEmbedding,
      tasks, // Save the extracted tasks
      user: req.user._id,
    });

    res.status(201).json(memory);
  } catch (error) {
    console.error('Error creating memory:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// --- Your other routes (GET / and POST /search) remain the same ---

// @route   GET /api/memories
// @desc    Get all memories for a user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const memories = await Memory.find({ user: req.user._id }).sort({ createdAt: -1 }).select('-textEmbedding');
    res.json(memories);
  } catch (error) {
    console.error('Error fetching memories:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/memories/search
// @desc    Search memories using semantic search
// @access  Private
router.post('/search', protect, async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ message: 'Search query cannot be empty' });
    }
    const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });
    const queryEmbeddingResult = await embeddingModel.embedContent(query);
    const queryEmbedding = queryEmbeddingResult.embedding.values;
    const results = await Memory.aggregate([
      {
        $vectorSearch: {
          index: 'vector_index',
          path: 'textEmbedding',
          queryVector: queryEmbedding,
          numCandidates: 100,
          limit: 5,
        },
      },
      {
        $match: { user: req.user._id }
      },
      {
        $project: {
          _id: 1, content: 1, summary: 1, createdAt: 1,
          score: { $meta: 'vectorSearchScore' }
        }
      }
    ]);
    res.json(results);
  } catch (error) {
    console.error('Error searching memories:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// --- NEW ROUTES FOR EDIT & DELETE ---

// @route   DELETE /api/memories/:id
// @desc    Delete a memory
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({ message: 'Memory not found' });
    }

    // Make sure the logged-in user owns the memory
    if (memory.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await memory.deleteOne();
    res.json({ message: 'Memory removed' });

  } catch (error) {
    console.error('Error deleting memory:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/memories/:id
// @desc    Update a memory
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        const { content } = req.body;
        const memory = await Memory.findById(req.params.id);

        if (!memory) {
            return res.status(404).json({ message: 'Memory not found' });
        }

        if (memory.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        // We only allow content to be updated for now.
        // In a real app, you might want to re-run the AI summarization here as well.
        memory.content = content || memory.content;
        
        const updatedMemory = await memory.save();
        res.json(updatedMemory);

    } catch (error) {
        console.error('Error updating memory:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
