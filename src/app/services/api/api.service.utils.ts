import Article from "../../types/Article"

export function deserializeArticles(articles: Record<any, any>[]): Article[] {
  return articles.map(deserializeArticle)
}

export function deserializeArticle(article: Record<any, any>): Article {
  return {
    id: article['id'],
    image_url: article['image_url'],
    title: article['title'],
    summary: article['summary'],
    published_at: new Date(article['published_at']),
    updated_at: new Date(article['updated_at']),
  }
}