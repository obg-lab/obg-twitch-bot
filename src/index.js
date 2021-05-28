import * as chatClient from './components/chatClient.js';
import { logger } from './logger/index.js';

(async () => {
  try {
    await chatClient.connect();
  } catch (error) {
    logger.error({ error }, 'Error on bootstrap chat.');
  }
})();
