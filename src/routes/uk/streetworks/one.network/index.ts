import fetch from 'node-fetch';
import { getResponsibleProxyHeaders } from '../../../../utils.js';

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

      const uri = new URL('http://host.docker.internal:8086/');

      uri.searchParams.append('lat', lat.toString());
      uri.searchParams.append('lon', lon.toString());

      const response = await fetch(uri.toString(), {
        headers: getResponsibleProxyHeaders(request),
      });

      const data = await response.arrayBuffer();
      const buffer = Buffer.from(new Uint8Array(data));

      reply
        .status(response.status)
        .headers({ 'Content-Type': response.headers.get('Content-Type')! })
        .send(buffer);
    },
  });
}
