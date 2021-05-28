import pino from 'pino';

const pinoLogger = pino();

export const logger = pinoLogger.child({ environment: 'dev' });
