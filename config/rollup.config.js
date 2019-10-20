import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import alias from 'rollup-plugin-alias'
import get from 'lodash.get'
import pkg from '../package.json'

const genericNames = require('generic-names')
const constant = require('./constant')
const extensions = ['.ts', '.tsx']
const exclude = 'node_modules/**'
const generate = genericNames(constant.CSS_MODULE_LOCAL_IDENT_NAME, {
  context: process.cwd()
})

const entries = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs'
      },
      {
        file: pkg.module,
        format: 'es'
      }
    ],
    plugins: {
      postcss: {
        extract: pkg.style
      }
    }
  }
]

const options = entries.map(entry => {
  const { input, output, plugins = {} } = entry

  return {
    input,
    output,
    plugins: [
      external(),
      postcss({
        extract: get(plugins, 'postcss.extract', true),
        modules: {
          generateScopedName: function(name, filename) {
            if (filename.includes('node_modules')) {
              return name
            }
            return generate(name, filename)
          }
        }
      }),
      commonjs(),
      babel({
        extensions,
        exclude
      }),
      resolve({
        extensions
      }),
      alias({
        resolve: ['.tsx', '.ts', '/index.tsx']
      })
    ]
  }
})

export default options
