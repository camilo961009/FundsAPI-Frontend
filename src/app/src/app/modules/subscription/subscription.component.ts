import { Component,OnInit } from '@angular/core';
import { FundService } from '../../services/fund.service';
import { Fondo } from '../../../../Mod/fondo.model';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  
  fondos: Fondo[] = [];
  selectedFondo: Fondo | null = null;
  montoMinimo: number = 0;
  categoria: string = '';
  userBalance: number = 500000; // Ejemplo de saldo del usuario

  constructor(private fundService: FundService) { }

  ngOnInit(): void {
    this.fundService.getFondos().subscribe(fondos => {
      this.fondos = fondos;
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
    if (fondo.montoMinimo < montoMinimoRequerido) {
      alert(`El monto mínimo para ${fondo.nombre} es ${montoMinimoRequerido}`);
    } else {
      this.fundService.createFondo(fondo).subscribe(newFondo => {
        this.fondos.push(newFondo);
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
  
}
