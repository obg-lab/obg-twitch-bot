import * as _ from 'lodash';
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
    'Quer aprender mais sobre tecnologia? Veja os videos do youtube do Germano. https://youtube.com/egermano',
    'Você sabia que além de live aqui na twitch o Germano também tem um canal bem legal no Youtube? Ele sempre da dicas de tecnologia e faz uns projetos malucos por lá. https://youtube.com/egermano',
    'O Germano também tem um canal no youtube. Corre lá e se inscreve agora. https://youtube.com/egermano',
  ];

  cron.schedule('0 */13 * * * *', () => {
    const index = _.random(message.length - 1);
    const message = message[index];

    say(messages[index]);
  });
};
