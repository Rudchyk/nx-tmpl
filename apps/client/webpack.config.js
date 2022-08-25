const getConfig = require('@nrwl/react/plugins/webpack');
const path = require('path');

module.exports = (config) => {
  config = getConfig(config);

  config.module.rules.map((rule) => {
    if (rule.test instanceof RegExp && rule.test.toString() === '/\\.css$|\\.scss$|\\.sass$|\\.less$|\\.styl$/') {
      rule.oneOf.map((item) => {
        if (item.test instanceof RegExp && (item.test.toString() === '/\\.module\\.(scss|sass)$/' || item.test.toString() === '/\\.scss$|\\.sass$/')) {
          item.use.push({
            loader: require.resolve('sass-resources-loader'),
            options: {
              resources: path.resolve(__dirname, './src/styles/index.scss'),
            },
          });
        }
        return item;
      });
    }
  });

  return config;
};
