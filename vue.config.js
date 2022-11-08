const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,           //关闭语法检查
  productionSourceMap: false,  //打包时不打包MAP文件

  devServer: {   //配置代理
    proxy: {
      '/api': {
        target: 'http://127.0.0.1',
      },
      '/images': {
        target: 'https://z4a.net',
      }
    }
  },

  pages: {
    index: {
      entry: 'src/main.js',
    },
  },
})
