import express from 'express';
import cors from 'cors';
import itineraryRoutes from '../routes/itinerary.js'; // Adjusted path

// Debug logs for environment variables, useful for Vercel's runtime logs too
console.log('[server.js] Attempting to read GEMINI_API_KEY from process.env:', process.env.GEMINI_API_KEY ? 'Set (value hidden for security)' : 'Not Set or Empty');
console.log('[server.js] Attempting to read PORT from process.env:', process.env.PORT);
console.log('[server.js] FRONTEND_URL from process.env for CORS:', process.env.FRONTEND_URL);

const app = express();

// CORS Configuration
// When deploying, set FRONTEND_URL in your Vercel backend project's environment variables
// to the URL of your deployed frontend (e.g., https://your-frontend.vercel.app)
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true, // Important if you plan to handle cookies or authenticated sessions
};

if (process.env.FRONTEND_URL) {
  app.use(cors(corsOptions));
} else {
  // Fallback for local development if FRONTEND_URL is not set
  // This allows requests from any origin, which is fine for local dev but not recommended for production without a specific FRONTEND_URL
  console.warn("[server.js] FRONTEND_URL not set. Using permissive CORS for local development. Set FRONTEND_URL for production.");
  app.use(cors()); 
}

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
