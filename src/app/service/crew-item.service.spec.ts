import { TestBed } from '@angular/core/testing';

import { CrewItemService } from './crew-item.service';

describe('CrewItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrewItemService = TestBed.get(CrewItemService);
    expect(service).toBeTruthy();
  });
});
