import { inject } from '@angular/core';
import { Router } from '@angular/router';

const LoginGuard = () => {
  const router = inject(Router);

  if (localStorage.getItem('ecommerce_token')) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

export { LoginGuard };
