import { Controller } from 'egg';
import templetes from '../templates';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    const data = await ctx.service.test.sayHi('Article');
    ctx.body = templetes.simpleGet(data);
  }

}
