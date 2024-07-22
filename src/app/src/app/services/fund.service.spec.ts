import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { FundService } from './fund.service';
import { Transaccion } from '../../../Mod/Transaccion.model';
import {Fondo} from '../../../Mod/fondo.model'; 

describe('FundService', () => {
  let service: FundService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FundService]
    });
    service = TestBed.inject(FundService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should create a fondo', () => {
    const newFondo: Fondo = { id: '1', nombre: 'Fondo 1', montoMinimo: 150000, categoria: "FPV", correo: "camilostivent961009qgmail.com" };  

    service.createFondo(newFondo).subscribe(fondo => {
      expect(fondo).toEqual(newFondo);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(newFondo);
  });
});