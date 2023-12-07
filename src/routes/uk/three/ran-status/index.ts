import wrapResponse from '../../../../wrapResponse.js';

import threeOutagesRequest from './threeOutagesRequest.js';

import type { FastifyInstance, FastifyServerOptions } from 'fastify';
import type { FromSchema } from 'json-schema-to-ts';

const QSType = {
  type: 'object',
  required: ['postcode'],
  properties: {
    postcode: {
      type: 'string',
      minLength: 1,
      maxLength: 16,
    },
  },
} as const;

export default async function (fastify: FastifyInstance, opts?: FastifyServerOptions) {
  fastify.route<{ Querystring: FromSchema<typeof QSType> }>({
    method: 'GET',
    url: '/',
    schema: {
      querystring: QSType,
    },
    handler: async function (request, reply) {
      const { postcode } = request.query;

      const data: any = await threeOutagesRequest(postcode);

      reply.send(wrapResponse(data));
    },
  });
}
