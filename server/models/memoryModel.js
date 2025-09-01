const mongoose = require('mongoose');

const memorySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    content: {
      type: String,
      required: [true, 'Please add content to the memory'],
    },
    summary: {
      type: String,
    },
    textEmbedding: {
      type: [Number],
    },
    // Add the new field for storing extracted tasks
    tasks: {
      type: [String], // An array of strings
      default: [],   // Default to an empty array
    },
  },
  {
    timestamps: true,
  }
);

const Memory = mongoose.model('Memory', memorySchema);

module.exports = Memory;
