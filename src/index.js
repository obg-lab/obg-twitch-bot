import * as dotenv from 'dotenv';

dotenv.config();

import * as tmi from 'tmi.js';
import { logger } from './logger/index.js';

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

try {
  const client = new tmi.Client(options);
  
  client.on('message', async (channel, context, message, self) => {
    logger.info(
      {
        channel,
        user: context.username,
        message,
      },
      'Channel and user info'
    );

    switch (message) {
      case `!ola`:
        client.say(channel, `Hello World! @${context.username}`);
        break;
    
      default:
        break;
    }
  });

  client.on('connected', (addr, port) => {
    logger.info({ addr, port }, 'Bot connected');
  });

  client.connect();
} catch (error) {
  logger.error({ error }, 'Bot connection error');
}
