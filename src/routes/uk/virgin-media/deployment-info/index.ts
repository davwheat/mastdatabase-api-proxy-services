import fetch from 'node-fetch';
import { getResponsibleProxyHeaders } from '../../../../utils.js';
import wrapResponse from '../../../../wrapResponse.js';

import type { FastifyInstance, FastifyServerOptions } from 'fastify';
import type { FromSchema } from 'json-schema-to-ts';

const QSType = {
  type: 'object',
  required: ['postcode', 'houseNumber'],
  properties: {
    postcode: {
      type: 'string',
    },
    houseNumber: {
      type: 'string',
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
      const { houseNumber, postcode } = request.query;

      const uri = new URL('https://api.bidb.uk/check/virgin-media');

      uri.searchParams.append('number', houseNumber);
      uri.searchParams.append('postcode', postcode);

      const response = await fetch(uri.toString(), {
        headers: getResponsibleProxyHeaders(request),
      });

      const data = (await response.json()) as Record<string, unknown>;

      reply.send(wrapResponse(data));
    },
  });
}
