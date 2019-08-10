'use strict';
var stickyHelpers = require('./regexp-sticky-helpers');

var nativeTest = RegExp.prototype.test;

var patchedTest = nativeTest;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeTest.call(re1, 'a');
  nativeTest.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

var PATCH = UPDATES_LAST_INDEX_WRONG || UNSUPPORTED_Y;

if (PATCH) {
  patchedTest = function test(str) {
    var re = this;
    return !!re.exec(str);
  };
}

module.exports = patchedTest;
