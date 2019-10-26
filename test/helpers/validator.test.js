const assert = require('chai').assert;
const { isValid} = require('../../helpers');

describe('isValid helper', () => {
  const requiredFields = ['foo', 'bar', 'foobar'];

  it('should return false if required field does not exist', () => {
    const testObj = {
      foo: 'bar',
      bar: 'foo',
    };
    assert.equal(isValid(testObj, requiredFields), false);
  });

  it('should return true if all required fields exist', () => {
    const testObj = {
      foo: 'bar',
      bar: 'foo',
      foobar: 'foobar'
    };
    assert.equal(isValid(testObj, requiredFields), true);
  })
});