import { Component, inject } from '@angular/core';
import { Game } from 'src/app/interfaces/game.interface';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent {

  games: Game[];

  private gamesService = inject(GameService);

  constructor(){
    this.games = [];
  }

  ngOnInit(){
    this.games = this.gamesService.getAll();
  }

}
