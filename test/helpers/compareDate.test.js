const assert = require('chai').assert;
const { isValid, compareDate } = require('../../helpers');

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
})

describe('compareDate helper', () => {
  it('should throw an error if not a valid date', () => {
    const invalid = 'foo';
    assert.isNotOk(compareDate(invalid), 'date is not valid');
  });

  it('should return true if date is older than 15 seconds', () => {
    const date = new Date('2019-10-26T15:56:07.045Z');
    assert.equal(compareDate(date), true);
  });

  it('should return false if date is newer than 15 seconds', () => {
    const date = new Date();
    assert.equal(compareDate(date), false);
  })
});