import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowbooksComponent } from './showbooks.component';

describe('ShowbooksComponent', () => {
  let component: ShowbooksComponent;
  let fixture: ComponentFixture<ShowbooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowbooksComponent]
    });
    fixture = TestBed.createComponent(ShowbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
