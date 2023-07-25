import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  filtros: FormGroup;

  games: Game[];
  genres: Genre[];

  response: any;

  currentPage: number;
  closePages: number[];
  maxPages: number | undefined;

  activeFilter: {
    genre: string;
    title: string;
  };

  constructor() {
    this.currentPage = 1;
    this.closePages = [];
    this.games = [];
    this.genres = [];

    this.activeFilter = {
      genre: '',
      title: '',
    };

    this.filtros = new FormGroup({
      title: new FormControl(null),
      genre: new FormControl(null),
    });
  }

  ngOnInit() {
    this.setGames();
    this.setGenres();
  }

  pageDisabler = (page: number): boolean =>
    page === this.currentPage || page > this.maxPages!;

  setGames = async () => {
    this.response = await this.gamesService.getGamesByPage(this.currentPage);
    this.maxPages = this.response.max_pages;
    this.games = this.response.result;
    this.closePages = this.setClosePages(this.currentPage, this.maxPages!);
  };

  setGenres = async () => {
    this.genres = await this.genresService.getAll();
  };

  filteredGamesByGenre = async (filter: string) => {
    this.response = await this.gamesService.getGamesByGenreAndPage(
      filter,
      this.currentPage
    );
    this.maxPages = this.response.max_pages;
    this.games = this.response.result;
    this.closePages = this.setClosePages(this.currentPage, this.maxPages!);
  };

  filteredGamesByTitle = async (title: string) => {
    this.response = await this.gamesService.getGamesByTitleAndPage(
      title,
      this.currentPage
    );
    this.maxPages = this.response.max_pages;
    this.games = this.response.result;
    this.closePages = this.setClosePages(this.currentPage, this.maxPages!);
  };

  filteredGamesByGenreAndTitle = async (genre: string, title: string) => {
    this.response = await this.gamesService.getGamesByGenreAndTitleAndPage(
      genre,
      title,
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

  onClickGoToPage = async (page: number) => {
    this.currentPage = page;
    if (this.activeFilter.genre && this.activeFilter.title) {
      this.filteredGamesByGenreAndTitle(
        this.activeFilter.genre,
        this.activeFilter.title
      );
    } else if (this.activeFilter.genre) {
      this.filteredGamesByGenre(this.activeFilter.genre);
    } else if (this.activeFilter.title) {
      this.filteredGamesByTitle(this.activeFilter.title);
    } else {
      this.setGames();
    }
  };

  onSubmitFiltros = () => {
    const filtros = this.filtros.value;
    this.currentPage = 1;
    this.activeFilter = {
      genre: filtros.genre,
      title: filtros.title,
    };
    if (filtros.title && filtros.genre) {
      this.filteredGamesByGenreAndTitle(filtros.genre, filtros.title);
    } else if (filtros.title) {
      this.filteredGamesByTitle(filtros.title);
    } else if (filtros.genre) {
      this.filteredGamesByGenre(filtros.genre);
    } else {
      this.setGames();
    }
  };
}
