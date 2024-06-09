import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import Article from '../../types/Article';
import { BehaviorSubject, Observable, debounceTime, switchMap } from 'rxjs';
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
  articles: Article[] = []

  constructor(private api: ApiService, private router: Router) {
    this.query
      .pipe(debounceTime(250))
      .subscribe(query => this.fetchData(query))
  }

  fetchData(query?: string) {
    return this.api
      .getArticles(query)
      .subscribe(articles => {
        this.articles = articles;
      })
  }

  onClick(article: Article) {
    this.router.navigate(['article', article.id])
  }
}
