// groq-proxy.cjs
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Thay bằng API key của bạn từ https://console.groq.com/
const GROQ_API_KEY = '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';

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model = 'llama-3.3-70b-versatile' } = req.body;
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.7
      })
    });
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    res.json({ text: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Groq API error', detail: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Groq proxy running at http://localhost:${PORT}`);
  console.log('⚠️ Đổi GROQ_API_KEY trong code trước khi dùng!');
});