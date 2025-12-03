import { GOOGLE_GENERATIVE_AI_API_KEY } from 'astro:env/server';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

export const google = createGoogleGenerativeAI({
  apiKey: GOOGLE_GENERATIVE_AI_API_KEY,
});

export const defaultModel = google('gemini-2.0-flash-lite');
