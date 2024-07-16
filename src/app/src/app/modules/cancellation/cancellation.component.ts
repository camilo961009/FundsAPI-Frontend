import { Component, OnInit } from '@angular/core';
import { FundService } from '../../services/fund.service';
import { Fondo } from '../../../../Mod/fondo.model';
import { Transaccion } from '../../../../Mod/Transaccion.model';
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
    if (id) {
      this.fundService.deleteFondo(id).subscribe(() => {
        this.fondos = this.fondos.filter(f => f.id !== id);
      });
    } else {
      console.error('ID is undefined');
    }
  }
    // 
}