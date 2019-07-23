const localIP = require('ip').address();

module.exports = () => {
  const config = {};

  config.webpackPort = 3000;


  const domainWhiteList = [];
  [config.webpackPort].forEach(port => {
    domainWhiteList.push(`http://localhost:${port}`);
    domainWhiteList.push(`http://127.0.0.1:${port}`);
    domainWhiteList.push(`http://${localIP}:${port}`);
  });

  config.development = {
    watchDirs: ['build'], // 指定监视的目录（包括子目录），当目录下的文件变化的时候自动重载应用，路径从项目根目录开始写
    ignoreDirs: ['app/web', 'public'] // 指定过滤的目录（包括子目录）
  };

  config.middleware = [
    'access',
    'publicProxy', // public资源代理
  ];

  config.datasource = {
    default: {
      mocking: true,
      mockUrl: 'https://test.com/mock/',
      protocol: 'http',
      host: '',
      port: '',
      path: '',
    },
  };

  return config;
};
