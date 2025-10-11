import { TestBed } from '@angular/core/testing';

import { RequestFormsService } from './request-forms.service';

describe('RequestFormsService', () => {
  let service: RequestFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
