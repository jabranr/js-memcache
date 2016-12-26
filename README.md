# JSMemcache [![Build Status](https://travis-ci.org/jabranr/js-memcache.svg?branch=master)](https://travis-ci.org/jabranr/js-memcache)

Store data in memory for better performance by saving on network requests.

# Installation

#### Using [npm](https://npmjs.org):

```shell
$ npm install js-memcache --save-dev
```

#### Using [bower](https://bower.io):

```shell
$ bower install js-memcache --save-dev
```

#### In browser:
`JSMemcache` is available via namespace `JSMemcache` in browsers' global scope i.e.

```html
<script src="path/to/JSMemcache.js"></script>
<script>
  var jsMemcache = new JSMemcache(); // available via window.JSMemcache
  ...
</script>
```

#### In node / Using CommonJS:
`JSMemcache` can be setup in node as following i.e.

```javascript
var JSMemcache = require('JSMemcache');
var jsMemcache = new JSMemcache();
...
```

#### Using AMD (RequireJS):
`JSMemcache` can be setup as following using RequireJS i.e.

```javascript
require(['path/to/JSMemcache'], function(JSMemcache) {
  var jsMemcache = new JSMemcache();
  ...
});
```

# API

JSMemcache exposes following API:

#### `.setLimit(limit {int})`
Set cache maximum limit. Default is set to 100 entries.

#### `.setSeparator(separator {string})`
Set a key separator for each entry in cache. Default is `+`.

#### `.getLimit()`
Get cache's current limit.

#### `.getSeparator()`
Get cache's current separator.

#### `.getSize()`
Get cache's current size.

#### `.add(key {string|array}, value {mixed})`
Add a new entry into cache as key value pair. Throws a `TypeError` if key is neither a `string` nor an `array`.

#### `.get(key {string|array})`
Get an entry by key from cache.

#### `.update(key {string|array}, value {mixed})`
Update an entry by key in cache. Throws a `ReferenceError` if key does not exist in cache.

#### `.remove(key {string|array})`
Remove an entry by key from cache. Throws a `ReferenceError` if key does not exist in cache.

#### `.all()`
Get list of all entries in cache.

#### `.keys()`
Get list of keys for all entries in cache.

#### `.clear()`
Clear all data in cache and remove all entries.

#### `.set(key {string|array}, value {mixed})`
An alias for `.add()`

#### `.replace(key {string|array}, value {mixed})`
An alias for `.update()`

# Issues / Contributing

If you find an issue or wish to suggest any improvements then use the [issue tracker](https://github.com/jabranr/js-memcache/issues/new) to file an issue. Please provide as much possible details in there. Even better that you can submit a pull request for your issue if you already have a solution in mind.

Contribution is most welcome. To cotribute, fork the repository and branch out from `master` for your changes. Make sure you update/add tests. This repository uses the fantastic and super easy-to-use testing framework [AVA](https://github.com/avajs/ava). Once ready [open a pull request](https://github.com/jabranr/js-memcache/compare).

# License
MIT License
&copy; 2016 &ndash; Jabran Rafique