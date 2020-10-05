import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/api/home', controller.home.home);
  router.get('/', controller.home.index);
};
