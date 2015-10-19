var axios = require('axios');

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['axios'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS
    factory(require('axios'));
  } else {
    // Browser globals
    factory(root.axios);
  }
}(this, function (axios) {
  return axios.interceptors.response.use(
    function logResponse(res) {
      console.log('%c Request Success:', 'color: #4CAF50; font-weight: bold', res);
      return res;
    },

    function logPromiseError(err) {
      console.log('%c Request Error:', 'color: #EC6060; font-weight: bold', err);
      return Promise.reject(err);
    }
  );
}));
