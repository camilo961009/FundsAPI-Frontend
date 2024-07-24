import { Component, OnInit } from '@angular/core';
import { FundService } from '../../services/fund.service';
import { Fondo } from '../../../../Mod/fondo.model';
import { BalanceService } from '../../services/BalanceService';
import { Transaccion } from 'src/app/Mod/Transaccion.model';
import Swal from 'sweetalert2';

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
  nombre: string = ''; 
  correo: string = '';
  celular: string = '';
  isButtonDisabled = false;
  warningMessage: string = '';
  
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
      Swal.fire({
        icon: 'warning',
        title: 'Correo o Celular',
        text: `Solo puedes llenar uno de los dos campos: correo o celular.`,
        showConfirmButton: true,
        animation: true,
        customClass: {
          popup: 'animated tada'
        }
      });
      this.isButtonDisabled = true;
    } else if (this.correo || this.celular) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
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

  onFondoChange(event: any) {
    const selectedNombre = event.target.value;
    if (selectedNombre === 'FPV_BTG_PACTUAL_RECAUDADORA' || selectedNombre === 'FPV_BTG_PACTUAL_ECOPETROL' || selectedNombre === 'FPV_BTG_PACTUAL_DINAMICA') {
      this.categoria = 'FPV';
    } else if (selectedNombre === 'DEUDAPRIVADA' || selectedNombre === 'FDO-ACCIONES') {
      this.categoria = 'FIC';
    }
  }

  onCreateFondo(fondo: Fondo): void {
    const montoMinimoRequerido = this.MontoMinimoPorFondo[fondo.nombre];
    if (fondo.montoVinculacionFondo > this.userBalance) {
      Swal.fire({
        icon: 'error',
        title: 'Saldo insuficiente',
        text: `No tiene saldo suficiente para vincularse al fondo ${fondo.nombre}`,
        showConfirmButton: true,
        animation: true,
        customClass: {
          popup: 'animated tada' // Ejemplo de clase CSS para animación
        }
      });
      return;
    }

    if (fondo.montoVinculacionFondo < montoMinimoRequerido) {
      Swal.fire({
        icon: 'warning',
        title: 'Monto Minimo Requerido Requerido',
        text: `El monto mínimo para ${fondo.nombre} es ${montoMinimoRequerido}`,
        showConfirmButton: true,
        animation: true,
        customClass: {
          popup: 'animated tada'
        }
      });
      return;
    }

    this.fundService.createFondo(fondo).subscribe(newFondo => {
      this.fondos.push(newFondo);
      this.userBalance -= newFondo.montoVinculacionFondo;
      Swal.fire({
        title: '¡Éxito!',
        text: 'El fondo ha sido creado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
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
