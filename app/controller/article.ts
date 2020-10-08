import { Controller } from 'egg';
import templetes from '../templates';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    const data = await ctx.service.test.sayHi('Article');
    ctx.body = templetes.simpleGet(data);
  }

  // 获取文章详情
  public async getArticleContent() {
    const { ctx, app } = this;
    const data = await ctx.service.article.readArticleContent(app.config.fileRoot, ctx.params.articleId);
    ctx.body = templetes.simpleGet(data);
  }

}
