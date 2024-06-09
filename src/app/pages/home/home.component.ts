import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import Article from '../../types/Article';
import { BehaviorSubject, Observable, debounceTime, map, switchMap } from 'rxjs';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { NgFor } from '@angular/common';
import { MatCardContent } from '@angular/material/card';
import { HrComponent } from '../../components/hr/hr.component';
import { ArticleCardComponent } from '../../components/article-card/article-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
  providers: [ApiService],
  imports: [SearchBarComponent, HrComponent, NgFor, ArticleCardComponent, MatCardContent]
})
export class HomePage {
  query = new BehaviorSubject<string>('');
  queryKeywords: string[] = []
  articles: Article[] = []

  constructor(private api: ApiService, private router: Router) {
    this.query
      .pipe(
        debounceTime(250),
        map(query => query.trim()),
        map(query => query.split(/\s+/)),
      )
      .subscribe(queryKeywords => {
        this.queryKeywords = queryKeywords
        this.fetchData(queryKeywords)
      })
  }

  fetchData(queryKeywords?: string[]) {
    return this.api
      .getArticles({ queryKeywords })
      .subscribe(articles => {
        if (!queryKeywords) {
          this.articles = articles
          return
        }

        const regexp = new RegExp(queryKeywords.join('|'), 'gi')

        this.articles = articles
          .map(article => ({
            article,
            titleMatches: (article.title.match(regexp) || []).length,
            summaryMatches: (article.summary.match(regexp) || []).length,
          }))
          .sort((a, b) => {
            if (a.titleMatches !== b.titleMatches) {
              return b.titleMatches - a.titleMatches
            }

            return b.summaryMatches - a.summaryMatches
          })
          .map(({ article }) => article)
      })
  }

  onClick(article: Article) {
    this.router.navigate(['article', article.id])
  }
}
