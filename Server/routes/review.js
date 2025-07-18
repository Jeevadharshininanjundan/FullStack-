import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', async (req, res) => {
  const { code } = req.body;
  if(!code){
    return res.status(400).json({ success: false, error: 'Code is required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
Please review the following code and give a short, simple explanation of what's good and what can be improved (in less than 5 bullet points). Avoid repeating the code or giving lengthy explanations.

Code:
${code}
`;

    const result = await model.generateContent(prompt);
    const review = result.response.text();

    res.json({ review });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ message: 'AI Review failed', error: error.message });
  }
});

export default router;
