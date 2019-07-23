module.exports = app => {
  // 默认进入首页
  app.get('/', app.controller.home.home);
};
