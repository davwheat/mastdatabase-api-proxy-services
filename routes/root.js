'use strict';

const wrapResponse = require('../wrapResponse');

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    await reply.send(wrapResponse(['Your sound card works perfectly.', 'https://www.youtube.com/watch?v=q_A1GNx0M9M']));
  });
};
