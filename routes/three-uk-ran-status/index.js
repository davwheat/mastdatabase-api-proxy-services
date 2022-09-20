const wrapResponse = require('../../wrapResponse');

const threeOutagesRequest = require('./threeOutagesRequest');
const threeCoverageRequest = require('./threeCoverageRequest');
const threeHbbRequest = require('./threeHbbRequest');

const handlers = {
  outages: threeOutagesRequest,
  coverage: threeCoverageRequest,
  hbb: threeHbbRequest,
};

const endpoints = Object.keys(handlers);

module.exports = async function (fastify, opts) {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      querystring: {
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
      },
    },
    handler: async function (request, reply) {
      const { postcode, endpoint } = request.query;

      console.log(handlers, endpoint);
      console.log(handlers[endpoint]);

      const data = await handlers[endpoint](postcode);

      reply.send(wrapResponse(data));
    },
  });
};
