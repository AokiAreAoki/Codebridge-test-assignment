import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { BehaviorSubject, debounceTime } from 'rxjs';
import Article from '../../types/Article';
import { NgIf } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { CardComponent } from '../../components/card/card.component';
import { DirectionalButtonComponent } from '../../components/directional-button/directional-button.component';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [NgIf, CardComponent, DirectionalButtonComponent, LoadingComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.less',
})
export class ArticlePage {
  id = new BehaviorSubject<string>('');
  article: Article | null = null;

  @Input()
  set articleId(value: string) {
    this.id.next(value);
  }

  @HostBinding("attr.style")
  public get imageURLAsStyle(): any {
    return this.sanitizer.bypassSecurityTrustStyle(`--image-url: url("${this.article?.image_url}")`);
  }

  constructor(private api: ApiService, private router: Router, private sanitizer: DomSanitizer) {
    this.id
      .pipe(debounceTime(250))
      .subscribe(id => id && this.fetchData(id))
  }

  fetchData(id: string) {
    this.api
      .getArticle({ id })
      .subscribe(article => {
        this.article = article;
      })
  }

  onClickBack() {
    this.router.navigate(['home'])
  }
}
