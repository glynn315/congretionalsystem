import { TestBed } from '@angular/core/testing';

import { FundingsService } from './fundings.service';

describe('FundingsService', () => {
  let service: FundingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
