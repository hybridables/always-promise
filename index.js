/*!
 * always-promise <https://github.com/hybridables/always-promise>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

module.exports = function alwaysPromise (val, Prom) {
  var self = this
  return function hybridified () {
    var func = require('merz').call(self || this, val)
    return require('redolent')(func, Prom).apply(self || this, arguments)
  }
}
