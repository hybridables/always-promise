/*!
 * always-promise <https://github.com/hybridables/always-promise>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var fs = require('fs')
var path = require('path')
var promisify = require('../index')
var filepath = path.join(path.dirname(__dirname), 'package.json')

/**
 * sync function that retun
 * successful fs.createReadStream
 * @todo in merz/always-done/always-callback to read the stream contents
 */

var readStream = promisify(function (fp) {
  return fs.createReadStream(fp)
})
readStream(filepath)
.then(function (res) {
  console.log(res) // => undefined
}, console.error)

/**
 * directly passed stream to promisify function
 * using the fs.createReadStream
 */

var stream = promisify(fs.createReadStream(filepath))

stream()
.then(function (res) {
  console.log(res) // => undefined
}, console.error)

/**
 * failing stream
 * just giving `fs.createReadStream` function
 * to promisify function
 */

promisify(fs.createReadStream)('foobar.json')
.catch(function (err) {
  console.log(err.code) // => 'ENOENT'
})

/**
 * promisify `fs.createReadStream` function
 */

promisify(fs.createReadStream)(filepath)
.then(function (res) {
  console.log(res) // => undefined
})
