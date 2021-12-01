import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabbitsTrackerComponent } from './habbits-tracker.component';

describe('HabbitsTrackerComponent', () => {
  let component: HabbitsTrackerComponent;
  let fixture: ComponentFixture<HabbitsTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabbitsTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabbitsTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
