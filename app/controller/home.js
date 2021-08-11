const {Controller} = require('egg');

class HomeController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.serverRender = require('../public/umi.server');
  }

  async index() {
    const {ctx, app} = this;
    global.host = `${ctx.request.protocol}://${ctx.request.host}`;
    global.href = ctx.request.href;
    global._cookies = ctx.helper.parseCookie(ctx);
    global._navigatorLang = ctx.helper.parseNavLang(ctx);

    // 先走 eggjs 的view 渲染
    const htmlTemplate = await ctx.view.render('index.html');

    // 将 html 模板传到服务端渲染函数中
    const {error, html} = await this.serverRender({
      path: ctx.url,
      getInitialPropsCtx: {},
      htmlTemplate,
    });

    if (error) {
      ctx.logger.error('[SSR ERROR] 渲染报错，切换至客户端渲染', error, ctx.url);
    }
    ctx.type = 'text/html';
    ctx.status = 200;
    ctx.body = html;
  }

  // async api() {
  //   const ctx = this.ctx;
  //
  //   const url = 'https://h5.ele.me' + ctx.path.replace(/^\/api/, '') + '?' + ctx.querystring;
  //
  //   console.log(url);
  //   const res = await this.ctx.curl(url, {
  //     method: this.ctx.method,
  //   });
  //   ctx.body = res.data;
  //   ctx.status = res.status;
  // }
}

module.exports = HomeController;
