import { assert, AssertionError } from './utils';
import { expect } from 'chai';
import td from 'testdouble';

/* eslint-disable @typescript-eslint/no-magic-numbers */

/**
 * Tests for the utils functions.
 */
describe('utils', function (this: Mocha.Suite): void {
  this.slow(5).timeout(300);

  afterEach(() => {
    td.reset();
  });

  describe('AssertionError', () => {
    it('works as an exception', () => {
      expect(() => {
        throw new AssertionError({});
      }).throws(AssertionError);
      expect(() => {
        throw new AssertionError({}, 'Hello world');
      }).throws(AssertionError, 'Hello world');
    });
  });

  describe('#assert', () => {
    const dummyGuard = (ret: boolean) => (_o: unknown): _o is string => ret;

    it('test success', () => {
      assert('foo', dummyGuard(true));
    });

    it('failures throw exceptions', () => {
      expect(() => assert('foo', dummyGuard(false))).to.throw(AssertionError);
    });

    it('failures throw exceptions with custom message', () => {
      expect(() => assert('foo', dummyGuard(false), 'Hello world')).to.throw(
        AssertionError,
        'Hello world',
      );
    });
  });
});
