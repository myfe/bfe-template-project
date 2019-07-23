/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = `${appInfo.name}_123`;
  config.appKey = 'haimeiyou';


  // add your middleware config here
  config.middleware = [
    'access',
  ];

  return config;
};
