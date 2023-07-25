import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import { Game } from 'src/app/interfaces/game.interface';
import { GameService } from 'src/app/services/game.service';
import { Screenshot } from 'src/app/interfaces/screenshot.interface';
import { ScreenshotService } from 'src/app/services/screenshot.service';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent {
  private gamesService = inject(GameService);
  private basketService = inject(BasketService)
  private screenshotServ = inject(ScreenshotService);
  private activatedRoute = inject(ActivatedRoute);


  game: Game | undefined;
  screenshots: Screenshot[];

  constructor() {
    this.screenshots = [];
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.game = await this.gamesService.getById(parseInt(params['gameId']));
      this.screenshots = await this.screenshotServ.getScreenshotsById(parseInt(params['gameId']));
    });
  }

  async onClickAddGame() {
    const basket = await this.basketService.create(this.game!);
    console.log(basket);
  }

}
