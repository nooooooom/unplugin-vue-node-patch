import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import { MiddlewareContext, Options, ParseContext } from './types'
import { composeMiddlewares } from './utils/composeMiddlewares'
import { parseTemplate } from './core/parseTemplate'
import { parseJsx } from './core/parseJsx'
import { transform } from './core/transform'
import { createNodeFilter } from './utils/createNodeFilter'

export { isJSXElement, isTemplateNode } from './utils/assert'
export { composeMiddlewares } from './utils/composeMiddlewares'

export const VUE_SFC_REGEX = /\.vue$/
export const JSX_REGEX = /.[jt]sx$/

export default createUnplugin<Options | undefined>((options = {}) => {
  const { include = [VUE_SFC_REGEX, JSX_REGEX], exclude, filterNode, middlewares = [] } = options

  const filter = createFilter(include, exclude)
  const nodeFilter = createNodeFilter(filterNode)
  const middleware = composeMiddlewares(...middlewares)

  return {
    name: 'unplugin-vue-node-patch',

    enforce: 'pre',

    transformInclude(id) {
      return filter(id)
    },

    transform(code, id) {
      const middlewareContext: MiddlewareContext = {
        id,
        code,
        type: 'template'
      }
      const parseContext: ParseContext = {
        nodeFilter,
        middleware,
        middlewareContext
      }

      const [filepath] = id.split('?', 2)
      // use id for script blocks in Vue SFCs (e.g. `App.vue?vue&type=script&lang.jsx`)
      // use filepath for plain jsx files (e.g. App.jsx)
      if (id.endsWith('.jsx') || id.endsWith('.tsx')) {
        middlewareContext.type = 'jsx'
      } else if (!filepath.endsWith('.vue')) {
        return code
      }

      // TODO: support macro usage
      // e.g. defineNodePatch<T>(input: T, type: 'template' | 'jsx'): T

      const parseResult =
        middlewareContext.type === 'template'
          ? parseTemplate(code, parseContext)
          : parseJsx(code, parseContext)

      return transform(code, parseResult)
    }
  }
})
