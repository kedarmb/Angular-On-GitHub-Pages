import { TestBed } from '@angular/core/testing';

import { LabourService } from './labour.service';

describe('LabourService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LabourService = TestBed.get(LabourService);
    expect(service).toBeTruthy();
  });
});
