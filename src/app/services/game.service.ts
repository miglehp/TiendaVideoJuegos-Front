import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Game } from '../interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  httpClient = inject(HttpClient);
  baseUrl: string;

  constructor() { 
    this.baseUrl = 'http://localhost:4200/newGame'
  }

  registro(formValue: any): Promise<Game> {
    return firstValueFrom(
      this.httpClient.post<Game>(`${this.baseUrl}/newGame`, formValue)
    )
  }
}
