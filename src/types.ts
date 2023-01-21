import type { BaseElementNode } from '@vue/compiler-dom'
import type { Node as BabelNode } from '@babel/core'

export interface Patch {
  props: Map<string, any>
}

export interface PatchInfo {
  tag: string
  start: number
  patch: Patch
}

export type TemplateElementNode = BaseElementNode

export type JSXElementNode = BabelNode & { type: 'JSXElement' }

export type ElementNode = TemplateElementNode | JSXElementNode

export type NodeFilter = (node: ElementNode) => unknown

export interface ParseContext {
  nodeFilter: NodeFilter
  middleware: Middleware
  middlewareContext: MiddlewareContext
}

export interface MiddlewareContext {
  id: string
  type: 'template' | 'jsx'
  code: string
}

export type Middleware = (
  patch: Patch,
  node: ElementNode,
  context: MiddlewareContext
) => Patch | void

export type ParseResult = PatchInfo[]

export interface Options {
  /**
   * RegExp or glob to match files to be transformed
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

  middlewares?: Middleware[]
}
