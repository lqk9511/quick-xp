const publicPath = process.env.NODE_ENV !== 'development' ? '././' : ''

module.exports = {
  publicPath,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/styles/variables.scss";'
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
  }{{/if_neq}}
}
