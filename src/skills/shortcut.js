import { say, chatEvents } from '../components/chatClient.js';
import { logger } from '../logger/index.js';
import { load } from '../services/configFiles.js';
import { isUserStreaming } from '../services/stream.js';

export const shortcuts = () => {
  try {
    const file = load('shortcuts');

    chatEvents.on('message', async (channel, user, message, self) => {
      if (user  === process.env.BOT_USERNAME) {
        return false;
      }

      const [shortcut] = file.filter(({ name }) => `!${name}` === message);

      if (shortcut) {
        const index = Math.floor(Math.random() * shortcut.messages.length);
        const messageToSay = shortcut.messages[index];

        if (shortcut.streaming) {
          const isStreaming = await isUserStreaming(shortcut.username);

          if (isStreaming) {
            return say(`${messageToSay}`, self);
          }
        } else {
          return say(`${messageToSay}`, self);
        }
      }
    });
  } catch (error) {
    logger.error(error, 'Error on shortcuts starts');
    throw error;
  }
};
