import { Component,OnInit } from '@angular/core';
import { FundService } from '../../services/fund.service';
import { Fondo } from '../../../../Mod/fondo.model';
import { BalanceService } from '../../services/BalanceService';
import { Transaccion } from 'src/app/Mod/Transaccion.model';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  transacciones: Transaccion[] = [];
  fondos: Fondo[] = [];
  selectedFondo: Fondo | null = null;
  montoMinimo: number = 0;
  categoria: string = '';
  userBalance: number = 500000; // Ejemplo de saldo del usuario
  montoInicial: number = 500000;

  constructor(private fundService: FundService, private balanceService: BalanceService) {
    this.userBalance = this.balanceService.getBalance();
   }

  ngOnInit(): void {
    this.refreshFondos(); 
    
    this.fundService.getTransacciones().subscribe(transacciones => {
      this.transacciones = transacciones;

      // Calcular el monto inicial basado en las transacciones
      this.calcularMontoInicial();
    });
  }
  
  refreshFondos(): void {
    this.fundService.getFondos().subscribe(fondos => {
      this.fondos = fondos;
      // Calcular el monto inicial basado en las transacciones
      this.calcularMontoInicial();
    });
  }
  onFondoChange(event: Event | undefined): void {
    if (event) {
      const selectElement = event.target as HTMLSelectElement;
      const value = selectElement.value;
      switch (value) {
        case 'FPV_BTG_PACTUAL_RECAUDADORA':
          this.categoria = 'FPV';
          break;
        case 'FPV_BTG_PACTUAL_ECOPETROL':
          this.categoria = 'FPV';
          break;
        case 'DEUDAPRIVADA':
          this.categoria = 'FIC';
          break;
        case 'FDO-ACCIONES':
          this.categoria = 'FIC';
          break;
        case 'FPV_BTG_PACTUAL_DINAMICA':
          this.categoria = 'FPV';
          break;
        default:
          this.categoria = '';
          break;
      }
    } else {
      console.error('El evento es undefined');
    }
  }

  onCreateFondo(fondo: Fondo): void {
    const montoMinimoRequerido = this.getMontoMinimo(fondo.nombre);
    if (fondo.montoMinimo > this.userBalance) {
      alert(`No tiene saldo suficiente para vincularse al fondo ${fondo.nombre}`);
    } else if (fondo.montoMinimo < montoMinimoRequerido) {
      alert(`El monto mínimo para ${fondo.nombre} es ${montoMinimoRequerido}`);
    } else {
      this.fundService.createFondo(fondo).subscribe(newFondo => {
        this.fondos.push(newFondo);
        this.userBalance -= newFondo.montoMinimo; // Restar el monto creado al saldo inicial
      });
    }
  }

  getMontoMinimo(nombre: string): number {
    switch (nombre) {
      case 'FPV_BTG_PACTUAL_RECAUDADORA':
        return 75000;
      case 'FPV_BTG_PACTUAL_ECOPETROL':
        return 125000;
      case 'DEUDAPRIVADA':
        return 50000;
      case 'FDO-ACCIONES':
        return 250000;
      case 'FPV_BTG_PACTUAL_DINAMICA':
        return 100000;
      default:
        return 0;
    }
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
