import { Component, Input, computed, output } from '@angular/core';
import { CardComponent } from '../card/card.component';
import Article from '../../types/Article';
import { DirectionalButtonComponent } from '../directional-button/directional-button.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'article-card',
  standalone: true,
  imports: [CardComponent, MatIconModule, DirectionalButtonComponent],
  template: `
    <card [imageURL]="value.image_url">
      <div class="content grow">
        <div class="flex tertiary-color">
          <mat-icon>schedule</mat-icon>
          <div>{{ value.published_at.toLocaleDateString() }}</div>
        </div>

        <div class="title primary-color">{{ value.title }}</div>
        <div class="grow primary-color">{{ summary() }}</div>

        <directional-button (click)="onClick.emit()">
          <b>Read more</b>
        </directional-button>
      </div>
    </card>
  `,
  styles: `
    .grow {
      flex: 1 0 0%;
    }

    .flex {
      display: flex;
      gap: 0.5rem;
    }

    .title {
      font-size: 1.2rem;
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;

      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto auto 1fr auto;

      button {
        border: none;
        background: none;
        cursor: pointer;
        padding: 0;
      }
    }
  `
})
export class ArticleCardComponent {
  @Input() value: Article = {} as Article
  onClick = output<void>()

  summary = computed(() => {
    const summary = this.value.summary

    if (summary.length < 100) {
      return summary
    }

    const lastSpace = summary.lastIndexOf(' ', 100)
    return summary.slice(0, lastSpace).trimEnd() + '...'
  })

  constructor() { }
}
