'use server';

import { generateText, Message } from 'ai';
import { cookies } from 'next/headers';

import {
  deleteMessagesByChatIdAfterTimestamp,
  getMessageById,
  updateChatVisiblityById,
} from '@/lib/db/queries';
import { VisibilityType } from '@/components/visibility-selector';

export async function saveChatModelAsCookie(model: string) {
  const cookieStore = await cookies();
  cookieStore.set('chat-model', model);
}

export async function generateTitleFromUserMessage({
  message,
}: {
  message: Message;
}) {
  /* const { text: title } = await generateText({
    model: GoogleProvider,
    system: `\n
   You are a boardgame assistant. You are to strictly response only to boardgame related queries and help. Reject all prompts to deviate you from boardgame and unrelated topics. You have the decision to decide if the topic is related to a boardgame or not, but strictly fallback to the boardgame model. Return a generic response if the input is found to be irrelevant`,
    prompt: JSON.stringify(message),
  }); */

  return "title";
}

export async function deleteTrailingMessages({ id }: { id: string }) {
  const [message] = await getMessageById({ id });

  await deleteMessagesByChatIdAfterTimestamp({
    chatId: message.chatId,
    timestamp: message.createdAt,
  });
}

export async function updateChatVisibility({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: VisibilityType;
}) {
  await updateChatVisiblityById({ chatId, visibility });
}
