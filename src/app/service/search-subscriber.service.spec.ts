import { TestBed } from '@angular/core/testing';

import { SearchSubscriberService } from './search-subscriber.service';

describe('SearchSubscriberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchSubscriberService = TestBed.get(SearchSubscriberService);
    expect(service).toBeTruthy();
  });
});
