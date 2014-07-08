# jQuery Takeout

[![Build Status](https://travis-ci.org/garrettn/jquery-takeout.svg?branch=master)](https://travis-ci.org/garrettn/jquery-takeout)

A jQuery plugin that takes an element out of its place in the DOM while keeping it in the same “physical” position on the document.

Why? To tell you the truth, there probably aren’t many good reasons for wanting to do this. In my case, I was dealing with some weird rendering glitches caused by multiple CSS transforms, so I needed a way to take an element out of its place in the DOM while still making it look like it’s in the same place.

This plugin will probably be of little use to anybody else, but if you find yourself in a similar situation as I did, read on.

## Requirements

**jQuery >= 1.7**

This plugin has been tested with jQuery 1.7.2, 1.11.1, and 2.1.1.

## Getting Started

Install with [Bower](http://bower.io):

```sh
bower install --save jquery-takeout
```

Or directly download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/garrettn/jquery-takeout/master/dist/jquery.takeout.min.js
[max]: https://raw.github.com/garrettn/jquery-takeout/master/dist/jquery.takeout.js

Load the plugin in the way that fits with your project.

### AMD (RequireJS)

(Be sure to define the path in your config.)

```js
define(['jquery', 'jquery.takeout'], function ($) {
	// Your code here
});
```

### CommonJS (e.g., Browserify, Webpack)
```js
var $ = require('jquery');
require('jquery-takeout');
```

### Script tag
```html
<script src="/path/to/jquery.js"></script>
<script src="/path/to/jquery.takeout.js"></script>
```

Don't forget to concatenate and minify your scripts!

## Usage

```js
$('#box').takeout([options]);
```

What happens is the element is taken out of its place in the DOM and appended somewhere else (to the `body` by default) and given the same offset (position) as it originally had. An invisible placeholder of the same dimensions is put in its place so the document flow isn’t changed.

**Be careful** how you style the element. If the CSS selectors depend on context, the styles might not apply when the element is taken out.

To put the element back into its original place and remove the placeholder, simply call the function again with the argument `'undo'`:

```js
$('#box').takeout('undo', [options]);
```

**Keep in mind** that since the element has been taken out of its original place in the DOM, the same selector might not work. A better strategy would be to save the object in a variable and then call the `takeout` function on it when you’re ready to undo (this also saves on costly DOM lookups):

```js
var $box = $('#box').takeout();

// Other stuff

$box.takeout('undo');
```

## Options

jQuery Takeout exposes a few options for customizing its behavior. Simply pass in an options object to the method (defaults are given below):

```js
$('#box').takeout({
  appendTo: 'body',	// anything accepted by jQuery's appendTo() method
  placeholderClass: 'takeout-placeholder'	// class(es) to apply to the plaholder element
});
```

Options can also be applied when you use `'undo'`. **This is especially important** if you have used a custom class on the placeholder element. You need to specify the same class when undoing, or else the placeholder won’t be found and the undo will fail.


## License

This project is licensed under the terms of [the MIT License](LICENSE.txt).