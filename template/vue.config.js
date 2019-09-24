const publicPath = process.env.NODE_ENV !== 'development' ? '././' : ''
const SentryPlugin = require('@sentry/webpack-plugin')
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
    config.entry.app = ['./src/main.ts']
    config.plugins.push(new GenerateAssetPlugin({
      filename: 'config.json',
      fn: (compilation, cb) => {
        cb(null, createJson(compilation))
      }
    }))
    config.module.rules[1].use.push('image-webpack-loader')
    config.plugins.push(
      new SentryPlugin({
        include: config.output.path + '/js',
        environment: process.env.VUE_APP_APP_ID,
        ignore: ['node_modules', 'babel.config.js', 'vue.config.js'],
        release: process.env.VUE_APP_APP_ID,
        configFile: './config/sentry.properties'
      })
    )
  }
}
