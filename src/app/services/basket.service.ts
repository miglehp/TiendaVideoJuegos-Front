import { Injectable, inject } from '@angular/core';
import { Game } from '../interfaces/game.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  httpClient = inject(HttpClient);
  private arrGames: Game[];

  constructor() {
    this.arrGames = [];
  }

  getAll(): Game[] {
    if (localStorage.getItem('basket')) {
      this.arrGames = JSON.parse(localStorage.getItem('basket')!);
    }

    return this.arrGames;
  }

  create(newGame: Game): void {
    this.arrGames.push(newGame);
  }

  deleteGame(indice: number): void {
    this.arrGames.splice(indice, 1);
  }

  saveData(games: []) {
    localStorage.setItem('basket', JSON.stringify(games));
  }
}
