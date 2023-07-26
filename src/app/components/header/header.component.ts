import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  userService = inject(UserService);
  esAdmin: Boolean;
  userToken: any;
  router = inject(Router);
  token: string;

  constructor() {
    this.token = '';
    this.esAdmin = false;
  }

  ngOnInit() {
    this.getToken();
    this.setToken();
  }

  getToken() {
    this.userToken = localStorage.getItem('ecommerce_token');
  }

  setToken() {
    if (localStorage.getItem('ecommerce_token')) {
      this.token = localStorage.getItem('ecommerce_token')!;
    }
  }

  onClickLogout() {
    localStorage.removeItem('ecommerce_token');
    this.router.navigate(['/home']);
  }
}
