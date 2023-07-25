import { Component, inject } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-by-user',
  templateUrl: './orders-by-user.component.html',
  styleUrls: ['./orders-by-user.component.scss'],
})
export class OrdersByUserComponent {
  orderService = inject(OrderService);

  ngOnInit() {
    this.setPedidos();
  }

  async setPedidos() {
    const pedidos = await this.orderService.obtenerUltimosPedidos();
    console.log(pedidos);
  }
}
