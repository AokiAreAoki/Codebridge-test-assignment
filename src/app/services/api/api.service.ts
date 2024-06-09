import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, zip } from 'rxjs';
import { EndPoints } from './api.service.constants';
import Article from '../../types/Article';
import { deserializeArticles } from './api.service.utils';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getArticles(params: GetArticlesParams): Observable<Article[]> {
    const { queryKeywords, ...restParams } = params
    const query = queryKeywords?.join(',')

    const paramsVariations = query
      ? [
        { title_contains_one: query, ...restParams },
        { summary_contains_one: query, ...restParams },
      ]
      : [restParams]

    const requests = paramsVariations.map(params => this.http
      .get<Response>(EndPoints.articles(), { params })
      .pipe(map((response) => deserializeArticles(response.results)))
    )

    return zip(...requests)
      .pipe(map(requests => {
        if (requests.length === 0) return []
        if (requests.length === 1) return requests[0]

        const map: Record<string, Article> = {}

        for (const request of requests) {
          for (const article of request) {
            map[article.id] ??= article
          }
        }

        return Object.values(map)
      }))
  }

  public getArticle(params: GetArticleParams): Observable<Article> {
    const { id } = params
    return this.http.get<Article>(EndPoints.article(id))
  }
}

interface GetArticlesParams {
  queryKeywords?: string[]
  offset?: number
  limit?: number
}

interface GetArticleParams {
  id: string
}

interface Response {
  results: Record<any, any>[]
}
