import { Middleware } from '../types'
import { isTemplateNode } from '../utils/assert'

export const ELEMENT_LOCATION_ATTR = 'data-element-position'

export const markElementLocation = <Middleware>((patch, node) => {
  const value = isTemplateNode(node)
    ? `${node.loc.start.line}_${node.loc.start.column}`
    : `${node.loc!.start.line}_${node.loc!.start.column}`

  patch.props.set(ELEMENT_LOCATION_ATTR, value)
})
