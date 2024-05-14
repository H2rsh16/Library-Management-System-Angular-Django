import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowstudentsComponent } from './showstudents.component';

describe('ShowstudentsComponent', () => {
  let component: ShowstudentsComponent;
  let fixture: ComponentFixture<ShowstudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowstudentsComponent]
    });
    fixture = TestBed.createComponent(ShowstudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
