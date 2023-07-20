import { Component, inject } from '@angular/core';
import { Game } from 'src/app/interfaces/game.interface';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.scss']
})
export class BasketPageComponent {

  

basketService = inject(BasketService);

games: Game[];

  

constructor(){
  this.games = [];
}

ngOnInit() {
  this.games = this.basketService.getAll();
}

onClickEliminar(indice: number) {
  this.basketService.deleteGame(indice)
}

}
