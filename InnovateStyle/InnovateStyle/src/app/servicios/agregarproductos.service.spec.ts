import { TestBed } from '@angular/core/testing';

import { AgregarproductosService } from './agregarproductos.service';

describe('AgregarproductosService', () => {
  let service: AgregarproductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgregarproductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
