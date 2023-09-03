import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import ts from 'rollup-plugin-typescript2'

import path from 'node:path'
import { fileURLToPath } from 'node:url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const resolve = (filePath) => path.resolve(dirname, filePath)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function createConfig (format) {
  return {
    input: './src/main.ts',
    output: {
      file: resolve(`dist/spa.${format}.js`),
      format,
      name: 'spa'
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      ts({
        tsconfig: 'tsconfig.json'
      })

    ]
  }
}

const formats = ['cjs', 'umd', 'es', 'iife']

export default formats.map(createConfig)
