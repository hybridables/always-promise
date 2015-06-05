# always-promise [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> Create Bluebird Promise from given async or synchronous function. It automatically convert sync functions to async, then to promise.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]


## Install
```
npm i always-promise --save
npm test
```


## Usage
> For more use-cases see the [tests](./test.js)

```js
var alwaysPromise = require('always-promise')

var JsonParsePromise = alwaysPromise(JSON.parse)
var JsonStringifyPromise = alwaysPromise(JSON.stringify)
var readFileSyncPromise = alwaysPromise(fs.readFileSync)
var statFilePromise = alwaysPromise(fs.stat)

// it would be prettified
JsonStringifyPromise({foo: 'bar', baz: 'qux'}, null, 2)
.then(function (res) {
  console.log(res)
  //=> {
  //   "foo": "bar",
  //   "baz": "qux"
  // }
})

readFileSyncPromise('./package.json', 'utf8')
.then(JsonParsePromise)
.then(function (res) {
  // parsed package.json
  console.log(res)
  //=> { name: 'always-promise', ... }
})

statFilePromise('./index.js')
.then(function (stats) {
  console.log(stats.isFile()) //=> true
})
```


## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/always-promise/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.


## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckocore.tk][author-www-img]][author-www-url] [![keybase tunnckocore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]


[npmjs-url]: https://www.npmjs.com/package/always-promise
[npmjs-img]: https://img.shields.io/npm/v/always-promise.svg?label=always-promise

[license-url]: https://github.com/tunnckoCore/always-promise/blob/master/LICENSE.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg


[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/always-promise
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/always-promise.svg

[travis-url]: https://travis-ci.org/tunnckoCore/always-promise
[travis-img]: https://img.shields.io/travis/tunnckoCore/always-promise.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/always-promise
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/always-promise.svg

[david-url]: https://david-dm.org/tunnckoCore/always-promise
[david-img]: https://img.shields.io/david/tunnckoCore/always-promise.svg

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

[new-message-url]: https://github.com/tunnckoCore/messages
[new-message-img]: https://img.shields.io/badge/send%20me-message-green.svg
