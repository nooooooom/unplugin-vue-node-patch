import Vue from '@vitejs/plugin-vue2'
import VueJsx from '@vitejs/plugin-vue2-jsx'
import { resolve } from 'node:path'
import { defineConfig, normalizePath } from 'vite'
// @ts-ignore
import Unplugin from '../../src/vite'
// @ts-ignore
import { markElementLocation, markComponentPath } from '../../src/middlewares'

const rootDir = normalizePath(resolve(__dirname, './'))

export default defineConfig({
  plugins: [
    Vue(),
    VueJsx(),
    Unplugin({
      filterNode: 'a',
      middlewares: [
        markComponentPath({
          formatter: (path) => {
            return path.replace(rootDir, '')
          }
        }),
        markElementLocation()
      ]
    })
  ]
})
