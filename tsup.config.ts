import type { Options } from 'tsup'

export default <Options>{
  entryPoints: ['src/*.ts', 'src/middlewares/*.ts'],
  clean: true,
  format: ['cjs', 'esm'],
  dts: true
}
