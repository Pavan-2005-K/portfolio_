const test = require('node:test');
const assert = require('node:assert');
const { validateContact } = require('../src/validate');

const good = { name: 'Asha', email: 'asha@example.com', subject: 'Hello', message: 'This is a valid message.' };

test('accepts valid input and trims', () => {
  const { errors, values } = validateContact({ ...good, name: '  Asha  ' });
  assert.deepStrictEqual(errors, {});
  assert.strictEqual(values.name, 'Asha');
});
test('rejects bad email', () => {
  assert.ok(validateContact({ ...good, email: 'nope' }).errors.email);
});
test('rejects short message and missing fields', () => {
  assert.ok(validateContact({ ...good, message: 'short' }).errors.message);
  assert.ok(validateContact({}).errors.name);
  assert.ok(validateContact(undefined).errors.email);
});
test('rejects too-long message', () => {
  assert.ok(validateContact({ ...good, message: 'x'.repeat(2001) }).errors.message);
});
test('rejects non-string values (NoSQL operator injection)', () => {
  assert.ok(validateContact({ ...good, email: { $gt: '' } }).errors.email);
  assert.ok(validateContact({ ...good, name: ['a', 'b'] }).errors.name);
});
test('strips control characters', () => {
  assert.strictEqual(validateContact({ ...good, subject: 'Hi\u0000 there' }).values.subject, 'Hi there');
});
