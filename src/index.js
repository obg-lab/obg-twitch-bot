import * as chatClient from './components/chatClient.js';
import { logger } from './logger/index.js';
import { scheduled } from './skills/schedule.js';
import { faq } from './skills/faq.js';
import { commands, shortcuts } from './skills/shortcut.js';

(async () => {
  try {    
    scheduled();
    faq();
    shortcuts();
    commands();
    
    await chatClient.listening();

    chatClient.chatEvents.on('onConnect', async () => chatClient.say('O bot ta on!'));
  } catch (error) {
    logger.error(error, 'Error on bootstrap chat.');
  }
})();
