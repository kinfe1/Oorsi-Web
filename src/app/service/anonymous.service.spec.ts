import { TestBed, inject } from '@angular/core/testing';

import { AnonymousService } from './anonymous.service';

describe('AnonymousService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnonymousService]
    });
  });

  it('should ...', inject([AnonymousService], (service: AnonymousService) => {
    expect(service).toBeTruthy();
  }));
});
