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

/**
 * fs.readFileSync
 */

var readFile = promisify(fs.readFileSync)

readFile(path.join(__dirname, 'package.json'), 'utf-8')
.then(JSON.parse)
.then(function (data) {
  console.log(data.name) // => 'always-promise'
})
