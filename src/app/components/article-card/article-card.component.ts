import { Component, Input, computed, output } from '@angular/core';
import { CardComponent } from '../card/card.component';
import Article from '../../types/Article';
import { DirectionalButtonComponent } from '../directional-button/directional-button.component';
import { MatIconModule } from '@angular/material/icon';
import splitByKeywords, { HighlightChunk } from '../../utils/splitByKeywords';
import { NgFor, NgIf } from '@angular/common';
import { HighlightComponent } from '../highlight/highlight.component';

@Component({
  selector: 'article-card',
  standalone: true,
  imports: [NgIf, NgFor, CardComponent, MatIconModule, DirectionalButtonComponent, HighlightComponent],
  template: `
    <card [imageURL]="value.image_url">
      <div class="content grow">
        <div class="flex tertiary-color">
          <mat-icon>schedule</mat-icon>
          <div>{{ value.published_at.toLocaleDateString() }}</div>
        </div>

        <div class="title primary-color">
          <highlight [value]="highlightedTitle()" />
        </div>

        <div class="grow primary-color">
          <highlight [value]="highlightedSummary()" />
        </div>

        <directional-button (click)="onClick.emit()">
          <b>Read more</b>
        </directional-button>
      </div>
    </card>
  `,
  styleUrl: './article-card.component.less',
})
export class ArticleCardComponent {
  @Input() value: Article = {} as Article
  @Input() highlightKeywords: string[] = []
  onClick = output<void>()

  highlightedTitle = computed(() => {
    const chunks = splitByKeywords(this.value.title, this.highlightKeywords)
    return chunks
  })

  highlightedSummary = computed(() => {
    const chunks = splitByKeywords(this.value.summary, this.highlightKeywords)
    const summary = this.value.summary

    if (summary.length < 100) {
      return chunks
    }

    const maxTextNodeSize = chunks.reduce((acc, chunk) => acc + chunk.prevText.length - 3, 0) / chunks.length
    cropChunks(chunks, maxTextNodeSize)

    return chunks
  })

  constructor() { }
}

function cropChunks(chunks: HighlightChunk[], maxTextNodeSize: number) {
  chunks.forEach(chunk => {
    if (chunk.prevText.length > maxTextNodeSize) {
      if (chunk.keyword) {
        let start = chunk.prevText.slice(0, maxTextNodeSize / 2)
        let end = chunk.prevText.slice(-maxTextNodeSize / 2)

        start = start.slice(0, start.lastIndexOf(' '))
        end = end.slice(end.indexOf(' ') + 1)

        chunk.prevText = `${start}...${end}`
      } else {
        let start = chunk.prevText.slice(0, maxTextNodeSize)
        start = start.slice(0, start.lastIndexOf(' '))

        chunk.prevText = `${start}...`
      }

    }
  })
}
