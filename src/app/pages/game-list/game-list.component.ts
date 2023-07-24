import { Component, inject } from '@angular/core';
import { Game } from 'src/app/interfaces/game.interface';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent {
  private gamesService = inject(GameService);

  games: Game[];
  response: any;
  currentPage: number;
  maxPages: number | undefined;
  closePages: number[];

  constructor() {
    this.currentPage = 1;
    this.closePages = [];
    this.games = [];
  }

  ngOnInit() {
    this.setGames();
  }

  setGames = async () => {
    this.response = await this.gamesService.getGamesByPage(this.currentPage);
    this.maxPages = this.response.max_pages;
    this.games = this.response.result;
    this.closePages = this.setClosePages(this.currentPage, this.maxPages!);
  };

  setClosePages = (currentPage: number, maxPages: number) => {
    const closePages = [];
    switch (currentPage) {
      case 1:
      case 2:
        closePages.push(1, 2, 3, 4, 5);
        break;
      case maxPages - 1:
      case maxPages:
        closePages.push(
          maxPages - 4,
          maxPages - 3,
          maxPages - 2,
          maxPages - 1,
          maxPages
        );
        break;
      default:
        closePages.push(
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2
        );
        break;
    }
    return closePages;
  };

  onClickGoToPage = (page: number) => {
    this.currentPage = page;
    this.setGames();
  };
}
