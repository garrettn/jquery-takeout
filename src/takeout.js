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

    var command, options, settings;

    if (typeof arguments[0] === 'string') {
      command = arguments[0];
      options = arguments[1];
    } else {
      options = arguments[0];
    }

    settings = $.extend({
      appendTo: 'body',
      placeholderClass: 'takeout-placeholder'
    }, options);

    if (command === 'undo') {
      return this.each(function () {
        var $this = $(this),
            data = $this.data('takeout'),
            $placeholder,
            position,
            offset;

        if (!data) {
          throw new Error('Element does not have any Takeout data.');
        }

        if (!data.placeholder) {
          throw new Error('Element does not have a reference to a placeholder.');
        }

        $placeholder = $('.' + settings.placeholderClass).filter(function () {
          return this === data.placeholder;
        });

        if (!$placeholder.length) {
          throw new Error('Referenced placeholder does not exist in the document.');
        }

        position = $placeholder.css('position');
        offset = $placeholder.offset();

        $placeholder.replaceWith($this);

        $this.removeData('takeout')
          .css('position', position);

        if (position !== 'static') {
          $this.offset(offset);
        }
      });
    } else {
      return this.each(function () {

        var $this = $(this),
            height = $this.outerHeight(true),
            width = $this.outerWidth(true),
            offset = $this.offset(),
            $placeholder = $('<div class="' + settings.placeholderClass + '"></div>')
              .height(height)
              .width(width);

        $this.replaceWith($placeholder)
          .appendTo(settings.appendTo)
          .offset(offset)
          .data({takeout: {
            placeholder: $placeholder.get(0)
          }});

      });
    }
  };

}));
