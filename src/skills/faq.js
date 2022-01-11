import { say, chatEvents } from '../components/chatClient.js';
import { logger } from '../logger/index.js';
import { load } from '../services/configFiles.js';
import { isUserStreaming } from '../services/stream.js';

export const faq = () => {
  try {
    const file = load('faq');

    chatEvents.on('message', async (channel, user, message, self) => {
      const isQuestion = message.split('')[message.length - 1] === '?';

      if (!isQuestion || user === process.env.BOT_USERNAME) {
        return false;
      }

      const [answer] = file.filter(({ keywords }) => {
        const words = message
          .split(' ')
          .map((i) => i.toLowerCase())
          .map((i) => i.replace(/(\W)/g, ''));

        return words.find((w) =>
          keywords
            .split(',')
            .map((i) => i.trim())
            .map((i) => i.toLowerCase())
            .includes(w)
        );
      });

      if (answer) {
        const index = Math.floor(Math.random() * answer.answers.length);
        const messageToSay = answer.answers[index];

        if (answer.streaming) {
          const isStreaming = await isUserStreaming(answer.username);

          if (isStreaming) {
            return say(`${messageToSay}`, self);
          }
        } else {
          return say(`${messageToSay}`, self);
        }
      }
    });
  } catch (error) {
    logger.error(error, 'Error on faq starts');
    throw error;
  }
};
