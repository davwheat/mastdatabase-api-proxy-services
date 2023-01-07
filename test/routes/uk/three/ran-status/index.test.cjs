'use strict';

const { test } = require('tap');
const { build } = require('../../../../helper');

const endpoint = '/uk/three/ran-status';

test('three ran status check fails with no params', async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: endpoint,
    query: {},
  });

  t.equal(res.statusCode, 400);
});

test('three outages check success', async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: endpoint,
    query: {
      endpoint: 'outages',
      postcode: 'SW1A 1AA',
    },
  });

  t.equal(res.statusCode, 200);
});

test('three coverage check success', async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: endpoint,
    query: {
      endpoint: 'coverage',
      postcode: 'SW1A 1AA',
    },
  });

  t.equal(res.statusCode, 200);
});

test('three hbb check success', async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: endpoint,
    query: {
      endpoint: 'hbb',
      postcode: 'SW1A 1AA',
    },
  });

  t.equal(res.statusCode, 200);
});
