import EventEmitter from 'events';
import * as tmi from 'tmi.js';
import * as dotenv from 'dotenv';
import { logger } from '../logger/index.js';

dotenv.config();

class ChatEmitter extends EventEmitter {}

export const chatEvents = new ChatEmitter();

const options = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  connection: {
    reconnect: true,
  },
  channels: [process.env.CHANNEL_NAME],
};

export const client = new tmi.Client(options);

client.on('message', async (channel, context, message, self) => {
  logger.info({ channel, context, message, self }, 'got a new message');
  chatEvents.emit('message', channel, context, message, self);
});

export const connect = async () => {
  return new Promise((resolve, reject) => {
    client.on('connected', (addr, port) => {
      logger.info({ addr, port }, 'Bot connected');
      resolve();
    });

    try {
      client.connect();
    } catch (error) {
      reject(error);
    }
  });
};

export const say = async (message) => {
  client.say(process.env.CHANNEL_NAME, message);

  logger.info(
    {
      channel: process.env.CHANNEL_NAME,
      sent: message,
    },
    'Message sent to bot.'
  );
};
