import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBlockComponent } from './side-block.component';

describe('SideBlockComponent', () => {
  let component: SideBlockComponent;
  let fixture: ComponentFixture<SideBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
