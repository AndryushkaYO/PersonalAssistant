import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceWheelEditComponent } from './balance-wheel-edit.component';

describe('BalanceWheelEditComponent', () => {
  let component: BalanceWheelEditComponent;
  let fixture: ComponentFixture<BalanceWheelEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceWheelEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceWheelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
