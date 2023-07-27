import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/interfaces/game.interface';
import { Screenshot } from 'src/app/interfaces/screenshot.interface';
import { BasketService } from 'src/app/services/basket.service';
import { GameService } from 'src/app/services/game.service';
import { OrderService } from 'src/app/services/order.service';
import { ScreenshotService } from 'src/app/services/screenshot.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent {
  orderService = inject(OrderService);
  gameService = inject(GameService);
  basketService = inject(BasketService);
  screenshotService = inject(ScreenshotService);

  activatedRoute = inject(ActivatedRoute);

  game: Game | undefined;
  screenshots: Screenshot[];

  arrGames: Game[];
  precioFinal: number;
  order: any;

  constructor() {
    this.screenshots = [];
    this.arrGames = [];
    this.precioFinal = 0;
  }

  ngOnInit() {
    this.setOrder();
  }

  setOrder() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.order = await this.orderService.obtenerPedidoEnDetalle(
        parseInt(params['orderId'])
      );
      this.getPedidos();
    });
  }

  async getPedidos() {
    for (let game of this.order.games) {
      this.arrGames.push(await this.gameService.getById(game));
    }
  }

  precioAcumulado() {
    let precio = 0;
    for (let game of this.arrGames) {
      precio += game.price;
    }
    return precio;
  }

  getTotalPrice(): Number {
    this.precioFinal = this.precioAcumulado();

    return this.precioFinal;
  }

  orderByUser() {}
}
