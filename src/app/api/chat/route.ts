// filepath: src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Groq API Key - Đặt trong Vercel Environment Variables
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, model = 'llama-3.3-70b-versatile' } = body;

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured. Vui lòng thêm GROQ_API_KEY trong Vercel Environment Variables.' },
        { status: 500 }
      );
    }

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

    return NextResponse.json({ text: data.choices[0].message.content });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Groq API error', detail: errorMessage },
      { status: 500 }
    );
  }
}