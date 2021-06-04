import pino from 'pino';
import * as pkginfo from '../../package.json';

const pinoLogger = pino();

export const logger = pinoLogger.child({
  environment: process.env.NODE_ENV || 'dev',
  service: {
    name: pkginfo.name,
    version: pkginfo.version,
  },
});
