import express from 'express';
import cors from 'cors';
import itineraryRoutes from '../routes/itinerary.js'; // Adjusted path

// Debug logs for environment variables, useful for Vercel's runtime logs too
console.log('[server.js] Attempting to read GEMINI_API_KEY from process.env:', process.env.GEMINI_API_KEY ? 'Set (value hidden for security)' : 'Not Set or Empty');
console.log('[server.js] Attempting to read PORT from process.env:', process.env.PORT);

const app = express();

// CORS Configuration
// Explicitly allow requests from your frontend's Vercel domain
app.use(cors({
  origin: true,
  credentials: true,
}));


app.use(express.json());

// All API routes are now prefixed with /api at the Express router level
app.use('/api', itineraryRoutes);

// A root endpoint for the backend function itself
app.get('/', (req, res) => {
  res.send('AI Travel Planner Backend is running on Vercel!');
});

// app.listen() is not needed for Vercel serverless functions
// Vercel handles the HTTP server and invokes the exported app

export default app;
