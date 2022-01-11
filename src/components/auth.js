import { promises as fs } from 'fs';
import path from 'path';
import { RefreshingAuthProvider } from '@twurple/auth';

const tokenFilePath = path.join(process.cwd(), `config/tokens.json`);
const tokenData = JSON.parse(await fs.readFile(tokenFilePath));

let authProvider;

export const getAuthProvider = () => {
  if (authProvider) return authProvider;

  authProvider = new RefreshingAuthProvider(
    {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      onRefresh: async (newTokenData) => {
        logger.info('Auth token was refreshed');
        await fs.writeFile(
          tokenFilePath,
          JSON.stringify(newTokenData, null, 4),
          'UTF-8'
        );
      },
    },
    {
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
    }
  );

  return authProvider;
};
