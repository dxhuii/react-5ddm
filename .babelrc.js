var config = require('./config')

module.exports = function(api) {
  api.cache.forever()

  return {
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      [
        'react-css-modules',
        {
          generateScopedName: config.CLASS_SCOPED_NAME,
          filetypes: {
            '.scss': {
              syntax: 'postcss-scss'
            }
          }
        }
      ]
    ]
  }
}
