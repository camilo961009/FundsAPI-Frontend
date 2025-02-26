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

  constructor(private fondoService: FundService) { }

  ngOnInit(): void {
    this.fondoService.getTransacciones().subscribe(transacciones => {
      this.transacciones = transacciones;
    });
  }
}

