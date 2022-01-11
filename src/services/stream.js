import { ApiClient } from '@twurple/api';
import { logger } from '../logger/index.js';
import { getAuthProvider } from '../components/auth.js';

const authProvider = getAuthProvider();

const apiClient = new ApiClient({ authProvider });

export const isUserStreaming = async (username) => {
  try {
    const user = await apiClient.helix.users.getUserByName(username);
    return await apiClient.helix.streams.getStreamByUserId(user.id);
  } catch (error) {
    logger.error({ error }, 'Error calling Twitch API to get a streaming');
    throw error;
  }
};
