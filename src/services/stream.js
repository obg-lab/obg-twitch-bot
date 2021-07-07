import { ApiClient } from 'twitch';
import { ClientCredentialsAuthProvider } from 'twitch-auth';
import { logger } from '../logger/index.js';

const authProvider = new ClientCredentialsAuthProvider(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

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
