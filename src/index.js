import * as chatClient from './components/chatClient.js';
import { logger } from './logger/index.js';
import { scheduled } from './skills/index.js';

(async () => {
  try {
    await chatClient.connect();

    scheduled();

  } catch (error) {
    logger.error(error, 'Error on bootstrap chat.');
  }
})();
