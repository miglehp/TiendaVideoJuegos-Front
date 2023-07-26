import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private httpClient = inject(HttpClient);
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:3000/api/pedidos';
  }

  obtenerUltimosPedidos(): Promise<any> {
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}`));
  }

  actualizarEstadoPedido(pedidoId: number, nuevoEstado: string): Promise<any> {
    const url = `${this.baseUrl}/${pedidoId}`;
    return firstValueFrom(
      this.httpClient.put<any>(url, { estado: nuevoEstado })
      );
  }

  crearPedido(arrGames: number[]) {
    return firstValueFrom(
      this.httpClient.post(`${this.baseUrl}/new`, { games: arrGames })
    );
  }
}
