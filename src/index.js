import * as chatClient from './components/chatClient.js';
import { logger } from './logger/index.js';
import { scheduled } from './skills/schedule.js';
import { faq } from './skills/faq.js';
import { shortcuts } from './skills/shortcut.js';

(async () => {
  try {
    await chatClient.connect();

    scheduled();
    faq();
    shortcuts();
    
  } catch (error) {
    logger.error(error, 'Error on bootstrap chat.');
  }
})();
