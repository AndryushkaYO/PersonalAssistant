import { TestBed } from '@angular/core/testing';

import { HabbitsTrackerService } from './habbits-tracker.service';

describe('HabbitsTrackerService', () => {
  let service: HabbitsTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabbitsTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
