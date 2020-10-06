import { Service } from 'egg';
import { readFile } from 'fs';
import { resolve } from 'path';

/**
 * Article Service
 */
export default class Article extends Service {

  // 读取指定id的文件
  public async readArticleContent(fileRoot: string, articleId: string): Promise<string> {
    const dir = resolve(fileRoot, `${articleId}.md`);
    return new Promise((resolve, reject) => {
      readFile(dir, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data.toString());
      });
    });
  }

}
