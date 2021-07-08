import EventEmitter from 'events';
import { promises as fs } from 'fs';
import path from 'path';
import { RefreshableAuthProvider, StaticAuthProvider } from 'twitch-auth';
import { ChatClient } from 'twitch-chat-client';
import * as dotenv from 'dotenv';
import { logger } from '../logger/index.js';

dotenv.config();
class ChatEmitter extends EventEmitter {}
export const chatEvents = new ChatEmitter();

export let client = null;

const getClient = async () => {
  if (client && client.isConnected) return client;

  const tokenFilePath = path.join(process.cwd(), `config/tokens.json`);
  const tokenData = JSON.parse(await fs.readFile(tokenFilePath));

  const auth = new RefreshableAuthProvider(
    new StaticAuthProvider(process.env.CLIENT_ID, tokenData.accessToken),
    {
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: tokenData.refreshToken,
      expiry:
        tokenData.expiryTimestamp === null
          ? null
          : new Date(tokenData.expiryTimestamp),
      onRefresh: async ({ accessToken, refreshToken, expiryDate }) => {
        const newTokenData = {
          accessToken,
          refreshToken,
          expiryTimestamp: expiryDate === null ? null : expiryDate.getTime(),
        };
        await fs.writeFile(
          tokenFilePath,
          JSON.stringify(newTokenData, null, 4),
          'UTF-8'
        );
      },
    }
  );

  client = new ChatClient(auth, {
    channels: [process.env.CHANNEL_NAME],
  });
  
  client.onDisconnect((manually, reason) => {
    logger.warn({ manually, error }, 'Chat client disconnected.');
    client = null;
  });

  client.onConnect(() => {
    logger.info('Bot connected.')
  })

  logger.info('Try to connect to chat...');
  
  await client.connect();
  return client;
};

export const listening = async () => {
  logger.info('Setting up chat listening');

  const client = await getClient();

  client.onMessage((channel, user, message, self) => {
    logger.info({ channel, user, message, self }, 'got a new message');
    chatEvents.emit('message', channel, user, message, self);
  });
};

export const say = async (message) => {
  const client = await getClient();

  await client.say(process.env.CHANNEL_NAME, message);

  logger.info(
    {
      channel: process.env.CHANNEL_NAME,
      sent: message,
    },
    'Message sent to bot.'
  );
};
