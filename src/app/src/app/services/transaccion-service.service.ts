import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransaccionServiceService {
  private apiUrl = 'http://localhost:5064/api/transacciones';

  constructor(private http: HttpClient) { }

  crearTransaccion(transaccion: any): Observable<any> {
    return this.http.post(this.apiUrl, transaccion);
  }
}
