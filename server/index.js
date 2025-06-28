import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.post('/api/summarize', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  try {
    // fetch command here
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            // Here I am defining what to do with the input text.
            contents: [{ parts: [{ text: `Summarise this: ${text}` }] }]
        })
      }
    );

    const data = await response.json();
    // this is the returned data.
    const summary = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No summary available.';
    res.json({ summary });
  } catch (err) {
    // in case of error
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
