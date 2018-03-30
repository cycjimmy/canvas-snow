# Canvas Snow

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![David deps][david-image]][david-url]
[![devDependencies Status][david-dev-image]][david-dev-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![jsdelivr][jsdelivr-image]][jsdelivr-url]
[![npm license][license-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/canvas-snow.svg?style=flat-square
[npm-url]: https://npmjs.org/package/canvas-snow
[travis-image]: https://img.shields.io/travis/cycdpo/canvas-snow.svg?style=flat-square
[travis-url]: https://travis-ci.org/cycdpo/canvas-snow
[david-image]: https://img.shields.io/david/cycdpo/canvas-snow.svg?style=flat-square
[david-url]: https://david-dm.org/cycdpo/canvas-snow
[david-dev-image]: https://david-dm.org/cycdpo/canvas-snow/dev-status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/cycdpo/canvas-snow?type=dev
[node-image]: https://img.shields.io/badge/node.js-%3E=_6.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/canvas-snow.svg?style=flat-square
[download-url]: https://npmjs.org/package/canvas-snow
[jsdelivr-image]: https://data.jsdelivr.com/v1/package/npm/canvas-snow/badge
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/canvas-snow
[license-image]: https://img.shields.io/npm/l/canvas-snow.svg?style=flat-square

Generates snow in canvas. ([Releases](https://github.com/cycdpo/canvas-snow/releases) | [Demo](https://cycdpo.github.io/canvas-snow/))

## Install
```shell
$ npm install canvas-snow --save
# or
$ yarn add canvas-snow
```

## Use
  ```javascript
  import CanvasSnow from 'canvas-snow';
  # OR
  let CanvasSnow = require('canvas-snow');
  ```

  ```javascript
  let canvasSnow = new CanvasSnow({
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
<script src="CanvasSnow.min.js"></script>
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
<script src="https://cdn.jsdelivr.net/npm/canvas-snow@0/build/CanvasSnow.min.js"></script>
```

