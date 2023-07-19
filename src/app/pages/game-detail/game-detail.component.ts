import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/interfaces/game.interface';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent {

  game: Game | undefined;
  games: Game[];

  //servicios
  activatedRoute = inject(ActivatedRoute);
  private gamesService = inject(GameService);
  

  constructor() {

    this.games = [];
   
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {

      this.game = await this.gamesService.getById(parseInt(params['gameId']));
      console.log(this.game);
    });
  }

}
