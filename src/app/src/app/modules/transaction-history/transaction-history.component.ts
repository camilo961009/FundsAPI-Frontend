import { Component, OnInit } from '@angular/core';
import { FundService } from '../../services/fund.service';
import { Transaccion } from '../../../../Mod/Transaccion.model';
import { Fondo } from '../../../../Mod/fondo.model';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  fondos: Fondo[] = [];
  transacciones: Transaccion[] = [];
  montoInicial: number = 500000;

  constructor(private fondoService: FundService) { }

  ngOnInit(): void {
    this.fondoService.getTransacciones().subscribe(transacciones => {
      this.transacciones = transacciones;

      // Calcular el monto inicial basado en las transacciones
      this.calcularMontoInicial();
    });
  }

  calcularMontoInicial(): void {
    this.transacciones.forEach(transaccion => {
      if (transaccion.tipo === 'Eliminación') {
        this.montoInicial += transaccion.monto;
      } else if (transaccion.tipo === 'Creación') {
        this.montoInicial -= transaccion.monto;
      }
    });
  }
}

