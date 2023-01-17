import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
// @ts-ignore
import Unplugin from '../../src/vite'
// @ts-ignore
import { markElementLocation } from '../../src/middlewares/markElementLocation'
// @ts-ignore
import { markComponentPath } from '../../src/middlewares/markComponentPath'

export default defineConfig({
  plugins: [
    Vue(),
    VueJsx(),
    Inspect(),
    Unplugin({
      middlewares: [markElementLocation, markComponentPath]
    })
  ]
})
