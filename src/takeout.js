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
    return this.each(function () {

      var $this = $(this),
          $parent = $this.parent();

      $this.appendTo('body');

      $parent.append('<div class="takeout-placeholder"></div>');

    });
  };

}));
