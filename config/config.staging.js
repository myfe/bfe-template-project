/**
 * staging环境配置
 *
 * 最终生效的配置为 prod + default（前者覆盖后者）
 */


module.exports = () => {
  const config = {};

  config.datasource = {
    default: {
      protocol: 'http',
      host: '',
      path: ''
    },
  };

  return config;
};
