import { ArticlePage } from './../models/articlePage.model';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import v8 from "v8"
import * as fs from 'fs';
import * as matter from 'gray-matter';
import { Article } from 'src/models/article.model';

@Injectable()
export class ArticleService {

    private articlesDir: string;
    private articles: Article[];

    constructor(private configService: ConfigService) {
        this.articlesDir = this.configService.get('articlesDir');
        this.loadAllArticles();
    }

    public getAllArticles(): Article[] {
      return this.articles;
    }

    public getArticles(page:number, itemPerPage:number): ArticlePage {
      return this.paginateArticles(this.articles, page, itemPerPage);
    }

    private loadAllArticles()  {
      if (!this.articles) {
        const articlesList = fs.readdirSync(this.articlesDir);
        this.articles = articlesList.map((title: string) => {
          const articlePath = `${this.articlesDir}/${title}/index.md`;
          const article: Article = matter(
            fs.readFileSync(articlePath, 'utf8'),
          );
          article.data.fileTitle = title;
          delete article.orig;
          delete article.excerpt;
          return JSON.parse(JSON.stringify(article));
        });
      }
    }

    private paginateArticles(articles: Article[], currentPage: number, itemsPerPage: number): ArticlePage {
      let page = currentPage || 1;
      let perPage = itemsPerPage || 10;
      let offset = (page - 1) * perPage;
      let paginatedArticles = articles.slice(offset).slice(0, itemsPerPage);
      let totalPages = Math.ceil(articles.length / perPage);
    
      return {
        page: page,
        perPage: perPage,
        prevPage: page - 1 ? page - 1 : null,
        nextPage: (totalPages > page) ? page + 1 : null,
        totalArticles: articles.length,
        totalPages: totalPages,
        articles: paginatedArticles
      };
    }
}
