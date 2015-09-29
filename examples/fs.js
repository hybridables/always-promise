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
 * fs.readFileSync
 */

promisify(fs.readFileSync)(filepath, 'utf-8')
.then(JSON.parse)
.then(function (data) {
  console.log(data.name) // => 'always-promise'
}, console.error)

/**
 * fs.readFile
 */

promisify(fs.readFile)(filepath, 'utf-8')
.then(function (data) {
  console.log(data.indexOf('"license": "MIT"') !== -1) // => true
}, console.error)

/**
 * fs.stat
 */

promisify(fs.stat)(filepath)
.then(function (stats) {
  console.log(stats.isFile()) // => true
}, console.error)
