'use strict';

const { test } = require('tap');
const { build } = require('../../../../helper');

const endpoint = '/uk/virgin-media/deployment-info';

test('VM lookup fails with no params', async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: endpoint,
    query: {},
  });

  t.equal(res.statusCode, 400);
});

test('VM lookup success', async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: endpoint,
    query: {
      postcode: 'SW1A 1AA',
      houseNumber: '10',
    },
  });

  t.equal(res.statusCode, 200);
});
