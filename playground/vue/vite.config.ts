import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
// @ts-ignore
import Unplugin from '../../src/vite'
// @ts-ignore
import { markElementLocation } from '../../src/middlewares/markElementLocation'

export default defineConfig({
  plugins: [
    Vue(),
    VueJsx(),
    Inspect(),
    Unplugin({
      middlewares: [
        (pacth, node) => {
          pacth.props.set('a', 1)
          return pacth
        },
        markElementLocation
      ]
    })
  ]
})
