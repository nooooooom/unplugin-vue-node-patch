import { resolve } from 'node:path'
import { normalizePath as viteNormalizePath } from 'vite'
import type { ElementNode, Middleware } from '../types'

export const COMPONENT_PATH_ATTR = 'data-component-path'

export interface MarkComponentPathOptions {
  normalizePath?: (path: string, node: ElementNode) => string
}

export const resolveAbsolutePath = (id: string) => resolve(process.cwd(), id)

export const markComponentPath = (options: MarkComponentPathOptions = {}) => {
  const { normalizePath } = options

  return <Middleware>((patch, node, context) => {
    const path = viteNormalizePath(resolveAbsolutePath(context.id))
    patch.props.set(COMPONENT_PATH_ATTR, normalizePath ? normalizePath(path, node) : path)
  })
}
