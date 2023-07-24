import { Component, inject } from '@angular/core';
import { Game } from 'src/app/interfaces/game.interface';
import { Genre } from 'src/app/interfaces/genre.interface';
import { GameService } from 'src/app/services/game.service';
import { GenresService } from 'src/app/services/genres.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent {
  private gamesService = inject(GameService);
  private genresService = inject(GenresService);

  games: Game[];
  response: any;
  currentPage: number;
  maxPages: number | undefined;
  closePages: number[];
  genres: Genre[];
  currentFilter: string | undefined;

  constructor() {
    this.currentPage = 1;
    this.closePages = [];
    this.games = [];
    this.genres = [];
  }

  ngOnInit() {
    this.setGames();
    this.setGenres();
  }

  setGames = async () => {
    this.response = await this.gamesService.getGamesByPage(this.currentPage);
    this.maxPages = this.response.max_pages;
    this.games = this.response.result;
    this.closePages = this.setClosePages(this.currentPage, this.maxPages!);
  };

  setGenres = async () => {
    this.genres = await this.genresService.getAll();
  };

  setGamesFiltered = async (filter: string) => {
    this.currentFilter = filter;
    this.response = await this.genresService.getGamesOfGenre(
      filter,
      this.currentPage
    );
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

  onChangeFilterByGenre = async ($event: any) => {
    if ($event.target.value) {
      this.setGamesFiltered($event.target.value);
    } else {
      this.setGames();
    }
  };

  onClickGoToPage = async (page: number) => {
    this.currentPage = page;
    if (this.currentFilter) {
      console.log(
        `navegando a la página ${page} con el filtro ${this.currentFilter}`
      );
      this.setGamesFiltered(this.currentFilter);
    } else {
      this.setGames();
      console.log(`navegando a la página ${page} sin filtros`);
    }
  };
}
