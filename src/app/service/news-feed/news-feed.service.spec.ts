/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NewsFeedService } from './news-feed.service';

describe('NewsFeedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsFeedService]
    });
  });

  it('should ...', inject([NewsFeedService], (service: NewsFeedService) => {
    expect(service).toBeTruthy();
  }));
});
