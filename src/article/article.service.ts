import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as fs from 'fs';
import * as matter from 'gray-matter';

@Injectable()
export class ArticleService {

    private articlesDir: string;

    constructor(private configService: ConfigService) {
        this.articlesDir = this.configService.get('articlesDir');
    }

    public getArticleList(): string[] {
        return fs.readdirSync(this.articlesDir);
    }

    getAllArticles(articleList: string[]) {
        return articleList.map((title) => {
          const articlePath = `${this.articlesDir}/${title}/index.md`;
          const article: matter.GrayMatterFile<string | Buffer> = matter(
            fs.readFileSync(articlePath, 'utf8'),
          );
          delete article.orig;
          delete article.excerpt;
          return article;
        });
      }
}
