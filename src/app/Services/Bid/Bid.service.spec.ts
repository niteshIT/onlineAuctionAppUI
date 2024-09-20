/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BidService } from './Bid.service';

describe('Service: Bid', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BidService]
    });
  });

  it('should ...', inject([BidService], (service: BidService) => {
    expect(service).toBeTruthy();
  }));
});
