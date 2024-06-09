import { Component, Input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'loading',
  standalone: true,
  imports: [MatProgressSpinner],
  template: `
    <mat-spinner [diameter]="diameter" />
  `,
  styles: `
    :host {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `
})
export class LoadingComponent {
  @Input() diameter = 32;
}
