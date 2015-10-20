var sinon = require('sinon');
var nock = require('nock');
var expect = require('chai').expect;
var axios = require('axios');
require('../');

describe('logger', function() {
  beforeEach(function() {
    sinon.spy(console, 'log');
  });

  afterEach(function() {
    nock.cleanAll();
    console.log.restore();
  });

  it('should log when on response.success', function() {
    nock('http://swag.com')
      .get('/')
      .reply(200, '{}');

    return axios
      .get('http://swag.com')
      .then(function() {
        expect(console.log.args[0][0]).to.contain('Success');
      });
  });

  it('should log when on response.error', function() {
    nock('http://swag.com')
      .get('/')
      .reply(400, '{}');

    return axios
      .get('http://swag.com')
      .catch(function() {
        expect(console.log.args[0][0]).to.contain('Error');
      });
  });
});
