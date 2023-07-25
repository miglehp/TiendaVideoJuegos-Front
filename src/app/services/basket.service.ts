import { Injectable } from '@angular/core';
import { Game } from '../interfaces/game.interface';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  arrGames: Game[];

  constructor() {
    this.arrGames = [];
  }

  getAll(): Game[] {
    if (localStorage.getItem('basket')) {
      this.arrGames = JSON.parse(localStorage.getItem('basket')!);
    }

    return this.arrGames;
  }

  create(newGame: Game): any {
    this.arrGames.push(newGame);
    this.saveData(this.arrGames);
  }

  deleteGame(indice: number): void {
    this.arrGames.splice(indice, 1);
    this.saveData(this.arrGames);
  }

  saveData(games: Game[]) {
    localStorage.setItem('basket', JSON.stringify(games));
  }

  precioAcumulado() {
    let precio = 0;
    for (let game of this.arrGames) {
      precio += game.price;
    }
    return precio;
  }

}
