import { Component, OnInit, inject } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  ultimosPedidos: any[] = []; // Variable para almacenar los últimos pedidos

  userService = inject(UserService);
  orderService = inject(OrderService);
  nuevoEstado: string = '';

  constructor() {}

  ngOnInit() {
    this.obtenerUltimosPedidos();
  }

  async obtenerUltimosPedidos() {
    this.ultimosPedidos = (
      await this.orderService.obtenerPedidosUser()
    ).pedidos;
  }
}
