

## 1.1.1 - 2015-10-02
- Release v1.1.1 / npm@v1.1.1
- add tests for passing custom promise module through static properties
- update docs
- allow pass promise module through static properties (as seen in `redolent`)
- update package.json description
- add examples/generators.js
- fix related links

## 1.1.0 - 2015-09-29
- Release v1.1.0 / npm@v1.1.0
- use `merz` and `redolent`
- update boilerplate
- move to `hybridables` organization

Almost no breaking changes. Mostly adds ability to promisify more than sync and async functions.  
Breaking change is **only** if you relay on the previously thrown error message, because it is changed due to using `merz` and respectivly `always-done` under the hood.

## 1.0.0 - 2015-06-05
- Release v1.0.0 / npm@v1.0.0
- add keywords
- fix deps ranges
- add `related` section
- add usage example
- minify travis builds
- implement :sparkles:

## 0.0.0 - 2015-06-05
- Initial commit