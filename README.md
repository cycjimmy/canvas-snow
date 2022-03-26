# Canvas Snow

![][workflows-badge-image]
[![libraries dependency status][libraries-status-image]][libraries-status-url]
[![libraries sourcerank][libraries-sourcerank-image]][libraries-sourcerank-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Release date][release-date-image]][release-url]
[![rollup][rollup-image]][rollup-url]
[![semantic-release][semantic-image]][semantic-url]
[![jest][jest-image]][jest-url]
[![npm license][license-image]][download-url]

* Generates snow in canvas. ([Demo][github-pages-url])

## Install
[![NPM version][npm-image]][npm-url]
[![NPM bundle size][npm-bundle-size-image]][npm-url]
[![npm download][download-image]][download-url]

```shell
# via npm
$ npm install @cycjimmy/canvas-snow --save

# or via yarn
$ yarn add @cycjimmy/canvas-snow
```

## Usage
```javascript
import CanvasSnow from '@cycjimmy/canvas-snow';

const canvasSnow = new CanvasSnow({
  ...options
}).init();
canvasSnow.start();
```

* `options`
  * `context`: [Element|String] Context Wrapper Element.
  * `cell`: [Number] The maximum number of snow in the canvas.
  * `width`: [Number|String] Set canvas width with percentage and px units. Default `'100%'`.
  * `height`: [Number|String] Set canvas height with percentage and px units. Default `'100%'`.

* Methods:
  * `init()`: Initialize to generate random snow.
  * `start()`: Start snow animation.
  * `stop()`: Stop snow animation.
  * `clear()`: Clear Generated random snow.

### Use in browser
```html
<div id="snowWrapper"></div>
<script src="canvas-snow.umd.min.js"></script>
<script>
  const canvasSnow = new CanvasSnow(source, {
    context: '#snowWrapper',
    [...options]
  }).init();

  canvasSnow.start();
</script>
```

## CDN
[![jsdelivr][jsdelivr-image]][jsdelivr-url]

To use via a CDN include this in your HTML:
```text
<script src="https://cdn.jsdelivr.net/npm/@cycjimmy/canvas-snow@3/dist/canvas-snow.umd.min.js"></script>
```

<!-- Links: -->
[npm-image]: https://img.shields.io/npm/v/@cycjimmy/canvas-snow
[npm-url]: https://npmjs.org/package/@cycjimmy/canvas-snow
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/min/@cycjimmy/canvas-snow

[download-image]: https://img.shields.io/npm/dt/@cycjimmy/canvas-snow
[download-url]: https://npmjs.org/package/@cycjimmy/canvas-snow

[jsdelivr-image]: https://img.shields.io/jsdelivr/npm/hy/@cycjimmy/canvas-snow
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/@cycjimmy/canvas-snow

[workflows-badge-image]: https://github.com/cycjimmy/canvas-snow/workflows/Test%20CI/badge.svg

[libraries-status-image]: https://img.shields.io/librariesio/release/npm/@cycjimmy/canvas-snow
[libraries-sourcerank-image]: https://img.shields.io/librariesio/sourcerank/npm/@cycjimmy/canvas-snow
[libraries-status-url]: https://libraries.io/github/cycjimmy/canvas-snow
[libraries-sourcerank-url]: https://libraries.io/npm/@cycjimmy%2Fcanvas-snow

[coverage-image]: https://img.shields.io/coveralls/github/cycjimmy/canvas-snow
[coverage-url]: https://coveralls.io/github/cycjimmy/canvas-snow

[release-date-image]: https://img.shields.io/github/release-date/cycjimmy/canvas-snow
[release-url]: https://github.com/cycjimmy/canvas-snow/releases

[rollup-image]: https://img.shields.io/github/package-json/dependency-version/cycjimmy/canvas-snow/dev/rollup
[rollup-url]: https://github.com/rollup/rollup

[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

[jest-image]: https://img.shields.io/badge/tested_with-jest-99424f.svg
[jest-url]: https://github.com/facebook/jest

[license-image]: https://img.shields.io/npm/l/@cycjimmy/canvas-snow

[github-pages-url]: https://cycjimmy.github.io/canvas-snow/
