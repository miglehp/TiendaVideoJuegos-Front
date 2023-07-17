import { Injectable } from '@angular/core';
import { GAMES} from '../db/games.db';
import { Game } from '../interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {



  constructor() { }


  getAll(): Game[]{
    return GAMES;
  }

  getById(id: number): Game | undefined {
      return GAMES.find(game => game.id === id);
    }

  

}
