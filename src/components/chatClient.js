import EventEmitter from 'events';
import { ChatClient } from '@twurple/chat';
import * as dotenv from 'dotenv';
import { logger } from '../logger/index.js';
import { getAuthProvider } from './auth.js';

dotenv.config();
class ChatEmitter extends EventEmitter {}
export const chatEvents = new ChatEmitter();

export let client = null;

const getClient = async () => {
  if (client && client.isConnected) return client;

  const authProvider = getAuthProvider();

  client = new ChatClient({
    authProvider,
    channels: [process.env.CHANNEL_NAME],
    logger: {
      minLevel: 'info',
      custom: logger.child({chatClient: '@twurple/chat'})
    },
    botLevel: 'verified',
  });

  client.onDisconnect((manually, reason) => {
    logger.warn({ manually, reason }, 'Chat client disconnected.');
    client = getClient();
  });

  client.onConnect(() => {
    logger.info('Bot connected.');
    chatEvents.emit('onConnect');
  });

  try {
    logger.info('Try to connect to chat...');

    await client.connect();

    logger.info({ isConnected: client.isConnected }, 'Chat client connected');

    return client;
  } catch (err) {
    logger.error({ err }, 'Error connecting to chat client');

    client = null;
  }
};

export const listening = async () => {
  logger.info('Setting up chat listening');

  const client = await getClient();

  client.onMessage(async (channel, user, message, self) => {
    logger.info({ channel, user, message, self }, 'got a new message');
    chatEvents.emit('message', channel, user, message, self);
  });

  return client;
};

export const say = async (message, replyTo = null) => {
  const client = await getClient();

  try {
    await client.say(process.env.CHANNEL_NAME, message, { replyTo });

    logger.info(
      {
        channel: process.env.CHANNEL_NAME,
        sent: message,
      },
      'Message sent to bot'
    );
  } catch (err) {
    logger.error({ err }, 'Error sending message to bot');
  }
};
