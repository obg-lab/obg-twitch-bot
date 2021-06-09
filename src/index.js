import * as chatClient from './components/chatClient.js';
import * as eventSub from './components/eventSub.js';
import { logger } from './logger/index.js';
import { scheduled } from './skills/schedule.js';
import { faq } from './skills/faq.js';
import { shortcuts } from './skills/shortcut.js';

const terminate = async () => {
  await eventSub.stop();
  process.exit();
}

process.on('SIGINT', terminate);
process.on('SIGTERM', terminate);

(async () => {
  try {
    await chatClient.connect();

    scheduled();
    faq();
    shortcuts();
   
    await eventSub.listen();

  } catch (error) {
    logger.error(error, 'Error on bootstrap chat.');
  }
})();
