import type { Middleware } from '../types'

export const ELEMENT_LOCATION_ATTR = 'data-element-location'

export interface MarkElementLocationOptions {
  /**
   * Specifies the format of the location presented
   *
   * @default (line: number, loc: number) => `${line}_${column}`
   */
  formatter?: (line: number, loc: number) => string
}

const defaultFormatter = <Required<MarkElementLocationOptions>['formatter']>((line, column) => {
  return `${line}_${column}`
})

export const markElementLocation = (options: MarkElementLocationOptions = {}) => {
  const formatter = options.formatter || defaultFormatter

  return <Middleware>((patch, node) => {
    patch.props.set(ELEMENT_LOCATION_ATTR, formatter(node.loc!.start.line, node.loc!.start.column))
  })
}
