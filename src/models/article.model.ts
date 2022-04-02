export interface Article {
    [key: string]: any;
    content: string;
    data: ArticleData;
}

export interface ArticleData {
    fileTitle?: string;
    title?: string;
    date?: string;
    author?: string;
    tags?: string[];
    posterImageUrl?: string;
    description?: string;
}