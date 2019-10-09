# Canvas Snow

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![David deps][david-image]][david-url]
[![devDependencies Status][david-dev-image]][david-dev-url]
[![npm download][download-image]][download-url]
[![jsdelivr][jsdelivr-image]][jsdelivr-url]
[![npm license][license-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@cycjimmy/canvas-snow.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@cycjimmy/canvas-snow
[travis-image]: https://img.shields.io/travis/cycjimmy/canvas-snow.svg?style=flat-square
[travis-url]: https://travis-ci.org/cycjimmy/canvas-snow
[david-image]: https://img.shields.io/david/cycjimmy/canvas-snow.svg?style=flat-square
[david-url]: https://david-dm.org/cycjimmy/canvas-snow
[david-dev-image]: https://david-dm.org/cycjimmy/canvas-snow/dev-status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/cycjimmy/canvas-snow?type=dev
[download-image]: https://img.shields.io/npm/dm/@cycjimmy/canvas-snow.svg?style=flat-square
[download-url]: https://npmjs.org/package/@cycjimmy/canvas-snow
[jsdelivr-image]: https://data.jsdelivr.com/v1/package/npm/@cycjimmy/canvas-snow/badge
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/@cycjimmy/canvas-snow
[license-image]: https://img.shields.io/npm/l/@cycjimmy/canvas-snow.svg?style=flat-square

Generates snow in canvas. ([Releases](https://github.com/cycjimmy/canvas-snow/releases) | [Demo](https://cycjimmy.github.io/canvas-snow/))

## Install
```shell
$ npm install @cycjimmy/canvas-snow --save
# or
$ yarn add @cycjimmy/canvas-snow
```

## Use
  ```javascript
  import CanvasSnow from '@cycjimmy/canvas-snow';
  # OR
  const CanvasSnow = require('@cycjimmy/canvas-snow');
  ```

  ```javascript
  const canvasSnow = new CanvasSnow({
    [...options]
  }).init();
  canvasSnow.start();
  ```

* options
  * `context`: [Element|String] Context Wrapper Element.
  * `cell`: [Number] The maximum number of snow in the canvas.
  * `width`: [Number|String] Set canvas width with percentage and px units. Default `'100%'`.
  * `height`: [Number|String] Set canvas height with percentage and px units. Default `'100%'`.

* function
  * `init()`: Initialize to generate random snow.
  * `start()`: Start snow animation.
  * `stop()`: Stop snow animation.
  * `clear()`: Clear Generated random snow.

### Use in browser
```html
<div id="snowWrapper"></div>
<script src="canvas-snow.min.js"></script>
<script>
  var canvasSnow = new CanvasSnow(source, {
    context: '#snowWrapper',
    [...options]
  }).init();

  canvasSnow.start();
</script>
```

## CDN
To use via a CDN include this in your html:
```text
<script src="https://cdn.jsdelivr.net/npm/@cycjimmy/canvas-snow@1/build/canvas-snow.min.js"></script>
```

