import { BaseElementNode } from '@vue/compiler-dom'
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

export interface Options {
  include?: string | RegExp | (string | RegExp)[]
  exclude?: string | RegExp | (string | RegExp)[]
  middlewares?: Middleware[]
}

export type ParseResult = PatchInfo[]
