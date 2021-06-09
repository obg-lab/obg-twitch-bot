import { ApiClient } from 'twitch';
import { RefreshableAuthProvider, StaticAuthProvider } from 'twitch-auth';
import { logger } from '../logger/index.js';

let accessToken;

const authProvider = new RefreshableAuthProvider(
  new StaticAuthProvider(process.env.CLIENT_ID, process.env.ACCESS_TOKEN),
  {
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    onRefresh: (token) => {
      // do things with the new token data, e.g. save them in your database
      accessToken = token;
    },
  }
);

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
