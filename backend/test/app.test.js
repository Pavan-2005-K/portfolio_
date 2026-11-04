const test = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');

process.env.NODE_ENV = 'development';
process.env.ALLOWED_ORIGINS = 'https://portfolio.example';

const app = require('../src/app');

test('CORS allows local dev server ports and keeps production origin restrictions', async (t) => {
  const server = app.listen(0);
  await once(server, 'listening');
  t.after(() => new Promise((resolve) => server.close(resolve)));

  const url = `http://127.0.0.1:${server.address().port}/api/contact`;
  const preflight = (origin) =>
    fetch(url, {
      method: 'OPTIONS',
      headers: {
        Origin: origin,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'content-type',
      },
    });

  process.env.NODE_ENV = 'development';
  const localResponse = await preflight('http://localhost:5500');
  assert.equal(localResponse.status, 204);
  assert.equal(localResponse.headers.get('access-control-allow-origin'), 'http://localhost:5500');

  process.env.NODE_ENV = 'production';
  const configuredResponse = await preflight('https://portfolio.example');
  assert.equal(configuredResponse.headers.get('access-control-allow-origin'), 'https://portfolio.example');

  const unconfiguredResponse = await preflight('http://localhost:5500');
  assert.equal(unconfiguredResponse.headers.get('access-control-allow-origin'), null);
});
