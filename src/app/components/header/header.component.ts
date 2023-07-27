import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import tippy from 'tippy.js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
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

  ngAfterViewInit() {
    this.setTooltips();
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
    localStorage.removeItem('basket');
    localStorage.removeItem('ecommerce_token');
    this.router.navigate(['/home']);
  }

  setTooltips(){
    const tooltipConfigs = [
      { selector: '#home', content: 'Home' },
      { selector: '#gameList', content: 'Browse games' },
      { selector: '#basketPage', content: 'Shopping cart' },
      { selector: '#login', content: 'Login' },
      { selector: '#userProfile', content: 'Profile' },
      { selector: '#orderList', content: 'List of orders' },
      { selector: '#logOut', content: 'Logout' },
    ];

    tooltipConfigs.forEach((config) => {
      tippy(config.selector, {
        content: config.content,
        animation: false,
      });
    });
  }
}
