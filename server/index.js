// Import libraries
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Import other modules
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const memoryRoutes = require('./routes/memoryRoutes');


// Connect to the database
connectDB();

// Create the Express application
const app = express();

// --- NEW DEBUGGING LOGGER ---
// This MUST be the very first middleware to run.
app.use((req, res, next) => {
  console.log(`=> Incoming Request: ${req.method} ${req.originalUrl}`);
  next();
});
// --- END OF LOGGER ---


// --- Explicit CORS Configuration ---
const corsOptions = {
  origin: 'https://memento-rouge.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};
app.use(cors(corsOptions));
// --- End of CORS Configuration ---


// Middleware to parse JSON bodies
app.use(express.json());


// Define the Port
const PORT = process.env.PORT || 3001;

// Define API routes
app.use('/api/users', userRoutes);
app.use('/api/memories', memoryRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running in development mode on port ${PORT}`);
});
