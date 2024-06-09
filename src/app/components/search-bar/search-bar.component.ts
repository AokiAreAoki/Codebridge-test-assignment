import { Component, Input, effect, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatLabel, MatIconModule],
  template: `
    <div class="search-bar-section section">
      <mat-icon fontIcon="search"></mat-icon>

      <input
        matInput
        type="text"
        placeholder="Search..."
        [(ngModel)]="value"
        (input)="onValueChange($event)"
      />
    </div>
  `,
  styles: `
    .search-bar-section {
      width: 100%;
      max-width: 600px;

      display: flex;
      padding: 0.25rem 0.5rem;
      gap: 0.25rem;

      input {
        flex: 1 0 0%;
        border: none;
        outline: none;
      }
    }
  `
})
export class SearchBarComponent {
  @Input() value: string = '';
  valueChange = output<string>();

  constructor() { }

  onValueChange(event: Event) {
    const target = event.target as HTMLInputElement;

    this.valueChange.emit(target.value);
  }
}
