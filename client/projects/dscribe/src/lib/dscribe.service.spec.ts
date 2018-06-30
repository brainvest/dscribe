import { TestBed, inject } from '@angular/core/testing';

import { DscribeService } from './dscribe.service';

describe('DscribeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DscribeService]
    });
  });

  it('should be created', inject([DscribeService], (service: DscribeService) => {
    expect(service).toBeTruthy();
  }));
});
