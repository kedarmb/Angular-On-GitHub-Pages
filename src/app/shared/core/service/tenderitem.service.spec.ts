import { TestBed } from '@angular/core/testing';

import { TenderitemService } from './tenderitem.service';

describe('TenderitemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TenderitemService = TestBed.get(TenderitemService);
    expect(service).toBeTruthy();
  });
});
