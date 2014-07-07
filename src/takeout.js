/*
 * takeout
 *
 *
 * Copyright (c) 2014 Garrett Nay
 * Licensed under the MIT license.
 */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {

  $.fn.takeout = function () {

    var command, options;

    if (typeof arguments[0] === 'string') {
      command = arguments[0];
      options = arguments[1];
    } else {
      options = arguments[0];
    }

    if (command === 'undo') {
      return this.each(function () {
        var $this = $(this),
            placeholderRef = $this.data('takeout-placeholder'),
            $placeholder,
            position,
            offset;

        if (!placeholderRef) {
          throw new Error('Element does not have a reference to a placeholder.');
        }

        $placeholder = $('.takeout-placeholder').filter(function () {
          return this === placeholderRef;
        });

        if (!$placeholder.length) {
          throw new Error('Referenced placeholder does not exist in the document.');
        }

        position = $placeholder.css('position');
        offset = $placeholder.offset();

        $placeholder.replaceWith($this);

        $this.css('position', position);

        if (position !== 'static') {
          $this.offset(offset);
        }
      });
    } else {
      return this.each(function () {

        var $this = $(this),
            height = $this.height(),
            width = $this.width(),
            offset = $this.offset(),
            $placeholder = $('<div class="takeout-placeholder"></div>')
              .height(height)
              .width(width);

        $this.replaceWith($placeholder)
          .appendTo('body')
          .offset(offset)
          .data('takeout-placeholder', $placeholder.get(0));

      });
    }
  };

}));
