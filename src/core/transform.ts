import MagicString from 'magic-string'
import { ParseResult, Patch, PatchInfo } from '../types'

export function transform(code: string, parseResult: ParseResult) {
  const s = new MagicString(code)

  parseResult.forEach(({ tag, start, patch }) => {
    processProps(patch.props, s, {
      tag,
      start
    })
  })

  return s.toString()
}

function processProps(
  props: Patch['props'],
  s: MagicString,
  info: Pick<PatchInfo, 'tag' | 'start'>
) {
  if (!props.size) {
    return
  }

  let result = ''
  props.forEach((value, prop) => {
    result += ` ${prop}="${value}"`
  })

  s.prependLeft(info.start + info.tag.length + 1, result)
}
