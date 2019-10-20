const constant = require('../config/constant')

module.exports = ({ config }) => {
  config.module.rules = [
    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          query: {
            modules: true,
            localIdentName: constant.CSS_MODULE_LOCAL_IDENT_NAME
          }
        }
      ]
    },
    {
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: 'babel-loader'
        }
      ]
    }
  ]

  config.resolve.extensions.push('.ts', '.tsx')

  return config
}
