import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { Game } from 'src/app/interfaces/game.interface';
import { GameService } from 'src/app/services/game.service';
import { Screenshot } from 'src/app/interfaces/screenshot.interface';
import { ScreenshotService } from 'src/app/services/screenshot.service';
import { BasketService } from 'src/app/services/basket.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent {
  router = inject(Router);
  private gamesService = inject(GameService);
  private basketService = inject(BasketService);
  private screenshotServ = inject(ScreenshotService);
  private activatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);

  game: Game | undefined;
  screenshots: Screenshot[];

  constructor() {
    this.screenshots = [];
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.game = await this.gamesService.getById(parseInt(params['gameId']));
      this.screenshots = await this.screenshotServ.getScreenshotsById(
        parseInt(params['gameId'])
      );
    });
  }

  async onClickAddGame() {
    if (this.userService.isLogged()) {
      const basket = await this.basketService.create(this.game!);
      Swal.fire('Game added successfully');
    } else {
      this.router.navigate(['/login']);
    }
  }
}
