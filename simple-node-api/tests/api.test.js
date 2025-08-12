// tests/api.test.js
const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../server');

let server;
before(() => {
  // Supertest puede usar app directamente; si quieres server real:
  server = app.listen(0); // puerto efímero
});
after(() => {
  server && server.close();
});

describe('API', () => {
  test('/health responde ok', async () => {
    const res = await request(server).get('/health');
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.status, 'ok');
    assert.match(res.body.node, /^v\d+\./); // algo como v18.x o v22.x
    assert.ok(Date.parse(res.body.time));
  });

  test('/echo devuelve el query param', async () => {
    const res = await request(server).get('/echo').query({ msg: 'hola' });
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.msg, 'hola');
  });

  test('/echo sin msg devuelve null', async () => {
    const res = await request(server).get('/echo');
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.msg, null);
  });

  test('/sum suma números válidos', async () => {
    const res = await request(server)
      .post('/sum')
      .send({ a: 5, b: 7 })
      .set('content-type', 'application/json');
    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.body, { a: 5, b: 7, sum: 12 });
  });

  test('/sum valida números inválidos', async () => {
    const res = await request(server)
      .post('/sum')
      .send({ a: 'x', b: 2 })
      .set('content-type', 'application/json');
    assert.equal(res.statusCode, 400);
    assert.equal(res.body.error, "Invalid numbers 'a' and 'b'.");
  });

  test('404 para rutas inexistentes', async () => {
    const res = await request(server).get('/no-existe');
    assert.equal(res.statusCode, 404);
    assert.equal(res.body.error, 'Not found');
  });
});
