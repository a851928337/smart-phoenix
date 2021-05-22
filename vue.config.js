const path = require('path');

module.exports = {
  publicPath: './',
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach((type) =>
      addStyleResource(config.module.rule('less').oneOf(type))
    );
  },
  devServer: {
    proxy: {
      '/ddc': {
        target: 'http://182.92.92.250:714 ',
        changeOrigin: true,
        pathRewrite: {
          '^/ddc': '/ddc',
        },
      },
    },
  },
};

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/css/common.less'), // B
      ],
    });
}
