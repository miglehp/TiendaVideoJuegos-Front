import { Component, inject } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent {
  ultimosPedidos: any[] = []; // Variable para almacenar los últimos pedidos

  userService = inject(UserService);
  orderService = inject(OrderService);
  nuevoEstado: string = '';
  estadoSelect: string[];

  constructor() {
    this.estadoSelect = ['pendiente', 'preparacion', 'enviado', 'cancelado']
  }

  ngOnInit(): void {
    this.obtenerUltimosPedidos();
  }

  async obtenerUltimosPedidos() {
    this.ultimosPedidos = (
      await this.orderService.obtenerUltimosPedidos()
    ).pedidos;
  }
  async actualizarEstado(pedido: any) {
    await this.orderService.actualizarEstadoPedido(
      pedido.id,
      this.nuevoEstado
    );

    pedido.estado = pedido.nuevoEstado;
    pedido.nuevoEstado = '';
  }

  onChange($event: any) {
    this.nuevoEstado = $event.target.value;
  }
}
