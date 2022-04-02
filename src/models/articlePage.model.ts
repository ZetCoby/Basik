import { Article } from './article.model';

export interface ArticlePage {
    page: number;
    perPage: number;
    prevPage: number;
    nextPage: number;
    totalArticles: number;
    totalPages: number;
    articles: Article[];
}
