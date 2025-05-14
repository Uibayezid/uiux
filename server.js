import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Put your OpenAI API key here or in environment variable
});
const openai = new OpenAIApi(configuration);

app.post('/api/chat', async (req, res) => {
  try {
    const messages = req.body.messages;
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o-mini',
      messages: messages,
    });
    res.json(completion.data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));