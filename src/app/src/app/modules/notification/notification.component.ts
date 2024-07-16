import { Component, OnInit } from '@angular/core';
import { Fondo } from '../../../../Mod/fondo.model';
import { FundService } from '../../services/fund.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  fondos: Fondo[] = [];

  constructor(private fondoService: FundService) { }

  ngOnInit(): void {
    this.fondoService.getFondos().subscribe(fondos => {
      this.fondos = fondos;
    });
  }

}
