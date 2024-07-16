import { TestBed } from '@angular/core/testing';

import { TransaccionServiceService } from './transaccion-service.service';

describe('TransaccionServiceService', () => {
  let service: TransaccionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransaccionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
