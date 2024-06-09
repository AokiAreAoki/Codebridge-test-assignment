import { NgIf } from '@angular/common';
import { Component, HostListener, Input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'directional-button',
  standalone: true,
  imports: [NgIf, MatIconModule],
  template: `
    <mat-icon *ngIf="direction === 'left'" >arrow_back</mat-icon>
    <ng-content></ng-content>
    <mat-icon *ngIf="direction === 'right'">arrow_forward</mat-icon>
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--primary-color);
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  `,
})
export class DirectionalButtonComponent {
  @Input() direction: Direction = 'right';
}

type Direction = 'left' | 'right';
