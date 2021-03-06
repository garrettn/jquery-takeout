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
      this.$fixture = $('#qunit-fixture');
      this.$block = $('<div id="block"></div>').appendTo(this.$fixture);
    },

    teardown: function () {
      this.$block.remove();
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

  test('creates a placeholder for the element', function () {
    expect(3);

    this.$fixture.prepend('<div></div>').append('<div></div>');

    var $otherChildren = this.$fixture.children().not('#block'),
        indexOfBlock = this.$block.index();

		this.$block.takeout();

    var $placeholder = this.$fixture.children().not('#block').not($otherChildren);

    ok($placeholder.length, 'should create a new child of #qunit-fixture');
    ok($placeholder.hasClass('takeout-placeholder'), 'placeholder should have default class of "takeout-placeholder"');
    strictEqual($placeholder.index(), indexOfBlock, 'placeholder should be in the original DOM position of the element');
  });

  test('gives placeholder same dimensions as element', function () {
    expect(2);
    var height = 10,
        width = 30;

    this.$block.css({height: height, width: width})
      .takeout();

    var $placeholder = this.$fixture.children().not('#block');

		strictEqual($placeholder.height(), height, 'placeholder should have same height as element');
		strictEqual($placeholder.width(), width, 'placeholder should have same width as element');
  });

  test('accounts for margins on element', function () {
    var height = 10,
        width = 30,
        margin = 5;
    this.$block.css({height: height, width: width, margin: margin})
      .takeout();

    var $placeholder = this.$fixture.children().not('#block');

		strictEqual($placeholder.outerHeight(), height + margin * 2, 'placeholder should have same height as element');
		strictEqual($placeholder.outerWidth(), width + margin * 2, 'placeholder should have same width as element');
  });

  test('positions element at original offset', function () {
    expect(2);

    var offset = this.$block.offset(),
        newOffset;

    this.$block.takeout();

    newOffset = this.$block.offset();

    strictEqual(Math.round(newOffset.top), Math.round(offset.top), 'new top offset (rounded) should equal original top offset (rounded)');
    strictEqual(Math.round(newOffset.left), Math.round(offset.left), 'new left offset (rounded) should equal original left offset (rounded)');
  });

  test('throws an error if the element has already been taken out', function () {
    expect(1);

    throws(function () {
      this.$block.takeout();
      this.$block.takeout();
    }, /Element has already been taken out\./, 'should throw an error if the element has been taken out already');
  });

  test('allows effects to be undone by calling \'undo\'', function () {
    expect(8);

    var blockElem = this.$block.get(0),
        originalOffset = this.$block.offset(),
        originalPosition = blockElem.style.position,
        originalTop = blockElem.style.top,
        originalLeft = blockElem.style.left,
        $placeholder;

    this.$block.takeout();

    $placeholder = this.$fixture.find('.takeout-placeholder');

    deepEqual(this.$block.data('takeout').placeholder, $placeholder.get(0), 'element should store placeholder in data');

    this.$block.takeout('undo');

    strictEqual(this.$block.parent().attr('id'), this.$fixture.attr('id'), 'calling \'undo\' should cause element be child of #qunit-fixture again');
    ok(!this.$fixture.find('.takeout-placeholder').length, 'calling \'undo\' should remove placeholder');
    deepEqual(this.$block.offset(), originalOffset, 'element should have same offset as before');
    strictEqual(blockElem.style.position, originalPosition, 'element should have same position element style as before');
    strictEqual(blockElem.style.top, originalTop, 'element should have same top element style as before');
    strictEqual(blockElem.style.left, originalLeft, 'element should have same left element style as before');
    ok(!this.$block.data('takeout'), 'should remove all Takeout data');
  });

  test('throws errors on \'undo\' if parameters are bad', function () {
    expect(3);

    throws(function () {
      this.$block.takeout('undo');
    }, /Element does not have any Takeout data\./, 'should throw an error if there is no stored Takeout data');

    throws(function () {
      this.$block.data({takeout: {}});
      this.$block.takeout('undo');
    }, /Element does not have a reference to a placeholder\./, 'should throw an error if there is no stored reference to a placeholder');

    throws(function () {
      this.$block.data({takeout: {placeholder: document.createElement('div')}});
      this.$block.takeout('undo');
    }, /Referenced placeholder does not exist in the document\./, 'should throw an error if the stored reference points to a placeholder that doesn\'t exist');


  });

  test('accepts configuration options', function () {
    expect(3);

    var $container = $('<div id="container"></div>')
      .appendTo(this.$fixture);

    this.$block.takeout({
      appendTo: $container,
      placeholderClass: 'to-ph'
    });

    deepEqual(this.$block.parent().get(0), $container.get(0), 'element should be appended to #container');
    ok(this.$fixture.find('.to-ph').length, 'placeholder should have class "to-ph"');

    this.$block.takeout('undo');

    ok(!this.$fixture.find('.to-ph').length, 'should replace placeholder on \'undo\' when it has a custom class');
  });

}(jQuery));
