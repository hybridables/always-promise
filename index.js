/*!
 * always-promise <https://github.com/tunnckoCore/always-promise>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var Bluebird = require('bluebird')
var isAsyncFn = require('is-async-function')
var makeCallback = require('make-callback')

module.exports = function alwaysPromise (fn) {
  if (isAsyncFn(fn)) {
    return Bluebird.promisify(fn)
  }

  return Bluebird.promisify(makeCallback(fn))
}
