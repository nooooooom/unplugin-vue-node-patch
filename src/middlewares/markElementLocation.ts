import type { Middleware } from '../types'

export const ELEMENT_LOCATION_ATTR = 'data-element-position'

export const markElementLocation = <Middleware>((patch, node) => {
  patch.props.set(ELEMENT_LOCATION_ATTR, `${node.loc!.start.line}_${node.loc!.start.column}`)
})
