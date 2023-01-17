import { createTransformContext, parse, traverseNode } from '@vue/compiler-dom'
import { Middleware, MiddlewareContext, ParseResult } from '../types'
import { createPatch } from './createPatch'

export function parseTemplate(
  code: string,
  middleware: Middleware,
  context: MiddlewareContext
): ParseResult {
  const result = <ParseResult>[]

  const root = parse(code)
  root.children.filter(
    (child) => child.type === 1 /** NodeTypes.ELEMENT */ && child.tag === 'template'
  )

  let ignoreTemplate = true
  const transformContext = createTransformContext(root, {
    nodeTransforms: [
      (node) => {
        if (node.type === 1) {
          if (ignoreTemplate && node.tag === 'template') {
            ignoreTemplate = false
            return
          }
          const patch = createPatch()
          result.push({
            tag: node.tag,
            start: node.loc.start.offset,
            patch: middleware(patch, node, context) || patch
          })
        }
      }
    ]
  })
  traverseNode(root, transformContext)

  return result
}
