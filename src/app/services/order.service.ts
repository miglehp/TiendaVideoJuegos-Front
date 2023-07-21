import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private httpClient = inject(HttpClient);
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:3000/api/orderList';
  }

  obtenerUltimosPedidos(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/ultimos`);
  }

  actualizarEstadoPedido(
    pedidoId: number,
    nuevoEstado: string
  ): Observable<any> {
    const url = `${this.baseUrl}/${pedidoId}/estado`;
    return this.httpClient.put<any>(url, { estado: nuevoEstado });
  }
}
