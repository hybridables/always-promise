# [always-promise][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> Promisify, basically, everything. Generator function, callback-style or synchronous function; sync function that returns child process, stream or observable; directly passed promise, stream or child process.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]


## Install
```
npm i always-promise --save
```


## Usage
> For more use-cases see the [tests](./test.js) or try [examples](./examples)

### [alwaysPromise](./index.js#L25)
> Promisify everything!

- `<val>` **{Function|GeneratorFunction|Stream|Promise}** anything that [merz](https://github.com/hybridables/merz) accepts
- `Prom` **{Function}** custom promise module, which will be used for promisify-ing
- `return` **{Function}** which returns promise

**Example**

```js
const promisify = require('always-promise')
```

### JSON.stringify
> Specific use-case which shows correct and working handling of optional arguments.

```js
promisify(JSON.stringify)({foo: 'bar'})
.then(data => {
  console.log(data) //=> {"foo":"bar"}
}, console.error)

// result with identation
promisify(JSON.stringify)({foo: 'bar'}, null, 2).then(function (data) {
  console.log(data)
  // =>
  // {
  //   "foo": "bar"
  // }
}, console.error)
```

### callback-style and sync functions
> Again, showing correct handling of optinal arguments using native `fs` module.

```js
const fs = require('fs')

// callback function
promisify(fs.stat)('package.json')
.then(res => {
  console.log(res.isFile()) //=> true
}, console.error)

// correct handling of optional arguments
promisify(fs.readFile)('package.json')
.then(buf => {
  console.log(Buffer.isBuffer(buf)) //=> true
}, console.error)

// read json file and parse it,
// because it will be utf8 string
promisify(fs.readFileSync)('package.json', 'utf-8')
.then(JSON.parse)
.then(data => {
  console.log(data.name) //=> 'always-callback'
}, console.error)
```

### flatten multiple arguments by default
> If you pass more than two arguments to the callback, they will be flattened by default.

```js
promisify((one, two, three, cb) => {
  cb(null, one, two, 33)
})(11, 22)
.then(res => {
  console.log(Array.isArray(res)) //=> true
  console.log(res) //=> [11, 22, 33]
}, console.error)
```


## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/hybridables/always-promise/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.


## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckocore.tk][author-www-img]][author-www-url] [![keybase tunnckocore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]


[npmjs-url]: https://www.npmjs.com/package/always-promise
[npmjs-img]: https://img.shields.io/npm/v/always-promise.svg?label=always-promise

[license-url]: https://github.com/hybridables/always-promise/blob/master/LICENSE.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg


[codeclimate-url]: https://codeclimate.com/github/hybridables/always-promise
[codeclimate-img]: https://img.shields.io/codeclimate/github/hybridables/always-promise.svg

[travis-url]: https://travis-ci.org/hybridables/always-promise
[travis-img]: https://img.shields.io/travis/hybridables/always-promise.svg

[coveralls-url]: https://coveralls.io/r/hybridables/always-promise
[coveralls-img]: https://img.shields.io/coveralls/hybridables/always-promise.svg

[david-url]: https://david-dm.org/hybridables/always-promise
[david-img]: https://img.shields.io/david/hybridables/always-promise.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg


[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg