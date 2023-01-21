import { createTransformContext, parse, traverseNode } from '@vue/compiler-dom'
import { ParseContext, ParseResult } from '../types'
import { createPatch } from './createPatch'

export function parseTemplate(code: string, context: ParseContext): ParseResult {
  const { nodeFilter, middleware, middlewareContext } = context
  const result = <ParseResult>[]

  const root = parse(code)
  const templateBlocks = root.children.filter(
    (child) => child.type === 1 /** NodeTypes.ELEMENT */ && child.tag === 'template'
  )
  if (!templateBlocks.length) {
    return result
  }

  root.children = templateBlocks

  let ignoreTemplate = true
  const transformContext = createTransformContext(root, {
    nodeTransforms: [
      (node) => {
        if (node.type === 1 && nodeFilter(node)) {
          if (ignoreTemplate && node.tag === 'template') {
            ignoreTemplate = false
            return
          }
          const patch = createPatch()
          result.push({
            tag: node.tag,
            start: node.loc.start.offset,
            patch: middleware(patch, node, middlewareContext) || patch
          })
        }
      }
    ]
  })
  traverseNode(root, transformContext)

  return result
}
