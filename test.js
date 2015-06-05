/*!
 * always-promise <https://github.com/tunnckoCore/always-promise>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var fs = require('fs')
var test = require('assertit')
var alwaysPromise = require('./index')

test('always-promise:', function () {
  test('should throw TypeError if not a function given', function (done) {
    function fixture () {
      alwaysPromise(12345)
    }

    test.throws(fixture, TypeError)
    test.throws(fixture, /is-async-function expect a function/)
    done()
  })

  test('alwaysPromise(JSON.parse)(\'{"foo":"bar"}\').then(res)', function (done) {
    var JSONParse = alwaysPromise(JSON.parse)

    JSONParse('{"foo":"bar"}')
    .then(function (res) {
      test.deepEqual(res, {foo: 'bar'})
      done()
    })
  })
  test('alwaysPromise(JSON.parse)("foo~bar~baz").catch(err)', function (done) {
    var JSONParse = alwaysPromise(JSON.parse)

    JSONParse('foo~bar~baz')
    .catch(function (err) {
      test.ifError(!err)
      test.equal(err.message, 'Unexpected token o')
      done()
    })
  })

  test('alwaysPromise(fs.readFileSync)("./package.json", "utf8").then(res)', function (done) {
    var readFile = alwaysPromise(fs.readFileSync)

    readFile('./package.json', 'utf8')
    .then(function (res) {
      test.ok(res.indexOf('tunnckoCore/always-promise') !== -1)
      done()
    })
  })
  test('alwaysPromise(fs.readFileSync)("./abc123.json", "utf8").catch(err)', function (done) {
    var readFile = alwaysPromise(fs.readFileSync)

    readFile('./pacfsdfsdfdfkage.json', 'utf8')
    .catch(function (err) {
      test.ifError(!err)
      test.ok(err)
      test.equal(err.code, 'ENOENT')
      test.equal(err.path, './pacfsdfsdfdfkage.json')
      if (err.syscall) {
        test.equal(err.syscall, 'open')
      }
      done()
    })
  })

  test('alwaysPromise(fs.stat)("./package.json").then(res)', function (done) {
    var readFile = alwaysPromise(fs.stat)

    readFile('./package.json', function (err, res) {
      test.ifError(err)
      test.ok(res.isFile())
      done()
    })
  })
  test('alwaysPromise(fs.stat)("./packasdfsdfge.json").catch(err)', function (done) {
    var readFile = alwaysPromise(fs.stat)

    readFile('./packasdfsdfge.json')
    .catch(function (err) {
      test.ifError(!err)
      test.ok(err)
      test.equal(err.code, 'ENOENT')
      test.equal(err.path, './packasdfsdfge.json')
      if (err.syscall) {
        test.equal(err.syscall, 'stat')
      }
      done()
    })
  })
})
