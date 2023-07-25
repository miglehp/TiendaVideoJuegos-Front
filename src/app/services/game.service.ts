import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Game } from '../interfaces/game.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  httpClient = inject(HttpClient);
  baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:3000/api/games';
  }

  getAll(): Promise<Game[]> {
    return firstValueFrom(this.httpClient.get<Game[]>(this.baseUrl));
  }

  registro(formValue: any): Promise<Game> {
    return firstValueFrom(
      this.httpClient.post<Game>(`${this.baseUrl}`, formValue)
    );
  }

  getById(id: number): Promise<Game> {
    return firstValueFrom(this.httpClient.get<Game>(this.baseUrl + '/' + id));
  }

  getGamesByPage = (page: number): Promise<Game[]> =>
    firstValueFrom(
      this.httpClient.get<Game[]>(this.baseUrl + '/paginate/' + page)
    );

  getGamesByGenreAndPage = (genre: string, page: number = 1) =>
    firstValueFrom(
      this.httpClient.get(`${this.baseUrl}/genre/${genre}/paginate/${page}`)
    );

  getGamesByTitleAndPage = (title: string, page: number = 1) =>
    firstValueFrom(
      this.httpClient.get(`${this.baseUrl}/title/${title}/paginate/${page}`)
    );

  getGamesByGenreAndTitleAndPage = (
    genre: string,
    title: string,
    page: number = 1
  ) =>
    firstValueFrom(
      this.httpClient.get(
        `${this.baseUrl}/genre/${genre}/title/${title}/paginate/${page}`
      )
    );
  deleteById(gameId: string) {
    return firstValueFrom(
      this.httpClient.delete<any>(`${this.baseUrl}/${gameId}`)
    );
  }

  create(formValue: any): Promise<Game | any> {
    return firstValueFrom(
      this.httpClient.post<Game | any>(this.baseUrl + '/insert', formValue)
    );
  }
}
