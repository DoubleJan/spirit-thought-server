import { Controller } from 'egg';
import templetes from '../templates';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    const data = await ctx.service.test.sayHi('egg');
    ctx.body = templetes.simpleGet(data);
  }

  public async home() {
    const { ctx } = this;
    const data = await ctx.service.test.sayHi('Home Egg');
    ctx.body = templetes.simpleGet(data);
  }
}
