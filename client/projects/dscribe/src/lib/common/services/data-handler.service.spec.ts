import { TestBed, inject } from '@angular/core/testing';

import { DataHandlerService } from './data-handler.service';

describe('DataHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataHandlerService]
    });
  });

  it('should be created', inject([DataHandlerService], (service: DataHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
