import cron from 'node-cron';
import * as _ from 'lodash';
import { say } from '../components/chatClient.js';
import { logger } from '../logger/index.js';
import { load } from '../service/configFiles.js';
import { isUserStreaming } from '../service/stream.js';

export const scheduled = () => {
  try {
    const file = load('scheduled');

    for (let i = 0; i < file.length; i++) {
      const schedule = file[i];

      logger.info(
        { schedule, isValid: cron.validate(schedule.schedule) },
        'Setup schedule cron job.'
      );

      cron.schedule(schedule.schedule, async () => {
        const { messages, name, streaming, username } = schedule;

        try {
          const index = Math.floor(Math.random() * messages.length);
          const message = messages[index];

          if (streaming) {
            const isStreaming = await isUserStreaming(username);

            if (isStreaming) {
              return say(message);
            }
          } else {
            return say(message);
          } 
        } catch (error) {
          logger.error(error, `Error sending scheduled ${name} message`);
        }
      });
    }
  } catch (error) {
    logger.error(error, 'Error on scheduled starts');
    throw error;
  }
};
