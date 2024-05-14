import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowishueedofoneComponent } from './showishueedofone.component';

describe('ShowishueedofoneComponent', () => {
  let component: ShowishueedofoneComponent;
  let fixture: ComponentFixture<ShowishueedofoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowishueedofoneComponent]
    });
    fixture = TestBed.createComponent(ShowishueedofoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
