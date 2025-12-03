import { defaultModel } from '@/lib/ai';
import { GENESIS_SYSTEM_PROMPT } from '@/lib/prompts';
import {
  type ModelMessage,
  type UIMessage,
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
} from 'ai';

export const prerender = false;

const SYSTEM_PROMPT = GENESIS_SYSTEM_PROMPT;

export const POST = async ({
  request,
}: { request: Request }): Promise<Response> => {
  const body = await request.json();

  const messages: UIMessage[] = body.messages;

  const modelMessages: ModelMessage[] = convertToModelMessages(messages);

  const streamTextResult = streamText({
    model: defaultModel,
    messages: modelMessages,
    system: SYSTEM_PROMPT,
  });

  const stream = streamTextResult.toUIMessageStream();

  return createUIMessageStreamResponse({
    stream,
  });
};
