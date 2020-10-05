import { Application } from 'egg';
import routes from './routes';

export default (app: Application) => {
  const { controller, router } = app;
  router.get('/', controller.home.index);
  routes(app);
};
