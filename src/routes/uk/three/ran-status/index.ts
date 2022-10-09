import wrapResponse from '../../../../wrapResponse.js';

import threeOutagesRequest from './threeOutagesRequest.js';
import threeCoverageRequest from './threeCoverageRequest.js';
import threeHbbRequest from './threeHbbRequest.js';

import type { FastifyInstance, FastifyServerOptions } from 'fastify';
import type { FromSchema } from 'json-schema-to-ts';

const handlers = {
  outages: threeOutagesRequest,
  coverage: threeCoverageRequest,
  hbb: threeHbbRequest,
} as const;

const endpoints = Object.keys(handlers) as any as keyof typeof handlers;

const QSType = {
  type: 'object',
  required: ['endpoint', 'postcode'],
  properties: {
    postcode: {
      type: 'string',
      minLength: 1,
      maxLength: 16,
    },
    endpoint: {
      type: 'string',
      enum: endpoints,
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
      const { postcode, endpoint } = request.query;

      const data = (await handlers[endpoint as keyof typeof handlers](postcode)) as any;

      reply.send(wrapResponse(data));
    },
  });
}
