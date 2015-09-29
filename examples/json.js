/*!
 * always-promise <https://github.com/hybridables/always-promise>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var promisify = require('../index')

/**
 * JSON.stringify without identation
 */

promisify(JSON.stringify)({foo: 'bar'}).then(function (data) {
  console.log(data) // => {"foo":"bar"}
}, console.error)

/**
 * JSON.stringify with identation
 */

promisify(JSON.stringify)({foo: 'bar'}, null, 2).then(function (data) {
  console.log(data)
  // =>
  // {
  //   "foo": "bar"
  // }
}, console.error)

/**
 * JSON.parse
 */

promisify(JSON.parse)('{"foo":"bar"}').then(function (data) {
  console.log(data.foo) // => 'bar'
}, console.error)
