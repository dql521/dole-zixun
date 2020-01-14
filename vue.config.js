module.exports = {
  devServer: {
    open: true,
    hot: true
  },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 36
          })
        ]
      }
    }
  }
}
