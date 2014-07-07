/*! takeout - v0.0.2 - 2014-07-07
* https://github.com/garrettn/jquery-takeout
* Copyright (c) 2014 Garrett Nay; Licensed MIT */
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
        .offset(offset);

    });
  };

}));
