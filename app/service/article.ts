import { Service } from 'egg';

/**
 * Article Service
 */
export default class Article extends Service {

  // 读取指定id的文件
  public async readArticleContent(articleId: string) {
    return `# markdown 指南 in articleId: ${articleId}`;
  }

}
