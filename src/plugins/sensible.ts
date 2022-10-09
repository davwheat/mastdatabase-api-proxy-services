import fp from 'fastify-plugin';
import sensible from '@fastify/sensible';

import type { FastifyInstance, FastifyServerOptions } from 'fastify';

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp(async function (fastify: FastifyInstance, opts?: FastifyServerOptions) {
  fastify.register(sensible, {
    // errorHandler: false,
  });
});