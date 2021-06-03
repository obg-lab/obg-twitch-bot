import { say, chatEvents } from '../components/chatClient.js';
import { logger } from '../logger/index.js';
import { load } from '../service/configFiles.js';
import { isUserStreaming } from '../service/stream.js';

export const shortcuts = () => {
  try {
    const file = load('shortcuts');

    chatEvents.on('message', async (channel, context, message, self) => {
      if (context['display-name'] === process.env.BOT_USERNAME) {
        return false;
      }

      const [shortcut] = file.filter(({ name }) => `!${name}` === message);

      if (shortcut) {
        const index = Math.floor(Math.random() * shortcut.messages.length);
        const messageToSay = shortcut.messages[index];

        if (shortcut.streaming) {
          const isStreaming = await isUserStreaming(shortcut.username);

          if (isStreaming) {
            return say(`@${context['display-name']} ${messageToSay}`);
          }
        } else {
          return say(`@${context['display-name']} ${messageToSay}`);
        }
      }
    });
  } catch (error) {
    logger.error(error, 'Error on shortcuts starts');
    throw error;
  }
};
