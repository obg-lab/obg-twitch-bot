import fs from 'fs';
import path from 'path';
import Yaml from 'yaml';
import { logger } from '../logger/index.js';

export const load = (filename) => {
  // TODO: transformar o path do arquivo em uma env var
  const file = fs.readFileSync(
    path.join(process.cwd(), `config/${filename}.yml`),
    'utf8'
  );

  const parsed = Yaml.parse(file);
  logger.info({ parsed }, 'yaml parsed');

  return parsed;
};
