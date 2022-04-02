import { Controller, Get } from '@nestjs/common';
import { ArticleService } from '../services/article.service';

@Controller('article')
export class ArticleController {

    constructor(private articleService: ArticleService) {}

    @Get('list')
    getArticleList() {
      const articleList = this.articleService.getArticles(1,3);
      return articleList;
    }
}
