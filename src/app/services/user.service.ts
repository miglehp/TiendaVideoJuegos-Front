import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { firstValueFrom } from 'rxjs';
import { Login } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   httpClient = inject(HttpClient);
   baseUrl: string;

  constructor() { 
    this.baseUrl = 'http://localhost:3000/api/users';
  }

  create(formValue: any): Promise<User>{
    return firstValueFrom(
      this.httpClient.post<User>(this.baseUrl + '/register', formValue)
    );
  }

  getById(userId: number): Promise<User> {
    return firstValueFrom(
      this.httpClient.get<User>(`${this.baseUrl}/${userId}`)
    );
  }

  login(formValue: any): Promise<Login>{
    return firstValueFrom(
      this.httpClient.post<Login>(this.baseUrl + '/login', formValue)
    );
  }

  updateById(userId: number, formValue: any): Promise<User>{
    return firstValueFrom(
      this.httpClient.put<User>(`${this.baseUrl}/${userId}`, formValue)
    );
  }

  getProfile(): Promise<User>{
    return firstValueFrom(
      this.httpClient.get<User>(`${this.baseUrl}/profile`)
    )
  }

  isLogged(): Boolean{
    return localStorage.getItem('ecommerce_token') ? true : false;
  }

}
