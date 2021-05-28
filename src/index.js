import * as dotenv from 'dotenv';

dotenv.config();

import * as tmi from 'tmi.js';
import { logger } from './logger/index.js';

const client = new tmi.Client({
  connection: {
    reconnect: true,
  },
  channels: [process.env.CHANNEL_NAME],
});

client.connect();

client.on('message', async (channel, context, message) => {
  logger.info(
    {
      channel,
      user: context.username,
      message,
    },
    'Channel and user info'
  );
});
