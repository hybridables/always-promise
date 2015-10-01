/*!
 * always-promise <https://github.com/hybridables/always-promise>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var fs = require('fs')
var semver = require('semver')
var test = require('assertit')
var isBuffer = require('is-buffer')
var alwaysPromise = require('./index')

function multipleArgs (one, two, three, callback) {
  callback(null, one, two, three)
}

test('should throw TypeError if not a function given', function (done) {
  function fixture () {
    alwaysPromise(12345)()
  }

  test.throws(fixture, TypeError)
  test.throws(fixture, /merz: expect `val` to be promise, stream, child process or sync, async, generator function/)
  done()
})

test('alwaysPromise(JSON.parse)(\'{"foo":"bar"}\').then(res)', function (done) {
  var JSONParse = alwaysPromise(JSON.parse)

  JSONParse('{"foo":"bar"}')
  .then(function (res) {
    test.deepEqual(res, {foo: 'bar'})
    done()
  }, done)
})

test('alwaysPromise(JSON.parse)("foo~bar~baz").catch(err)', function (done) {
  var JSONParse = alwaysPromise(JSON.parse)

  JSONParse('foo~bar~baz')
  .catch(function (err) {
    test.ifError(!err)
    test.strictEqual(err.message, 'Unexpected token o')
    done()
  })
})

test('alwaysPromise(fs.readFileSync)("./package.json", "utf8").then(res)', function (done) {
  var readFile = alwaysPromise(fs.readFileSync)

  readFile('./package.json', 'utf8')
  .then(function (res) {
    test.ok(res.indexOf('"license": "MIT"') !== -1)
    done()
  }, done)
})

test('alwaysPromise(fs.readFileSync)("./abc123.json", "utf8").catch(err)', function (done) {
  var readFile = alwaysPromise(fs.readFileSync)

  readFile('./pacfsdfsdfdfkage.json', 'utf8')
  .catch(function (err) {
    test.ifError(!err)
    test.ok(err)
    test.strictEqual(err.code, 'ENOENT')
    test.strictEqual(err.path, './pacfsdfsdfdfkage.json')
    if (err.syscall) {
      test.strictEqual(err.syscall, 'open')
    }
    done()
  })
})

test('alwaysPromise(fs.stat)("./package.json").then(res)', function (done) {
  var readFile = alwaysPromise(fs.stat)

  readFile('./package.json').then(function (stats) {
    test.strictEqual(stats.isFile(), true)
    done()
  }, done)
})

test('alwaysPromise(fs.stat)("./packasdfsdfge.json").catch(err)', function (done) {
  var readFile = alwaysPromise(fs.stat)

  readFile('./packasdfsdfge.json')
  .catch(function (err) {
    test.ifError(!err)
    test.strictEqual(err.code, 'ENOENT')
    test.strictEqual(err.path, './packasdfsdfge.json')
    if (err.syscall) {
      test.strictEqual(err.syscall, 'stat')
    }
    done()
  })
})

test('should use `promise` for promisify if native not available', function (done) {
  var statFile = alwaysPromise(fs.stat, require('promise'))
  var promise = statFile('package.json')

  promise.then(function (stats) {
    test.strictEqual(stats.isFile(), true)
    if (semver.lt(process.version, '0.11.13')) {
      test.strictEqual(promise.___customPromise, true)
    }
    done()
  }, done)
})

test('should use `bluebird` if not `Prom` given and native not available', function (done) {
  var statFile = alwaysPromise(fs.readFileSync)
  var promise = statFile('package.json', 'utf-8')

  promise.then(function (res) {
    test.ok(res.indexOf('"license": "MIT"') !== -1)
    if (semver.lt(process.version, '0.11.13')) {
      test.strictEqual(promise.___bluebirdPromise, true)
    }
    done()
  }, done)
})

test('should flatten multiple arguments by default', function (done) {
  var fn = alwaysPromise(multipleArgs)

  fn(11, 22, 33).then(function (res) {
    test.deepEqual(res, [11, 22, 33])
    done()
  }, done)
})

test('should promisify with promise module given in `alwaysPromise.promise`', function (done) {
  alwaysPromise.promise = require('promise')
  var readFile = alwaysPromise(fs.readFile)
  var promise = readFile('package.json')

  promise.then(function (res) {
    test.strictEqual(isBuffer(res), true)
    if (semver.lt(process.version, '0.11.13')) {
      test.strictEqual(promise.___customPromise, true)
      test.strictEqual(promise.Prome.___customPromise, true)
    }
    done()
  }, done)
})

test('should promisify with promise module given in `promisifiedFn.promise`', function (done) {
  var readFile = alwaysPromise(fs.readFile)
  readFile.promise = require('promise')
  var promise = readFile('package.json')

  promise.then(function (res) {
    test.strictEqual(isBuffer(res), true)
    if (semver.lt(process.version, '0.11.13')) {
      test.strictEqual(promise.___customPromise, true)
      test.strictEqual(promise.Prome.___customPromise, true)
    }
    done()
  }, done)
})
