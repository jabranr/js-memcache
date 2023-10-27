/**
 * JSMemcache
 *
 * Store data in memory for better performance
 * by saving on network requests.
 *
 * @author Jabran Rafique <hello@jabran.me>
 * @license MIT
 */

let _cache = {};
let _limit = 100;
let _separator = '+';
let _isOverLimit = false;
let _size = 0;

class JSMemcache {
  constructor() {
    return this;
  }

  setLimit(limit) {
    _limit = limit;
    return this;
  }

  setSeparator(separator) {
    _separator = separator;
    return this;
  }

  getLimit() {
    return _limit;
  }

  getSeparator() {
    return _separator;
  }

  getSize() {
    return _size;
  }

  add(key, val) {
    key = _getKey(key);

    /**
     * Memory management
     */
    _isOverLimit = this.getSize() >= this.getLimit() && !_isOverLimit;

    if (_isOverLimit) {
      this.remove(this.keys()[0]);
    }

    if (!this.get(key)) {
      _cache[key] = val;
      _size++;
    }
  }

  get(key) {
    key = _getKey(key);

    if (!_has(key)) {
      return false;
    }

    return _cache[key];
  }

  update(key, newValue) {
    key = _getKey(key);

    if (_has(key)) {
      _cache[key] = newValue;
      return this;
    }

    throw new ReferenceError('No data found in cache for this query.');
  }

  remove(key) {
    key = _getKey(key);

    if (_has(key)) {
      delete _cache[key];
      _size--;
      return this;
    }

    throw new ReferenceError('No data found in cache for this query.');
  }

  all() {
    return _cache;
  }

  keys() {
    return Object.keys(_cache);
  }

  clear() {
    _cache = {};
    _size = 0;
    _isOverLimit = false;
  }
}

const _has = (key) => {
  key = _getKey(key);
  return _cache.hasOwnProperty(key);
};

const _getKey = (keys) => {
  if (_is(keys, 'string')) {
    return keys.toUpperCase();
  }

  if (!_is(keys, 'array')) {
    throw new TypeError('Key must be an Array or String type.');
  }

  return keys.join(_separator).replace(/\s/gi, _separator).toUpperCase();
};

const _is = (obj, expected) => {
  let expectedLowerCase = expected.toLowerCase();
  let expectedType = `[object ${expectedLowerCase}]`;

  return Object.prototype.toString.call(obj).toLowerCase() === expectedType;
};

/**
 * Add methods aliases
 */
JSMemcache.prototype.set = JSMemcache.prototype.add;
JSMemcache.prototype.replace = JSMemcache.prototype.update;

export default JSMemcache;
