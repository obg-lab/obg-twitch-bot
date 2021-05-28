import * as instagram from './scheduled/instagram.js';
import * as discord from './scheduled/discord.js';
import * as youtube from './scheduled/youtube.js';
import * as marvin from './scheduled/marvin.js';

export const scheduled = () => {
  youtube.start();
  instagram.start();
  discord.start();
  marvin.start();
};
