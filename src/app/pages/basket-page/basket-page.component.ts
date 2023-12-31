import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/interfaces/game.interface';
import { BasketService } from 'src/app/services/basket.service';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.scss'],
})
export class BasketPageComponent {
  basketService = inject(BasketService);
  orderService = inject(OrderService);
  router = inject(Router);

  games: Game[];
  precioFinal: number;
  gamesId: number[];

  constructor() {
    this.games = [];
    this.precioFinal = 0;
    this.gamesId = [];
  }

  ngOnInit() {
    this.games = this.basketService.getAll();
  }

  onClickEliminar(indice: number) {
    this.basketService.deleteGame(indice);
  }

  onClickAddGame($event: Game) {
    this.games = this.basketService.create($event);

    return this.games;
  }

  getTotalPrice(): Number {
    this.precioFinal = this.basketService.precioAcumulado();

    return this.precioFinal;
  }

  onClickComprar() {
    for (let game of this.games) {
      this.gamesId.push(game.id);
    }

    this.orderService.crearPedido(this.gamesId);

    localStorage.removeItem('basket');

    Swal.fire('Your order is on the way!');
    this.router.navigate(['/dashboard']);
  }
}
