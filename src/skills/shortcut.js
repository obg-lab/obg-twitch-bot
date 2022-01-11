import { say, chatEvents } from '../components/chatClient.js';
import { logger } from '../logger/index.js';
import { load } from '../services/configFiles.js';
import { isUserStreaming } from '../services/stream.js';

export const commands = () => {
  const file = load('shortcuts');

  const commandsMessage = file.map((command) => `!${command.name}`).join(', ');

  chatEvents.on('message', async (channel, user, message, self) => {
    if (message === '!comandos' || message === '!commands') {
      await say(
        `Ae, fica na miúda, mas essa é a lista secreta de comandos, ok, nem tão secreta... Mas não fala para os outros bots, tem gente escutando a gente o tempo todo. Comandos: ${commandsMessage}`,
        self
      );

      return say('Tem uns outros comandos secretos, mas aí eu já não posso te falar, você vai ter que descobrir.', self);
    }
  });
};

export const shortcuts = () => {
  try {
    const file = load('shortcuts');

    chatEvents.on('message', async (channel, user, message, self) => {
      if (user === process.env.BOT_USERNAME) {
        return false;
      }

      const [shortcut] = file.filter(({ name }) => `!${name}` === message);

      if (shortcut) {
        const index = Math.floor(Math.random() * shortcut.messages.length);
        const messageToSay = shortcut.messages[index];
        const replyName = !shortcut.replyTo ? `@${user} ` : '';

        if (shortcut.streaming) {
          const isStreaming = await isUserStreaming(shortcut.username);

          if (isStreaming) {
            return say(
              `${replyName}${messageToSay}`,
              shortcut.replyTo ? self : null
            );
          }
        } else {
          return say(
            `${replyName}${messageToSay}`,
            shortcut.replyTo ? self : null
          );
        }
      }
    });
  } catch (error) {
    logger.error(error, 'Error on shortcuts starts');
    throw error;
  }
};
