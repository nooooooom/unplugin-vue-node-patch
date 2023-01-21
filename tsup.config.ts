import type { Options } from 'tsup'

export default <Options>{
  entryPoints: ['src/*.ts', 'src/middlewares/index.ts'],
  clean: true,
  format: ['cjs', 'esm'],
  dts: true
}
