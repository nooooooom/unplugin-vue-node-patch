import { parse, traverse } from '@babel/core'
import jsx from '@vue/babel-plugin-jsx'
// @ts-ignore missing type
import typescript from '@babel/plugin-transform-typescript'
import { JSXElementNode, Middleware, MiddlewareContext, ParseResult } from '../types'
import { createPatch } from './createPatch'

export function parseJsx(
  code: string,
  middleware: Middleware,
  context: MiddlewareContext
): ParseResult {
  const result = <ParseResult>[]

  const ast = parse(code, {
    babelrc: false,
    plugins: [jsx, [typescript, { isTSX: true, allowExtensions: true }]]
  })
  console.log(ast)
  traverse(ast, {
    enter({ node }) {
      if (node.type === 'JSXElement') {
        const patch = createPatch()
        result.push({
          tag: resolveElementTag(node.openingElement.name),
          start: node.start!,
          patch: middleware(createPatch(), node, context) || patch
        })
      }
    }
  })

  return result
}

function resolveElementTag(name: JSXElementNode['openingElement']['name']): string {
  switch (name.type) {
    case 'JSXIdentifier':
      return name.name
    case 'JSXMemberExpression':
      return `${resolveElementTag(name.object)}.${resolveElementTag(name.property)}`
    case 'JSXNamespacedName':
      return name.name.name
  }
}
