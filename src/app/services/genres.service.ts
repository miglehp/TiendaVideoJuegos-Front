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

  getAll = (): Promise<Genre[]> =>
    firstValueFrom(this.httpClient.get<Genre[]>(this.baseUrl));

  getGenresFromGame = (gameId: number): Promise<Genre[]> =>
    firstValueFrom(this.httpClient.get<Genre[]>(`${this.baseUrl}/${gameId}`));
}
