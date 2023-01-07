import fetch from 'node-fetch';

import type { FastifyInstance, FastifyServerOptions } from 'fastify';
import type { FromSchema } from 'json-schema-to-ts';

const QSType = {
  type: 'object',
  required: ['lat', 'lon'],
  properties: {
    lat: {
      type: 'number',
    },
    lon: {
      type: 'number',
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
      const { lat, lon } = request.query;

      const uri = new URL('https://api.bidb.uk/onenetworkData');

      uri.searchParams.append('lat', lat.toString());
      uri.searchParams.append('lon', lon.toString());

      const response = await fetch(uri.toString(), {
        headers: {
          'User-Agent': 'mastdatabase.co.uk proxy',
          'X-Abuse-Contact': 'david@davwheat.dev',
          'X-Forwarded-For': request.ip,
          'X-Upstream-User-Agent': request.headers['user-agent'] ?? 'not provided',
          'X-Upstream-Referer': request.headers.referer ?? 'not provided',
        },
      });

      const data = await response.arrayBuffer();
      const buffer = Buffer.from(new Uint8Array(data));

      reply
        .status(response.status)
        .headers({ 'Content-Type': response.headers.get('Content-Type') })
        .send(buffer);
    },
  });
}
