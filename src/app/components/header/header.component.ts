import { Component, inject } from '@angular/core';
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

  constructor() {
    this.esAdmin = false;
  }

  ngOnInit() {
    this.getToken();
  }

  getToken() {
    this.userToken = localStorage.getItem('ecommerce_token');
  }
}
