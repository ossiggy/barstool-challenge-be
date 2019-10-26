const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { gameService } = require('../../services');

chai.use(sinonChai);

describe('getData', () => {
  let sandbox = null;
  beforeEach('set sandbox', () => {
    sandbox = sinon.createSandbox();
  });
  afterEach('restore stub', () => {
    sandbox.restore();
  })
  it('should be called with a url', async () => {
    const response = JSON.stringify({
      foo: 'bar',
      bar: 'foo',
      foobar: 'foobar'
    });
    const stubReq = sandbox.stub(gameService, 'getData').resolves(response);
    
    await gameService.getData('foobar.com');

    sinon.assert.calledWith(stubReq, 'foobar.com');
  });
});
