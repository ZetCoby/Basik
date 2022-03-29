import { Controller, Get } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {

    constructor(private articleService: ArticleService) {}

    @Get()
    getArticleList() {
      const articleList = this.articleService.getAllArticles(this.articleService.getArticleList());
      return articleList;
    }
    
}
