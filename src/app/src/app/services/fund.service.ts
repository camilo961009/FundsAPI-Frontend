import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fondo } from '../../../Mod/fondo.model';
import { Transaccion } from '../../../Mod/Transaccion.model';

@Injectable({
  providedIn: 'root'
})
export class FundService {
  private apiUrl = 'http://localhost:5072/api/funds';
  private transaccionesUrl = 'http://localhost:5072/api/transactions';


  constructor(private http: HttpClient) { }

  getFondos(): Observable<Fondo[]> {
    return this.http.get<Fondo[]>(this.apiUrl);
  }

  createFondo(fondo: Fondo): Observable<Fondo> {
    return this.http.post<Fondo>(this.apiUrl, fondo);
  }

  getTransacciones(): Observable<Transaccion[]> {
    return this.http.get<Transaccion[]>(this.transaccionesUrl);
  }

  deleteFondo(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  
}
