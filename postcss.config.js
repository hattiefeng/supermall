module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-px-to-viewport": {
            viewportWidth: 375, //视图的宽度,对应设计稿的宽度 iphone6 
            viewportHeight: 667, //视图的高度,对应设计稿的高度
            unitPecision: 5, //指定px转换为视窗单位值的小数位数(很多时候无法整除)
            viewportUnit: 'vw', //指定需要转换成的视图单位,建议vw
            selectorBlackList: ['ignore', 'tab-bar'], //指定不需要转换的类 以tab-bar开头的类
            minPixelValue: 1, //小于等于1px 不转换成视窗单位
            mediaQuery: false //允许在媒体查询中转换px
        }
    }
}