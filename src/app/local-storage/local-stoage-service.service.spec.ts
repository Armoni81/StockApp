import { TestBed } from '@angular/core/testing';

import { LocalStoageServiceService } from './local-stoage-service.service';

describe('LocalStoageServiceService', () => {
  let service: LocalStoageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStoageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
