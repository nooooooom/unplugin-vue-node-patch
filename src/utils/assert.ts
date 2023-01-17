import { JSXElementNode, TemplateElementNode } from '../types'

export function isTemplateNode(node: unknown): node is TemplateElementNode {
  return typeof node === 'object' && node !== null && (node as any).type === 1
}

export function isJSXElement(node: unknown): node is JSXElementNode {
  return typeof node === 'object' && node !== null && (node as any).type === 'JSXElement'
}
