const { defineConfig } = require('@vue/cli-service')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const isProduction = process.env.NODE_ENV !== 'development'
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
  configureWebpack: config => {
    // 若是生产环境，则执行以下代码
    if (isProduction) {
      //gzip压缩
      const productionGzipExtensions = ["html", "js", "css"];
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path][base].gz", // 有的版本是[path].gz[query] 根据情况而定
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 4096, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false, // 删除原文件
        })
      );
    }
  }
})
