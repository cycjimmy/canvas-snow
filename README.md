# Canvas Snow

[![Test CI][workflows-badge-image]][workflows-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Release date][release-date-image]][release-url]
[![vite][vite-image]][vite-url]
[![vitest][vitest-image]][vitest-url]
[![semantic-release][semantic-image]][semantic-url]
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

The package is ESM only and ships its own type declarations, so it works with a
bundler or a native `import` without any extra setup.

## Usage
```javascript
import CanvasSnow from '@cycjimmy/canvas-snow'

const canvasSnow = new CanvasSnow({
  ...options
}).init()
canvasSnow.start()
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
<div class="snow-wrapper"></div>
<script src="canvas-snow.umd.min.js"></script>
<script>
  const canvasSnow = new CanvasSnow({
    context: '.snow-wrapper',
    cell: 30
  }).init()

  canvasSnow.start()
</script>
```

## CDN
[![jsdelivr][jsdelivr-image]][jsdelivr-url]

To use via a CDN include this in your HTML:
```text
<script src="https://cdn.jsdelivr.net/npm/@cycjimmy/canvas-snow@4/dist/canvas-snow.umd.min.js"></script>
```

## Migration to v4

Version 4 replaces the whole build toolchain (rollup/babel/jest → vite/vitest/typescript)
and drops the CommonJS bundle. Consumers upgrading from v3 need to know about
the following changes.

### No CommonJS bundle

`dist/canvas-snow.cjs` is gone, and the `require` condition was removed from
`exports`. Use `import` from ESM code:

```javascript
import CanvasSnow from '@cycjimmy/canvas-snow'
```

A CommonJS file can still load the package through dynamic `import()`, which
resolves to the module namespace, so the constructor is on `.default`:

```javascript
const { default: CanvasSnow } = await import('@cycjimmy/canvas-snow')
```

### Bundle and browser support

* `main`, `module` and the `default` export condition all point at
  `dist/canvas-snow.esm.js`. The UMD builds (`canvas-snow.umd.js` and
  `canvas-snow.umd.min.js`) are unchanged for `<script>` tags and CDNs.
* Every output targets ES2015, which drops the IE support the old babel build
  still provided.
* Type declarations are published for the first time (`dist/index.d.ts`).
* The runtime dependency `@cycjimmy/awesome-js-funcs` moved to v5 and is bundled
  into the output, so nothing extra is installed.

### Unchanged behaviour

The public API, the UMD global name (`CanvasSnow`), the three bundle file names
and the animation itself (13ms frame interval, sizing rules, drawing) are
identical to v3.

The only visible surface reduction is that `_initCanvas`, `_newSnow` and
`_getRandom` became private implementation details; they were never documented
and should not be called from the outside.

### Requirements

Node.js `^22.18.0 || >=24.11.0` for development and for the release tooling.

<!-- Links: -->
[npm-image]: https://img.shields.io/npm/v/@cycjimmy/canvas-snow
[npm-url]: https://npmjs.org/package/@cycjimmy/canvas-snow
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/min/@cycjimmy/canvas-snow

[download-image]: https://img.shields.io/npm/dt/@cycjimmy/canvas-snow
[download-url]: https://npmjs.org/package/@cycjimmy/canvas-snow

[jsdelivr-image]: https://img.shields.io/jsdelivr/npm/hy/@cycjimmy/canvas-snow
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/@cycjimmy/canvas-snow

[workflows-badge-image]: https://github.com/cycjimmy/canvas-snow/workflows/Test%20CI/badge.svg
[workflows-url]: https://github.com/cycjimmy/canvas-snow/actions/workflows/nodeTestCI.yml

[coverage-image]: https://img.shields.io/coveralls/github/cycjimmy/canvas-snow
[coverage-url]: https://coveralls.io/github/cycjimmy/canvas-snow

[release-date-image]: https://img.shields.io/github/release-date/cycjimmy/canvas-snow
[release-url]: https://github.com/cycjimmy/canvas-snow/releases

[vite-image]: https://img.shields.io/badge/bundled_with-vite-646cff
[vite-url]: https://vite.dev

[vitest-image]: https://img.shields.io/badge/tested_with-vitest-6e9f18
[vitest-url]: https://vitest.dev

[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

[license-image]: https://img.shields.io/npm/l/@cycjimmy/canvas-snow

[github-pages-url]: https://cycjimmy.github.io/canvas-snow/
