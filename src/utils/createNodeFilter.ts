import { ElementNode, Options } from '../types'
import { isTemplateNode } from './assert'

export function createNodeFilter(filterNode: Options['filterNode']) {
  if (!filterNode) {
    return () => true
  }
  if (typeof filterNode === 'function') {
    return filterNode
  }
  const createMatcher = (id?: string | RegExp) => {
    return id instanceof RegExp
      ? (tag: string) => {
          return !id.test(tag)
        }
      : (tag: string) => {
          return id !== tag
        }
  }
  const matchers = (Array.isArray(filterNode) ? filterNode : [filterNode]).map(createMatcher)
  return (node: ElementNode) => {
    const tag = isTemplateNode(node) ? node.tag : node.type
    return matchers.some((matcher) => matcher(tag))
  }
}
