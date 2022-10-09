import { v4 as uuidv4 } from 'uuid';
import fetch from 'node-fetch';

import type { FastifyInstance, FastifyServerOptions } from 'fastify';
import type { FromSchema } from 'json-schema-to-ts';

const QSType = {
  type: 'object',
  required: ['layer', 'zoom', 'x', 'i'],
  properties: {
    layer: {
      type: 'string',
      enum: ['FiveG', 'LTE', '800', 'Fast'],
    },
    zoom: {
      type: 'number',
      enum: [9, 12, 14],
    },
    x: {
      type: 'number',
    },
    i: {
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
      const { layer, zoom, x, i } = request.query;

      const response = await fetch(`https://www.three.co.uk/static/images/functional_apps/coverage/${layer}/${zoom}/${x}/${i}.png`, {
        headers: {
          Referer: 'https://www.three.co.uk/Discover/Network/Coverage',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
        },
      });

      const data = await response.arrayBuffer();
      const buffer = Buffer.from(new Uint8Array(data));

      reply.headers({ 'Content-Type': response.headers.get('Content-Type') }).send(buffer);
    },
  });
}
