'use strict';
var $ = require('../internals/export');
var test = require('../internals/regexp-test');

$({ target: 'RegExp', proto: true, forced: /./.test !== test }, {
  test: test
});
