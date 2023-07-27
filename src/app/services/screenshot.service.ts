import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Screenshot } from '../interfaces/screenshot.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenshotService {
  httpClient = inject(HttpClient);
  baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:3000/api/screenshots';
  }

  getScreenshotsById = (gameId: number): Promise<Screenshot[]> => {
    return firstValueFrom(
      this.httpClient.get<Screenshot[]>(this.baseUrl + '/' + gameId)
    );
  };
}
