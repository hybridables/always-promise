/*!
 * always-promise <https://github.com/hybridables/always-promise>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var fs = require('fs')
var alwaysPromise = require('../index')
var simpleGet = require('simple-get')

/**
 * readFile
 */

function read (fp) {
  return function (done) {
    fs.readFile(fp, 'utf8', done)
  }
}

alwaysPromise(function * (filepath) {
  var data = yield read(filepath)
  return JSON.parse(data)
})('package.json').then(function (json) {
  console.log(json.name) // => 'always-promise'
}, console.error)

/**
 * http request
 */

function get (url) {
  return function (done) {
    simpleGet.concat(url, done)
  }
}

alwaysPromise(function * (url) {
  var res = yield get(url)
  var buf = res[0]
  // var httpResponse = res[1]
  return buf.toString()
})('http://www.tunnckocore.tk').then(function (res) {
  console.log(res.indexOf('<title>') !== -1) // => true
}, console.error)
