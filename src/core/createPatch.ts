import { Patch } from '../types'

export function createPatch(): Patch {
  return {
    props: new Map()
  }
}
