import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { EndPoints } from './api.service.constants';
import Article from '../../types/Article';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getArticles(query?: string): Observable<Article[]> {
    const params = query
      ? {
        summary_contains_one: query,
        title_contains_one: query,
      }
      : undefined

    return this.http
      .get(EndPoints.articles(), { params })
      .pipe(map((response: any) => {
        return (response.results as Record<any, any>[])
          .map((article): Article => ({
            id: article['id'],
            image_url: article['image_url'],
            title: article['title'],
            summary: article['summary'],
            published_at: new Date(article['published_at']),
            updated_at: new Date(article['updated_at']),
          }))
      }))
  }

  public getArticle(articleId: string): Observable<Article> {
    return this.http
      .get<Article>(EndPoints.article(articleId))
  }
}
