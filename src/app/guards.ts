import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

const LoginGuard = () => {
  const router = inject(Router);
  if (localStorage.getItem('ecommerce_token')) {
    console.log(localStorage.getItem('ecommerce_token'));
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

const AdminGuard = () => {
  const router = inject(Router);
  const userService = inject(UserService);
  if (userService.esAdmin(localStorage.getItem('ecommerce_token')!)) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};

export { LoginGuard, AdminGuard };
