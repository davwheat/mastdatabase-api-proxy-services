import wrapResponse from '../../../../wrapResponse.js';

import threeOutagesRequest, { ThreeClient, postcodeToLatLong } from './threeOutagesRequest.js';

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

const QSTypeLatLon = {
  type: 'object',
  required: ['latitude', 'longitude'],
  properties: {
    latitude: {
      type: 'number',
      minimum: -90,
      maximum: 90,
    },
    longitude: {
      type: 'number',
      minimum: -180,
      maximum: 180,
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

      const locationData = await postcodeToLatLong(postcode);

      if ('error' in locationData) {
        return {
          error: 'Unknown postcode or error fetching location information',
          detail: `${locationData.response.status} ${locationData.response.statusText}`,
          upstreamBody: locationData.response.text,
        };
      }

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

      const data: any = await threeOutagesRequest(locationData.latitude, locationData.longitude, client, postcode);

      reply.send(wrapResponse(data));
    },
  });

  fastify.route<{ Querystring: FromSchema<typeof QSTypeLatLon> }>({
    method: 'GET',
    url: '/latlon',
    schema: {
      querystring: QSTypeLatLon,
    },
    handler: async function (request, reply) {
      const { latitude, longitude } = request.query;

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

      const data: any = await threeOutagesRequest(latitude, longitude, client);

      reply.send(wrapResponse(data));
    },
  });
}
