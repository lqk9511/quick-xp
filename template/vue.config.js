const publicPath = process.env.NODE_ENV !== 'development' ? '././' : ''
const GenerateAssetPlugin = require('generate-asset-webpack-plugin')
const config = require('./config.json')
const createJson = compilation => {
  return JSON.stringify(config)
}

module.exports = {
  publicPath,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/variables.scss"; $userSelect: ${process.env.VUE_APP_USER_SELECT || 'none'};`
      }
    }
  }{{#if_neq devProxyUrl ""}},
  devServer: {
    proxy: {
      '/api': {
        target: '{{devProxyUrl}}',
        // ws: true,
        changeOrigin: true
        // pathRewrite: {
        //   '^/api': 'api'
        // }
      }
    }
  }{{/if_neq}},
  configureWebpack: config => {
    config.plugins.push(new GenerateAssetPlugin({
      filename: 'config.json',
      fn: (compilation, cb) => {
        cb(null, createJson(compilation))
      }
    }))
  }
}
