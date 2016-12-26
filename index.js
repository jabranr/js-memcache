/**
 * JSMemcache
 *
 * Store data in memory for better performance
 * by saving on network requests.
 *
 * @author Jabran Rafique <hello@jabran.me>
 * @license MIT
 */

(function(root) {
  "use strict";

  /**
   * @var {object}
   */
  var _cache = {};

  /**
   * @var {int}
   */
  var _limit = 100;

  /**
   * @var {string}
   */
  var _separator = '+';

  /**
   * @var {boolean}
   */
  var _isOverLimit = false;

  /**
   * @var {int}
   */
  var _size = 0;

  /**
   * Class constructor
   */
  function JSMemcache() {
    return this;
  }

  /**
   * Set limit value
   *
   * @param {int} limit
   * @return {self}
   */
  JSMemcache.prototype.setLimit = function(limit) {
    _limit = limit;
    return this;
  }

  /**
   * Set separator value
   *
   * @param {string} separator
   * @return {self}
   */
  JSMemcache.prototype.setSeparator = function(separator) {
    _separator = separator;
    return this;
  }

  /**
   * Get limit value
   *
   * @return {int}
   */
  JSMemcache.prototype.getLimit = function() {
    return _limit;
  }

  /**
   * Get separator value
   *
   * @return {string}
   */
  JSMemcache.prototype.getSeparator = function() {
    return _separator;
  }

  /**
   * Get cache size
   *
   * @return {int}
   */
  JSMemcache.prototype.getSize = function() {
    return _size;
  }

  /**
   * Set data to cache
   *
   * @param {array|string} key
   * @param {mixed} val
   * @return {void}
   */
  JSMemcache.prototype.add = function(key, val) {
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
  JSMemcache.prototype.get = function(key) {
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
  JSMemcache.prototype.update = function(key, newValue) {
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
  JSMemcache.prototype.remove = function(key) {
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
  JSMemcache.prototype.all = function() {
    return _cache;
  }

  /**
   * Get all keys in cache
   *
   * @return {array}
   */
  JSMemcache.prototype.keys = function() {
    return Object.keys(_cache);
  }

  /**
   * Clear all data in cache
   *
   * @return {void}
   */
  JSMemcache.prototype.clear = function() {
    _cache = {};
    _size = 0;
    _isOverLimit = false;
  }

  /**
   * Check if a key exists
   *
   * @scope {private}
   * @param {array|string} key
   * @return {boolean}
   */
  function _has(key) {
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
  function _getKey(keys) {
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
  function _is(obj, exptected) {
    return Object.prototype.toString.call(obj).toLowerCase() === '[object ' + exptected.toLowerCase() + ']';
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