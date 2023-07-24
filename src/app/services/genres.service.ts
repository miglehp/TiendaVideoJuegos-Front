import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Genre } from '../interfaces/genre.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  httpClient = inject(HttpClient);
  baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:3000/api/games/genre';
  }

  getAll = (): Promise<Genre[]> => firstValueFrom(this.httpClient.get<Genre[]>(this.baseUrl));

  getGamesOfGenre = (genre: string, page: number = 1) => firstValueFrom(this.httpClient.get(`${this.baseUrl}/${genre}/paginate/${page}`));

}
