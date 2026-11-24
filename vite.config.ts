import type { BuildOptions, TerserOptions } from 'vite'

import myBanner from '@cycjimmy/config-lib/dist/chore/myBanner.js'
import terserOption from '@cycjimmy/config-lib/dist/terser/4.x/production.js'
import autoprefixer from 'autoprefixer'
import { defineConfig } from 'vite'

import pkg from './package.json' with { type: 'json' }

interface LibraryBuildOptions {
  formats: ('es' | 'umd')[]
  fileName: string
  minify?: false | 'terser'
  banner?: string | null
}

// config-lib's shared option follows terser 4's legacy `output` key. Vite 8 always
// injects `format` and terser rejects having both, so convert `output` → `format`.
// The assertion is confined to this boundary because the shared option still
// carries terser 4 era keys (`warnings`, `ie8`) that terser 5 dropped.
const { output, ...restTerserOption } = terserOption
const terserOptions = { ...restTerserOption, format: output } as TerserOptions

// Output file names follow the pkg field conventions of the old rollup configs.
const esmFileName = pkg.module.replace('dist/', '') // canvas-snow.esm.js
const umdFileName = pkg.browser.replace('dist/', '').replace('.min.js', '.js') // canvas-snow.umd.js
const umdMinFileName = pkg.browser.replace('dist/', '') // canvas-snow.umd.min.js

function libBuild({ formats, fileName, minify = false, banner = null }: LibraryBuildOptions): BuildOptions {
  return {
    target: 'es2015',
    outDir: 'dist',
    // Keep the declarations of the previous `build:types` step
    // (`npm run build` cleans dist first).
    emptyOutDir: false,
    minify,
    ...(minify === 'terser' && { terserOptions }),
    lib: {
      entry: 'src/index.ts',
      name: 'CanvasSnow',
      formats,
      fileName: () => fileName,
    },
    rollupOptions: {
      output: {
        exports: 'default',
        ...(banner && { banner }),
      },
    },
  }
}

const builds: Partial<Record<string, BuildOptions>> = {
  'esm': libBuild({
    formats: ['es'],
    fileName: esmFileName,
  }),
  'umd': libBuild({
    formats: ['umd'],
    fileName: umdFileName,
  }),
  'umd-min': libBuild({
    formats: ['umd'],
    fileName: umdMinFileName,
    minify: 'terser',
    banner: myBanner(pkg),
  }),
}

// The Pages demo is a normal HTML build of static/index.html instead of a copy of
// static/ plus a <script> tag pointing at the UMD bundle, so the dev server and
// the deployed site share one page. `root: 'static'` (set below) makes outDir
// resolve to .publish/ and drops index.html at the artifact root, where Pages
// serves it from.
const deploymentBuild: BuildOptions = {
  outDir: '../.publish',
  emptyOutDir: true,
  target: 'es2015',
}

export default defineConfig(({ mode }) => {
  const isDeployment = mode === 'deployment'
  const build = builds[mode]

  return {
    // Building from static/ keeps the deployed HTML at the artifact root.
    ...(isDeployment && { root: 'static' }),
    // Relative URLs keep the demo working under the repository subpath.
    ...(isDeployment && { base: './' }),
    // Avoid copying static/ (or any public dir) into dist and polluting .release.
    publicDir: false,
    // The dev entry lives in static/, so point `vite` at it instead of 404ing on /.
    server: {
      open: '/static/index.html',
    },
    // Only the demo page has styles; the library bundle carries no CSS, so the
    // postcss pipeline exists for the deployment build alone.
    css: {
      postcss: {
        plugins: [autoprefixer],
      },
    },
    ...(isDeployment
      ? { build: deploymentBuild }
      : (build && { build })),
  }
})
