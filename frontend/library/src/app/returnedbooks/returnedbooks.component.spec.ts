import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnedbooksComponent } from './returnedbooks.component';

describe('ReturnedbooksComponent', () => {
  let component: ReturnedbooksComponent;
  let fixture: ComponentFixture<ReturnedbooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReturnedbooksComponent]
    });
    fixture = TestBed.createComponent(ReturnedbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
