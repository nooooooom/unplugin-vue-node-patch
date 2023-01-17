import { Middleware } from '../types'

export function composeMiddlewares(...middlewares: Middleware[]) {
  let length = middlewares.length

  return <Middleware>((patch, node, context) => {
    let index = 0
    while (index < length) {
      patch = middlewares[index](patch, node, context) || patch
      index++
    }

    return patch
  })
}
