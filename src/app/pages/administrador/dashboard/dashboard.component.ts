import { Component, OnInit, inject } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  ultimosPedidos: any[] = []; // Variable para almacenar los últimos pedidos

  orderService = inject(OrderService);

  constructor() {}
  ngOnInit(): void {
    this.obtenerUltimosPedidos();
  }

  async obtenerUltimosPedidos() {
    this.ultimosPedidos = await this.orderService.obtenerUltimosPedidos();
    
  }
  actualizarEstado(pedido: any): void {
    this.orderService
      .actualizarEstadoPedido(pedido.id, pedido.nuevoEstado)
      .subscribe(
        (data) => {
          pedido.estado = pedido.nuevoEstado;
          pedido.nuevoEstado = ''; // Reiniciar el valor del nuevo estado
        },
        (error) => {
          console.error('Error al actualizar el estado del pedido', error);
        }
      );
  }
}
