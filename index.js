/**
 * JSMemcache
 *
 * Store data in memory for better performance
 * by saving on network requests.
 *
 * @author Jabran Rafique <hello@jabran.me>
 * @license MIT
 */

(root => {
  "use strict";

  /**
   * @var {object}
   */
  let _cache = {};

  /**
   * @var {int}
   */
  let _limit = 100;

  /**
   * @var {string}
   */
  let _separator = '+';

  /**
   * @var {boolean}
   */
  let _isOverLimit = false;

  /**
   * @var {int}
   */
  let _size = 0;

  class JSMemcache {
    constructor() {
      return this;
    }

    /**
     * Set limit value
     *
     * @param {int} limit
     * @return {self}
     */
    setLimit(limit) {
      _limit = limit;
      return this;
    }

    /**
     * Set separator value
     *
     * @param {string} separator
     * @return {self}
     */
    setSeparator(separator) {
      _separator = separator;
      return this;
    }

    /**
     * Get limit value
     *
     * @return {int}
     */
    getLimit() {
      return _limit;
    }

    /**
     * Get separator value
     *
     * @return {string}
     */
    getSeparator() {
      return _separator;
    }

    /**
     * Get cache size
     *
     * @return {int}
     */
    getSize() {
      return _size;
    }

    /**
     * Set data to cache
     *
     * @param {array|string} key
     * @param {mixed} val
     * @return {void}
     */
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

    /**
     * Get data from cache
     *
     * @param {array|string} key
     * @return {object|boolean}
     */
    get(key) {
      key = _getKey(key);

      if (!_has(key)) {
        return false;
      }

      return _cache[key];
    }

    /**
     * Update data in cache
     *
     * @param {array|string} key
     * @param {mixed} newValue
     * @throws {ReferenceError}
     * @return {self}
     */
    update(key, newValue) {
      key = _getKey(key);

      if (_has(key)) {
        _cache[key] = newValue;
        return this;
      }

      throw new ReferenceError('No data found in cache for this query.');
    }

    /**
     * Remove data in cache
     *
     * @param {array|string} key
     * @param {mixed} newValue
     * @throws {ReferenceError}
     * @return {self}
     */
    remove(key) {
      key = _getKey(key);

      if (_has(key)) {
        delete _cache[key];
        _size--;
        return this;
      }

      throw new ReferenceError('No data found in cache for this query.');
    }

    /**
     * Get all data in cache
     *
     * @return {object}
     */
    all() {
      return _cache;
    }

    /**
     * Get all keys in cache
     *
     * @return {array}
     */
    keys() {
      return Object.keys(_cache);
    }

    /**
     * Clear all data in cache
     *
     * @return {void}
     */
    clear() {
      _cache = {};
      _size = 0;
      _isOverLimit = false;
    }
  };

  /**
   * Check if a key exists
   *
   * @scope {private}
   * @param {array|string} key
   * @return {boolean}
   */
  const _has = (key) => {
    key = _getKey(key);
    return _cache.hasOwnProperty(key);
  }

  /**
   * Make a new caching key
   *
   * @scope {private}
   * @param {array|string} keys
   * @throws {Error}
   * @return {string}
   */
  const _getKey = (keys) => {
    if (_is(keys, 'string')) {
      return keys.toUpperCase();
    }

    if (!_is(keys, 'array')) {
      throw new TypeError('Key must be an Array or String type.');
    }

    return keys.join(_separator).replace(/\s/gi, _separator).toUpperCase();
  }

  /**
   * Check for object type
   *
   * @scope {private}
   * @param {object} obj
   * @param {string} expected
   * @return {boolean}
   */
  const _is = (obj, expected) => {
    let expectedLowerCase = expected.toLowerCase();
    let expectedType = `[object ${expectedLowerCase}]`;

    return Object.prototype.toString.call(obj).toLowerCase() === expectedType;
  }

  /**
   * Add methods aliases
   */
  JSMemcache.prototype.set = JSMemcache.prototype.add;
  JSMemcache.prototype.replace = JSMemcache.prototype.update;

  /**
   * Export to the world
   */
  if (typeof define === 'function') {
    define('JSMemcache', [], JSMemcache);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = JSMemcache;
  } else {
    root.JSMemcache = JSMemcache;
  }

})(this);