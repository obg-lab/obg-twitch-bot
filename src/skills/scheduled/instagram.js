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
    'Quer saber mais sobre tecnologia e acampanhar um pouco da rotina do Germano? Então siga ele no instagram: https://instagram.com/egermano',
  ];

  cron.schedule('0 */16 * * * *', () => {
    say(messages[0]);
  });
};
