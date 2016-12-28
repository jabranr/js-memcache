import test from 'ava';
import JSMemcache from './index';

let cache = null;

test.beforeEach('setUp', t => {
  cache = new JSMemcache();
});

test.afterEach.always('tearDown', t => {
  cache = null;
});

test('setup constructor', t => {
  t.true(cache instanceof JSMemcache);
});

test('get default limit', t => {
  t.is(cache.getLimit(), 100);
});

test('set default limit', t => {
  cache.setLimit(75);
  t.is(cache.getLimit(), 75);
});

test('get default separator', t => {
  t.is(cache.getSeparator(), '+');
});

test('set default separator', t => {
  cache.setSeparator('|');
  t.is(cache.getSeparator(), '|');
});

test('get cache size', t => {
  t.is(cache.getSize(), 0);
});

test('add data to cache', t => {
  cache.add('foo', 'bar');
  t.is(cache.getSize(), 1);
  t.is(cache.get('foo'), 'bar');
});

test('add data with array as key', t => {
  cache.add(['foo', 'bar'], 'bar');
  t.is(cache.getSize(), 2);
  t.is(cache.get(['foo', 'bar']), 'bar');
});

test('cache limit', t => {
  cache.setLimit(2);
  cache.add('thisKey', 'will replace foo in cache');
  t.is(cache.getSize(), 2);
  t.is(cache.get('thisKey'), 'will replace foo in cache');
  t.false(cache.get('foo'));
});

test('get data from cache by key success', t => {
  cache.add('find', 'this');
  t.is(cache.get('find'), 'this');
});

test('get data from cache by key failure', t => {
  t.false(cache.get('notFind'));
});

test('update data in cache success', t => {
  let update = cache.update('find', 'that');
  t.true(update instanceof JSMemcache);
  t.is(cache.get('find'), 'that');
  t.is(cache.getSize(), 3);
});

test('update data in cache throws', t => {
  t.throws(() => {
    cache.update('bar', 'that');
  }, ReferenceError);
});

test('remove data in cache success', t => {
  let remove = cache.remove('find');
  t.true(remove instanceof JSMemcache);
  t.false(cache.get('find'));
  t.is(cache.getSize(), 2);
});

test('remove data in cache throws', t => {
  t.throws(() => {
    cache.remove('find');
  }, ReferenceError);
});

test('all data in cache', t => {
  let all = cache.all();
  t.is(typeof all, 'object');
  t.true(all.hasOwnProperty('FOO|BAR'));
  t.true(all.hasOwnProperty('THISKEY'));
});

test('get keys for data in cache', t => {
  let keys = cache.keys();
  t.is(Object.prototype.toString.call(keys).toLowerCase(), '[object array]');
  t.true(keys.indexOf('FOO|BAR') !== -1);
  t.true(keys.indexOf('THISKEY') !== -1);
});

test('clear data in cache', t => {
  cache.clear();
  t.is(cache.getSize(), 0);
  t.is(cache.keys().length, 0);
});

test('alias method for add', t => {
  cache.set('kitten', 'meow');
  t.is(cache.getSize(), 1);
  t.is(cache.get('kitten'), 'meow');
});

test('alias method for update', t => {
  cache.replace('kitten', 'woof');
  t.is(cache.getSize(), 1);
  t.is(cache.get('kitten'), 'woof');
});

