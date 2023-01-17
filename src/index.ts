import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import { MiddlewareContext, Options } from './types'
import { composeMiddlewares } from './utils/composeMiddlewares'
import { parseTemplate } from './core/parseTemplate'
import { parseJsx } from './core/parseJsx'
import { transform } from './core/transform'

export { isJSXElement, isTemplateNode } from './utils/assert'
export { composeMiddlewares } from './utils/composeMiddlewares'

export const VUE_SFC_REGEX = /\.vue$/
export const JSX_REGEX = /.[jt]sx$/

export default createUnplugin<Options | undefined>((options = {}) => {
  const { include = [VUE_SFC_REGEX, JSX_REGEX], exclude, middlewares = [] } = options

  const filter = createFilter(include, exclude)
  const middleware = composeMiddlewares(...middlewares)

  return {
    name: 'unplugin-vue-node-patch',

    enforce: 'pre',

    transformInclude(id) {
      return filter(id)
    },

    transform(code, id) {
      const context: MiddlewareContext = {
        id,
        code,
        type: 'template'
      }

      const [filepath] = id.split('?')
      if (filepath.endsWith('.jsx') || filepath.endsWith('.tsx')) {
        context.type = 'jsx'
      } else if (!filepath.endsWith('.vue')) {
        return code
      }

      // TODO: support macro usage
      // e.g. defineNodePatch<T>(input: T, type: 'template' | 'jsx'): T

      const parseResult =
        context.type === 'template'
          ? parseTemplate(code, middleware, context)
          : parseJsx(code, middleware, context)

      return transform(code, parseResult)
    }
  }
})
