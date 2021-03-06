import type * as g from './guards';
import { expect } from 'chai';

/* eslint-disable @typescript-eslint/no-magic-numbers */

/**
 * Compilation tests for the guard types.
 */
describe('Guards', function (this: Mocha.Suite) {
  this.slow(5).timeout(3000);

  it('strToConstantType', () => {
    const fn: g.PartialTypeGuard<string, 'Hello'> = (s): s is 'Hello' =>
      s === 'Hello';

    expect(fn('Hello')).to.equal(true);
    expect(fn('Bye')).to.equal(false);
  });

  it('typeGuardsArePartialGuards', () => {
    const fn: g.TypeGuard<'Hello'> = (s): s is 'Hello' =>
      typeof s === 'string' && s === 'Hello';
    const fn2: g.PartialTypeGuard<unknown, 'Hello'> = fn;

    expect(fn2('Hello')).to.equal(true);
  });
});
