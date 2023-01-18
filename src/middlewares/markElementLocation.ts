import type { Middleware } from '../types'

export const ELEMENT_LOCATION_ATTR = 'data-element-position'

export interface MarkElementLocationOptions {
  formatLocation?: (line: number, loc: number) => string
}

const defaultFormatLocation = <Required<MarkElementLocationOptions>['formatLocation']>((
  line,
  column
) => {
  return `${line}_${column}`
})

export const markElementLocation = (options: MarkElementLocationOptions = {}) => {
  const formatLocation = options.formatLocation || defaultFormatLocation

  return <Middleware>((patch, node) => {
    patch.props.set(
      ELEMENT_LOCATION_ATTR,
      formatLocation(node.loc!.start.line, node.loc!.start.column)
    )
  })
}
