import cron from 'node-cron';
import { say, chatEvents } from '../components/chatClient.js';
import { logger } from '../logger/index.js';
import { load } from '../service/configFiles.js';
import { isUserStreaming } from '../service/stream.js';

export const faq = () => {
  try {
    const file = load('faq');

    chatEvents.on('message', async (channel, context, message, self) => {
      const username = context['display-name'];

      const isQuestion = message.split('')[message.length - 1] === '?';

      console.log(isQuestion);

      if (!isQuestion || username === process.env.BOT_USERNAME) {
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
          const isStreaming = await isUserStreaming(username);

          if (isStreaming) {
            return say(`@${username} ${messageToSay}`);
          }
        } else {
          return say(`@${username} ${messageToSay}`);
        }
      }
    });
  } catch (error) {
    logger.error(error, 'Error on faq starts');
    throw error;
  }
};
