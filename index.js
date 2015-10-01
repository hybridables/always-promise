/*!
 * always-promise <https://github.com/hybridables/always-promise>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

/**
 * > Promisify everything!
 *
 * **Example**
 *
 * ```js
 * const promisify = require('always-promise')
 * ```
 *
 * @name   alwaysPromise
 * @param  {Function|GeneratorFunction|Stream|Promise} `<val>` anything that [merz](https://github.com/hybridables/merz) accepts
 * @param  {Function} `[Prome]` custom promise module, which will be used for promisify-ing
 * @return {Function} which returns promise
 * @api public
 */
module.exports = function alwaysPromise (val, Prome) {
  var self = this
  return function promisified () {
    var func = require('merz').call(self || this, val)
    var PromiseCtor = Prome || alwaysPromise.promise || promisified.promise
    return require('redolent')(func, PromiseCtor).apply(self || this, arguments)
  }
}
