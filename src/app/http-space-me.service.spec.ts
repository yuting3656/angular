import { TestBed, inject } from '@angular/core/testing';

import { HttpSpaceMeService } from './http-space-me.service';

describe('HttpSpaceMeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpSpaceMeService]
    });
  });

  it('should be created', inject([HttpSpaceMeService], (service: HttpSpaceMeService) => {
    expect(service).toBeTruthy();
  }));
});
