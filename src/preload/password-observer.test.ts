import assert from 'node:assert/strict';
import { test } from 'node:test';
import { hasAddedPasswordInput } from './password-observer';

const mutation = (...addedNodes: unknown[]) => ({ addedNodes });

test('detects a password input added directly', () => {
  assert.equal(hasAddedPasswordInput([mutation({ nodeName: 'INPUT', type: 'password' })]), true);
});

test('detects a password input nested in an added subtree', () => {
  assert.equal(
    hasAddedPasswordInput([mutation({ nodeName: 'DIV', querySelector: (selector: string) => selector === 'input[type="password"]' })]),
    true,
  );
});

test('ignores unrelated additions and mutations without added nodes', () => {
  assert.equal(
    hasAddedPasswordInput([
      mutation({ nodeName: 'INPUT', type: 'text' }, { nodeName: 'DIV', querySelector: () => null }),
      mutation(),
    ]),
    false,
  );
});

test('continues checking later added nodes and records after unrelated mutations', () => {
  assert.equal(
    hasAddedPasswordInput([
      mutation({ nodeName: 'SPAN', querySelector: () => null }),
      mutation({ nodeName: 'INPUT', type: 'password' }),
    ]),
    true,
  );
});
