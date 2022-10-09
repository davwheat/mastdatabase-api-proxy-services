import wrapResponse from '../wrapResponse';

import type { FastifyInstance, FastifyServerOptions } from 'fastify';

export default async function (fastify: FastifyInstance, opts?: FastifyServerOptions) {
  fastify.get('/', async function (request, reply) {
    await reply.send(wrapResponse(['Your sound card works perfectly.', 'https://www.youtube.com/watch?v=q_A1GNx0M9M']));
  });
}
