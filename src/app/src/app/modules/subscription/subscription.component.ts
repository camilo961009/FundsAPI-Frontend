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
  userBalance: number = 500000;
  categoria: string = '';
  correo: string = '';
  celular: string = '';
  isButtonDisabled: boolean = true;

  // Definir el diccionario de montos mínimos por nombre de fondo
  MontoMinimoPorFondo: { [key: string]: number } = {
    'FPV_BTG_PACTUAL_RECAUDADORA': 75000,
    'FPV_BTG_PACTUAL_ECOPETROL': 125000,
    'DEUDAPRIVADA': 50000,
    'FDO-ACCIONES': 250000,
    'FPV_BTG_PACTUAL_DINAMICA': 100000
  };

  constructor(private fundService: FundService, private balanceService: BalanceService) {
    this.userBalance = this.balanceService.getBalance();
  }

  ngOnInit(): void {
    this.refreshFondos();
    this.refreshTransacciones();
    
  }

  validateFields() {
    if (this.correo && this.celular) {
      alert('Solo puedes llenar uno de los dos campos: correo o celular.');
      this.isButtonDisabled = true;
    } else if (this.correo || this.celular) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
  }

  crear() {
    // Aquí puedes agregar la lógica para crear el usuario
    // ...

    // Limpiar los campos
    this.correo = '';
    this.celular = '';
    this.isButtonDisabled = true;
  }

  refreshFondos(): void {
    this.fundService.getFondos().subscribe(fondos => {
      this.fondos = fondos;
      this.calcularMontoInicial();
    });
  }

  refreshTransacciones(): void {
    this.fundService.getTransacciones().subscribe(transacciones => {
      this.transacciones = transacciones;
      this.calcularMontoInicial();
    });
  }

  onFondoChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedFondo = this.fondos.find(fondo => fondo.nombre === selectElement.value) || null;
    this.categoria = this.selectedFondo && this.selectedFondo.nombre.startsWith('FPV') ? 'FPV' : 'FIC';
  }

  onCreateFondo(fondo: Fondo): void {
    const montoMinimoRequerido = this.MontoMinimoPorFondo[fondo.nombre];
    if (fondo.montoMinimo > this.userBalance) {
      alert(`No tiene saldo suficiente para vincularse al fondo ${fondo.nombre}`);
      return;
    }

    if (fondo.montoMinimo < montoMinimoRequerido) {
      alert(`El monto mínimo para ${fondo.nombre} es ${montoMinimoRequerido}`);
      return;
    }

    this.fundService.createFondo(fondo).subscribe(newFondo => {
      this.fondos.push(newFondo);
      this.userBalance -= newFondo.montoMinimo;
    });
  }

  calcularMontoInicial(): void {
    this.userBalance = 500000; // Resetear el saldo inicial
    this.transacciones.forEach(transaccion => {
      if (transaccion.tipo === 'Eliminación') {
        this.userBalance += transaccion.monto;
      } else if (transaccion.tipo === 'Creación') {
        this.userBalance -= transaccion.monto;
      }
    });
  }
}
