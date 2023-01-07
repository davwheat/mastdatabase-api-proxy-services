import AutoLoad from '@fastify/autoload';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import type { FastifyInstance, FastifyPluginOptions, FastifyServerOptions } from 'fastify';

// Pass --options via CLI arguments in command to enable these options.
export const options: FastifyPluginOptions = {};

export default async function (fastify: FastifyInstance, opts?: FastifyServerOptions) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: { ...opts },
    forceESM: true,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: { ...opts },
    forceESM: true,
  });
}
