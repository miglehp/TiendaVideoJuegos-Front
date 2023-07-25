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
  nuevoEstado: string = '';

  constructor() {}
  ngOnInit(): void {
    this.obtenerUltimosPedidos();
  }

  async obtenerUltimosPedidos() {
    this.ultimosPedidos = (await this.orderService.obtenerUltimosPedidos()).pedidos;
    console.log(this.ultimosPedidos);
  }
  async actualizarEstado(pedido: any) {
    const data = await this.orderService
      .actualizarEstadoPedido(pedido.id, this.nuevoEstado)
      
          pedido.estado = pedido.nuevoEstado;
          pedido.nuevoEstado = ''; // Reiniciar el valor del nuevo estado
          console.log(data);
        
        
    
        
      
  }

  onChange($event: any){
    this.nuevoEstado = $event.target.value;
  }
}
