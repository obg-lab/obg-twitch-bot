import EventEmitter from 'events';
import { ApiClient } from 'twitch';
import { ClientCredentialsAuthProvider } from 'twitch-auth';
import { NgrokAdapter } from 'twitch-eventsub-ngrok';
import { EventSubListener } from 'twitch-eventsub';
import { logger } from '../logger/index.js';

const authProvider = new ClientCredentialsAuthProvider(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);
const apiClient = new ApiClient({
  authProvider,
  initialScopes: [
    'channel:read:subscriptions',
    'bits:read',
    'channel:manage:redemptions',
    'channel:read:polls',
    'channel:read:predictions',
  ],
});

export const listener = new EventSubListener(
  apiClient,
  new NgrokAdapter(),
  'strginrandomicadobotcansado1'
);

class EventSubEmitter extends EventEmitter {}

export const events = new EventSubEmitter();

export const listen = async () => {
  try {
    await apiClient.helix.eventSub.deleteAllSubscriptions();
    logger.info('Old subscriptions deleted');
  } catch (error) {
    logger.info({ error }, 'Error on delete broken subscriptions');
    return false;
  }

  const user = await apiClient.helix.users.getUserByName(
    process.env.CHANNEL_NAME
  );

  try {
    await listener.subscribeToChannelFollowEvents(user.id, (e) => {
      logger.info({ event: e }, `Follow subscribed event`);
      const { followDate, userDisplayName, userId, userName } = e;
      events.emit('new-follow', followDate, userDisplayName, userId, userName);
    });

    await listener.listen();
    logger.info('Listening to Twitch EventSub');
  } catch (error) {
    logger.error({ error }, 'Error setting up the EventSub');
  }
};

export const stop = async () => {
  logger.info('Stop listening Twitch Event Sub');
  await listener.unlisten();
};
