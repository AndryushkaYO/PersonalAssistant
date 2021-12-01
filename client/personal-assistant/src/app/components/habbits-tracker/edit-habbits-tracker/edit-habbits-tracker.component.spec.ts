import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHabbitsTrackerComponent } from './edit-habbits-tracker.component';

describe('EditHabbitsTrackerComponent', () => {
  let component: EditHabbitsTrackerComponent;
  let fixture: ComponentFixture<EditHabbitsTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHabbitsTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHabbitsTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
