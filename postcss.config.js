module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, //视图的宽度,对应设计稿的宽度
      viewportHeight: 667, //视图的高度,对应设计稿的高度
      unitPecision: 5, //指定px转换为视窗单位值的小数位数(很多时候无法整除)


    }
  }
}