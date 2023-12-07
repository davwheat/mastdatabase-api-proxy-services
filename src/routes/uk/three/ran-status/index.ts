import wrapResponse from '../../../../wrapResponse.js';

import threeOutagesRequest, { ThreeClient } from './threeOutagesRequest.js';

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
    client: {
      type: 'string',
      enum: ['status', 'coverage'],
      default: 'coverage',
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

      let client: ThreeClient;

      switch (request.query.client) {
        case 'coverage':
          client = ThreeClient.CoverageChecker;
          break;
        case 'status':
          client = ThreeClient.StatusChecker;
          break;
        default:
          return {
            error: 'Invalid client',
          };
      }

      const data: any = await threeOutagesRequest(postcode, client);

      reply.send(wrapResponse(data));
    },
  });
}
