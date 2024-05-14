import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovebookComponent } from './removebook.component';

describe('RemovebookComponent', () => {
  let component: RemovebookComponent;
  let fixture: ComponentFixture<RemovebookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemovebookComponent]
    });
    fixture = TestBed.createComponent(RemovebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
