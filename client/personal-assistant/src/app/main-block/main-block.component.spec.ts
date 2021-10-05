import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBlockComponent } from './main-block.component';

describe('MainBlockComponent', () => {
  let component: MainBlockComponent;
  let fixture: ComponentFixture<MainBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
