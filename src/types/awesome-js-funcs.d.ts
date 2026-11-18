// `@cycjimmy/awesome-js-funcs` ships no type declarations. This shim describes
// only the subpath the library imports, so the rest of the repository can stay
// under `strict` without a blanket `any`.
declare module '@cycjimmy/awesome-js-funcs/judgeBasic' {
  export function isString(value: unknown): value is string
}
