var sinon = require('sinon');
var nock = require('nock');
var expect = require('chai').expect;
var getArgThenRestore = require('./getArgThenRestore');

var axios = require('axios');
require('../');

describe('logger', function() {
  beforeEach(function() {
    sinon.stub(console, 'log');
  });

  afterEach(function() {
    nock.cleanAll();
    // We no longer have to clean up our stub
    // (restore console.log) since getArgThenRestore
    // does this for us.
  });

  it('should log when on response.success', function() {
    nock('http://swag.com')
      .get('/')
      .reply(200, '{}');

    return axios
      .get('http://swag.com')
      .then(function() {
        expect(getArgThenRestore(console.log, 0)).to.contain('Success');
      });
  });

  it('should log when on response.error', function() {
    nock('http://swag.com')
      .get('/')
      .reply(400, '{}');

    return axios
      .get('http://swag.com')
      .catch(function() {
        expect(getArgThenRestore(console.log, 0)).to.contain('Error');
      });
  });
});
