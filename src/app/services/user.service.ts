import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   httpClient = inject(HttpClient);
   baseUrl: string;

  constructor() { 
    this.baseUrl = 'http://localhost:4200/api/users';
  }

  create(formValue: any): Promise<User | any>{
    return firstValueFrom(
      this.httpClient.post<User | any>(this.baseUrl, formValue)
    )
  }
}
