# unplugin-vue-node-patch

[![NPM version](https://img.shields.io/npm/v/unplugin-vue-node-patch?color=a1b858)](https://www.npmjs.com/package/unplugin-vue-node-patch)

Monkey patching node in vue template or jsx.

###### Features

- 💚 Supports both Vue 2 and Vue 3 out-of-the-box.
- 🦾 Support Vue SFC and jsx.
- ✨ Support for patching element node attributes.

## Install

```bash
pnpm install unplugin-vue-node-patch
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import vueNodePatch from 'unplugin-vue-node-patch/vite'

export default defineConfig({
  plugins: [
    vueNodePatch({
      /* options */
    })
  ]
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import vueNodePatch from 'unplugin-vue-node-patch/rollup'

export default {
  plugins: [
    vueNodePatch({
      /* options */
    })
  ]
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-vue-node-patch/webpack')({
      /* options */
    })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    [
      'unplugin-vue-node-patch/nuxt',
      {
        /* options */
      }
    ]
  ]
}
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-vue-node-patch/webpack')({
        /* options */
      })
    ]
  }
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import vueNodePatch from 'unplugin-vue-node-patch/esbuild'

build({
  plugins: [vueNodePatch()]
})
```

<br></details>

## Usage

Its original usage is to add the node's position in the original file to the attribute of each Vue node in development mode.

```html
<template>
  <div>
    <HelloWorld msg="Hello Vue 3.0 + Vite" />
  </div>
</template>
```

```ts
// vite.config.ts
import vueNodePatch from 'unplugin-vue-node-patch/vite'
import { markElementLocation } from 'unplugin-vue-node-patch/middlewares'

export default defineConfig({
  plugins: [
    vueNodePatch({
      middlewares: [markElementLocation()]
    })
  ]
})
```

into this

```html
<template>
  <div data-element-location="2_3">
    <HelloWorld data-element-location="3_5" msg="Hello Vue 3.0 + Vite" />
  </div>
</template>
```

## Configuration

The following show the default values of the configuration

```ts
Components({
  /**
   * RegExp or glob to match files to be transformed
   *
   * @default [/\.vue$/, /.[jt]sx$/]
   */
  include?: string | RegExp | (string | RegExp)[]

  /**
   * RegExp or glob to match files to NOT be transformed
   */
  exclude?: string | RegExp | (string | RegExp)[]

  /**
   * Match the node that does not need to be patched
   */
  filterNode?: string | RegExp | (string | RegExp)[] | NodeFilter

  /**
   * Define your patch
   */
  middlewares?: Middleware[]
})
```

## Credits

This project is inspired by [vite-plugin-vue-inspector](https://github.com/webfansplz/vite-plugin-vue-inspector) .

## License

[MIT LICENSE](./LICENSE)
