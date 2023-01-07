'use strict';

const { test } = require('tap');
const { build } = require('../../../../helper');

const endpoint = '/uk/streetworks/one.network';

test('one.network lookup fails with no params', async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: endpoint,
    query: {},
  });

  t.equal(res.statusCode, 400);
});

test('one.network lookup success', async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: endpoint,
    query: {
      lat: 51.5074,
      lon: 0.1278,
    },
  });

  t.equal(res.statusCode, 200);
  t.ok(Array.isArray(await res.json()));
});
