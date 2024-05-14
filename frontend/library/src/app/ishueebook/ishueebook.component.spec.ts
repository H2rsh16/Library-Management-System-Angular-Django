import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IshueebookComponent } from './ishueebook.component';

describe('IshueebookComponent', () => {
  let component: IshueebookComponent;
  let fixture: ComponentFixture<IshueebookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IshueebookComponent]
    });
    fixture = TestBed.createComponent(IshueebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
