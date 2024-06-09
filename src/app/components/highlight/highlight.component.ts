import { NgFor, NgIf } from '@angular/common';
import { Component, Input, computed, effect } from '@angular/core';
import { min } from 'rxjs';
import { HighlightChunk } from '../../utils/splitByKeywords';

@Component({
  selector: 'highlight',
  standalone: true,
  imports: [NgIf, NgFor],
  template: `
    <ng-container *ngFor="let chunk of value">
      <span *ngIf="chunk.prevText">{{ chunk.prevText }}</span>
      <span *ngIf="chunk.keyword" class="highlight">{{ chunk.keyword }}</span>
    </ng-container>
  `,
  styles: `
    .highlight {
      background-color: yellow;
    }
  `
})
export class HighlightComponent {
  @Input() value: HighlightChunk[] = []

  constructor() { }
}
