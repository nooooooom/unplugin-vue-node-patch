import { resolve } from 'node:path'
import { normalizePath } from 'vite'
import type { ElementNode, Middleware } from '../types'

export const COMPONENT_PATH_ATTR = 'data-component-path'

export interface MarkComponentPathOptions {
  /**
   * Whether to keep only the path part
   *
   * @default true
   */
  cleanPath?: boolean

  /**
   * Specifies the format of the path
   */
  formatter?: (path: string, node: ElementNode) => string
}

export const resolveAbsolutePath = (id: string) => resolve(process.cwd(), id)

export const markComponentPath = (options: MarkComponentPathOptions = {}) => {
  const { cleanPath = true, formatter } = options

  return <Middleware>((patch, node, context) => {
    const filename = cleanPath ? context.id.split('?', 2)[0] : context.id
    const path = normalizePath(resolveAbsolutePath(filename))
    patch.props.set(COMPONENT_PATH_ATTR, formatter ? formatter(path, node) : path)
  })
}
