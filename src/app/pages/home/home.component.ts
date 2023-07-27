import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/interfaces/game.interface';
import { GameService } from 'src/app/services/game.service';
import { ScreenshotService } from 'src/app/services/screenshot.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  router = inject(Router);
  gameService = inject(GameService);
  screenShotService = inject(ScreenshotService);

  games: Game[];

  constructor() {
    this.games = [];
  }

  ngOnInit() {
    this.setGames();
  }

  async setGames() {
    const allGames = await this.gameService.getAll();
    const number = Math.ceil(Math.random() * (allGames.length - 5));
    for (let i = 0; i < 5; i++) {
      try {
        let screenshot = await this.screenShotService.getScreenshotsById(
          allGames[number + i].id
        );
        if (screenshot.length > 0) {
          allGames[number + i].header_image = screenshot[0].path_full;
          this.games.push(allGames[number + i]);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  onClickNavigate(id: number) {
    this.router.navigate(['/gameDetail/' + id]);
  }
}
