import { NgIf } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'card',
  standalone: true,
  imports: [NgIf],
  template: `
    <div [class]="['section', 'card', imageURL ? 'has-image' : '']">
      <img mat-card-image *ngIf="imageURL" class="image" />

      <content class="content">
        <ng-content></ng-content>
      </content>
    </div>
  `,
  styles: `
    .card {
      width: 100%;
      height: 100%;
      overflow: hidden;

      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: 1fr;

      &.has-image {
        grid-template-rows: 4fr 6fr;
      }

      .image {
        width: 100%;
        height: 100%;
        background: var(--image-url) no-repeat padding-box center / cover;
      }

      .content {
        display: flex;
        overflow: hidden;
      }
    }
  `,
})
export class CardComponent {
  @Input() imageURL?: string;

  @HostBinding("attr.style")
  public get imageURLAsStyle(): any {
    if (this.imageURL)
      return this.sanitizer.bypassSecurityTrustStyle(`--image-url: url("${this.imageURL}")`);
  }

  constructor(private sanitizer: DomSanitizer) { }
}
