import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceWheelComponent } from './balance-wheel.component';

describe('BalanceWheelComponent', () => {
  let component: BalanceWheelComponent;
  let fixture: ComponentFixture<BalanceWheelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceWheelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceWheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
