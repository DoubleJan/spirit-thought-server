import { Application } from 'egg';
import article from './article';

export default (app: Application) => {
  article(app);
};
