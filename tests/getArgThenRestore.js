/**
 * Returns the given `n` argument
 * and then restores the spy.
 *
 * @param {function}
 * @param {n}
 */
module.exports = function getArgThenRestore(fn, n) {
  var arg = fn.args[0][n];
  fn.restore();
  return arg;
}
