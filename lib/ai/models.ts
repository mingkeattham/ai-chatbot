import { openai } from '@ai-sdk/openai';
import { createGoogleGenerativeAI, google, GoogleGenerativeAIProviderSettings} from '@ai-sdk/google';

import { config } from 'dotenv';
import { customProvider } from 'ai';
config({
  path: '.env.local',
});

export const DEFAULT_CHAT_MODEL: string = 'chat-model-small';

export const myProvider = customProvider({
  languageModels: {
    'chat-model-small': openai('gpt-4o-mini'),
    'chat-model-large': openai('gpt-4o'),
     /* 'chat-model-reasoning': wrapLanguageModel({
      model: fireworks('accounts/fireworks/models/deepseek-r1'),
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    }),  */
    'title-model': openai('gpt-4-turbo'),
    'artifact-model': openai('gpt-4o-mini'),
    'gemini' : createGoogleGenerativeAI({apiKey : process.env.GEMINI_API_KEY}).languageModel('gemini-2.0-flash-001'),
  },
  imageModels: {
    'small-model': openai.image('dall-e-2'),
    'large-model': openai.image('dall-e-3'),
  },
});


interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model-small',
    name: 'Small model',
    description: 'Small model for fast, lightweight tasks',
  },
  {
    id: 'chat-model-large',
    name: 'Large model',
    description: 'Large model for complex, multi-step tasks',
  },
  {
    id: 'chat-model-reasoning',
    name: 'Reasoning model',
    description: 'Uses advanced reasoning',
  },
  {
    id: 'gemini',
    name: 'Google Gemini 2.0',
    description: 'Uses Google Gemini 2.0',
  },
];
