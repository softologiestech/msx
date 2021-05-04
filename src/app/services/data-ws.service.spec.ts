import { TestBed } from '@angular/core/testing';

import { DataWsService } from './data-ws.service';

describe('DataWsService', () => {
  let service: DataWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
