(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery#takeout', {
    // This will run before each test in this module.
    setup: function() {
      this.$block = $('<div id="block"></div>').appendTo('#qunit-fixture');
    }
  });

  test('is a function', function () {
    expect(1);
    // Can't hurt to make sure the function exists.
    strictEqual(typeof this.$block.takeout, 'function', 'should be a function');
  });

  test('is chainable', function() {
    expect(1);
    // Not a bad test to run on collection methods.
    strictEqual(this.$block.takeout(), this.$block, 'should be chainable');
  });

  test('removes element from its place in the DOM', function () {
    expect(1);
    this.$block.takeout();
    notEqual(this.$block.parent().attr('id'), 'qunit-fixture', 'should not be a child of #qunit-fixture');
  });


}(jQuery));
