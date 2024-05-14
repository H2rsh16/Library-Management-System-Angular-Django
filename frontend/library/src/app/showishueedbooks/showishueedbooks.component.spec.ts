import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowishueedbooksComponent } from './showishueedbooks.component';

describe('ShowishueedbooksComponent', () => {
  let component: ShowishueedbooksComponent;
  let fixture: ComponentFixture<ShowishueedbooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowishueedbooksComponent]
    });
    fixture = TestBed.createComponent(ShowishueedbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
