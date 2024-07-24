import { Component, OnInit } from '@angular/core';
import { FundService } from '../../services/fund.service';
import { Fondo } from '../../../../Mod/fondo.model';
import { Transaccion } from '../../../../Mod/Transaccion.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cancellation',
  templateUrl: './cancellation.component.html',
  styleUrls: ['./cancellation.component.css']
})
export class CancellationComponent implements OnInit {
  fondos: Fondo[] = [];

  constructor(private fundService: FundService) { }

  ngOnInit(): void {
    this.fundService.getFondos().subscribe(fondos => {
      this.fondos = fondos;
    });
  }

  onCancelFondo(id: string | undefined): void {
    if (!id) {
      console.error('ID is undefined');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener'
    }).then((result) => {
      if (result.isConfirmed) {
        this.fundService.deleteFondo(id).subscribe(() => {
          this.fondos = this.fondos.filter(f => f.id !== id);
          Swal.fire(
            '¡Cancelado!',
            'El fondo ha sido cancelado.',
            'success'
          );
        });
      }
    });
  }


  onCancelFondos(fondoId: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí va tu lógica para cancelar el fondo
        console.log('Fondo cancelado:', fondoId);
        Swal.fire(
          '¡Cancelado!',
          'El fondo ha sido cancelado.',
          'success'
        );
      }
    });
  }
}