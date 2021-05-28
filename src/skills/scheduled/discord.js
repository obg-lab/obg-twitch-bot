import cron from 'node-cron';
import { say } from '../../components/chatClient.js';

// # ┌────────────── second (optional)
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *

export const start = () => {

  const messages = [
    'Faça parte da comunidade do discord. https://discord.gg/3UKZT7cVWG',
  ];

  cron.schedule('0 */16 * * * *', () => {
    say(messages[0]);
  });
};
