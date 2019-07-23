const { Controller } = require('egg');
const ejs = require('ejs');

ejs.delimiter = '?';

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async home() {
    const { ctx } = this;
    if (this.app.config.env === 'local') { // 开发环境从webpack端口抓取模板
      const { webpackPort } = this.app.config;
      const res = await this.app.curl(`http://127.0.0.1:${webpackPort}/public/web.html`, {
        dataType: 'text',
        method: 'GET'
      });
      if (res && res.data) {
        ctx.body = ejs.render(res.data, {
          url: ctx.url,
          user: 'myfe',
          title: 'bfe-template',
          keywords: 'React,koa,egg',
          description: 'bfe-template'
        });
      }
    } else {
      // TODO
      ctx.body = ejs.renderFile('home.4abe80.js');
    }
  }
}

module.exports = HomeController;
