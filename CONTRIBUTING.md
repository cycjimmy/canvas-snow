# Contributing

The repository is released under the MIT license, and follows a standard Github development process, using Github tracker for issues and merging pull requests into main.

## Requirements

* Node.js `^22.18.0 || >=24.11.0`, the same range as `engines` in `package.json` (CI runs the test matrix on 22 and 24)
* npm 10+

## Development

```shell
$ npm install
$ npm run dev          # Vite dev server, opens static/index.html
$ npm run type-check   # tsc --noEmit over src, __test__, __mocks__, tasks and the configs
$ npm run lint         # ESLint (flat config, @antfu/eslint-config)
$ npm run lint:style   # Stylelint for src/**/*.{css,scss}
$ npm test             # Vitest
$ npm run test:coverage # Vitest with V8 coverage (coverage/lcov.info for Coveralls, 90% gate)
$ npm run package      # build dist/ and assemble .release/
```

`static/index.html` is the only page: its module script imports `src/` and
`src/styles/demo.scss` directly, so the dev server and the GitHub Pages demo
share one page. `npm run dev` opens `/static/index.html`; `build:deployment`
builds that same file with `static/` as the Vite root, which is what puts
`index.html` at the root of the `.publish` artifact.

The demo stylesheet is imported by the page only. The library entry never
touches it, so consumers do not receive the demo reset or the wrapper sizing.

## TypeScript specifics

* `tsconfig.json` type-checks everything (`noEmit`) and is the config the CI
  `type-check` step uses. `tsconfig.build.json` is the declaration-only config
  that writes `dist/*.d.ts` during the build.
* Internal relative imports in `src/` carry a `.js` extension (`./Snow.js`), so
  the emitted `index.d.ts` also resolves under `moduleResolution` values other
  than `bundler`. Vite maps those specifiers back to the `.ts` files.
* `tasks/*.ts` are executed by Node's built-in type stripping, so they may only
  use syntax that can be erased: no `enum`, `namespace` or constructor parameter
  properties. `erasableSyntaxOnly` enforces this during `type-check`, and Node's
  ESM resolver requires relative imports to carry the `.ts` extension.
* `release.config.js` stays JavaScript on purpose: semantic-release loads it
  through cosmiconfig, whose TypeScript loader resolves `typescript` from
  semantic-release's own install tree (inside the action) rather than from this
  project.
* `src/types/*.d.ts` holds the ambient declaration for
  `@cycjimmy/awesome-js-funcs`, which ships no types. `@cycjimmy/config-lib`
  needs no shim: its v4 build publishes declarations alongside every entry.

## Build outputs

`npm run build` writes into `dist/`:

| File | Format | Purpose |
| --- | --- | --- |
| `canvas-snow.esm.js` | ESM | `main`, `module` and the `exports` entry (bundlers, `import`) |
| `canvas-snow.umd.js` | UMD | unminified browser build for `<script>` tags |
| `canvas-snow.umd.min.js` | UMD | minified browser/CDN build, attached to the GitHub release |
| `index.d.ts` (+ the referenced module declarations) | Types | declarations for `types` and the `exports` `types` condition |

`npm run build` runs `build:types` (`tsc -p tsconfig.build.json`) before the
three Vite builds; Vite runs with `emptyOutDir: false`, so the declarations
survive the JS builds.

`npm run build:deployment` builds `static/index.html` as a regular Vite app into
`.publish/` (`base: './'` so it works under the repository subpath). The
`Deploy To GitHub Pages` workflow uploads `.publish` as a Pages artifact and
publishes it with `actions/deploy-pages`. Three steps guard that handover: the
artifact of an earlier attempt is deleted first (`deploy-pages` refuses to pick
between two artifacts of the same name), the new artifact is polled for before
the deploy runs (the action has been seen looking it up before the upload was
visible), and a failed deploy is retried once.

## Repository settings required by the deployment

The Pages deployment cannot be fully expressed in code, so the switch itself lives in the repository settings:

1. **Settings → Pages → Build and deployment → Source**: select **GitHub Actions**. With *Deploy from a branch* selected, `actions/deploy-pages` refuses to run, because no Pages site is served from the artifact flow.
2. `ACCESS_TOKEN` and the `gh-pages` branch are no longer used: the site is uploaded as an artifact and published with the workflow's own OIDC token, so no stored credential is involved. Both can be removed once the first deployment from `main` has succeeded.

## Repository settings required by the release

`@semantic-release/npm` publishes through npm trusted publishing, so no `NPM_TOKEN` secret exists:

1. **npm → Package → Settings → Trusted publishing**: add a GitHub Actions publisher with `cycjimmy` as the owner, `canvas-snow` as the repository, `release.yml` as the workflow filename and no environment.
2. The `release` job needs `id-token: write`, which the workflow already declares.

## Repository settings required by the bots

`.github/workflows/dependabotAutoMerge.yml` merges non-major Dependabot pull requests automatically. Three settings cannot be expressed in code and must be enabled by a maintainer:

1. **Settings → Actions → General → Workflow permissions**: choose *Read and write permissions*. Dependabot opens its pull requests from branches inside this repository, which is why the `pull_request` event can hand `GITHUB_TOKEN` a write token there. Pull requests from forks stay read-only, and the workflow skips them through the `head.repo.full_name` guard.
2. **Settings → General**: enable *Allow auto-merge*.
3. **Branch protection on `main`**: block force pushes and deletions, but leave *Require status checks to pass before merging* **off**. `semantic-release` pushes `chore(release): … [skip ci]` straight to `main`, and GitHub rejects that push while a required check is configured. A repository owned by a personal account cannot add the GitHub Actions app to a ruleset bypass list either, so there is no way to have both.

The CI gate for Dependabot lives in `dependabotAutoMerge.yml` instead: it polls `gh pr checks` for the expected check names, squash merges only after they pass, and confirms the pull request reached `MERGED` before it asks for the Pages deployment. `Test CI` reports one check per matrix cell (`test (22, ubuntu-latest)` and so on), so the `test-status` job aggregates them into a single `Test CI Summary` check that is easy to read.

`issueBot.yml` and `stale.yml` label and reply on issues, so the labels they use must exist in the repository: `bug`, `enhancement`, `question`, `needs-info`, `triaged`, `stale`, `dependencies` and `ci`.

## Release process

Commits follow [Conventional Commits](https://www.conventionalcommits.org/): a
`feat!:` subject or a `BREAKING CHANGE:` footer produces a major release, and
`chore(deps):` commits from Dependabot do not produce a version at all.

The `Release` workflow runs on `main` (and on the prerelease branches), builds
`.release/`, publishes it to npm and to the GitHub Package Registry, pushes the
`v<major>` branch and attaches `dist/canvas-snow.umd.min.js` to the GitHub
release. `docs/CHANGELOG.md` is generated from the commit messages and should
not be edited by hand.
