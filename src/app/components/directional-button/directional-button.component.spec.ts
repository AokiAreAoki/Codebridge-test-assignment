import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionalButtonComponent } from './directional-button.component';

describe('DirectionalButtonComponent', () => {
  let component: DirectionalButtonComponent;
  let fixture: ComponentFixture<DirectionalButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectionalButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectionalButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
