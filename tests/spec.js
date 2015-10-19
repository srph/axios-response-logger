var sinon = require('sinon');
var expect = require('chai').expect;
var axios = require('axios');
require('../');

describe('logger', function() {
  var sandbox;
  var server;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    server = sandbox.useFakeServer();
    sandbox.spy(console, 'log');
  });

  afterEach(function() {
    server.restore();
    sandbox.restore()
  });

  // it('should log when on response.success', function(done) {
  //   server.respondWith([200, { 'Content-Type': 'application/json' }, '{}']);
  //   axios.get('yolo');

  //   setTimeout(function() {
  //     server.respond();
  //     // expect(console.log.args[0]).to.contain('Success');
  //     done();
  //   }, 0);
  // });

  it('should log when on response.error', function(done) {
    // server.respondWith([400, { 'Content-Type': 'application/json' }, '{}']);

    axios.get('/yolo')
      .catch(function() {
        expect(console.log.args[0][0]).to.contain('Error');
      })
      .then(done);

    // server.respond();
    // setTimeout(function() {
      // server.respond();
      // var x = console.log.args[0];
      // console.log.restore();
      // console.log(typeof x);
      // expect(console.log.args[0]).to.contain('Error');
    // }, 0);
  });
});
