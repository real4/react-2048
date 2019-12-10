const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env) => {
  const isProd = env.mode === 'production'

  const getMinimizer = () => {
    return isProd
      ? [
          new TerserPlugin({
            terserOptions: {
              output: {
                comments: false
              }
            },
            extractComments: false
          })
        ]
      : undefined
  }

  return {
    mode: isProd ? 'production' : 'development',

    optimization: {
      minimize: true,
      minimizer: getMinimizer()
    },

    entry: {
      app: './src/index.js'
    },

    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build')
    },

    module: {
      rules: [
        // Babel loader
        {
          test: /\.(jsx?)$/i,
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader' }]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'public/index.html',
        minify: !!isProd
      })
    ],

    devServer: {
      open: true
    }
  }
}
