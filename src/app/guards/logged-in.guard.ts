import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const authservice = inject(AuthService);
  const router = inject(Router);

  if(!authservice.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};

export const loggedInLoadGuard: CanMatchFn = (route, segments) => { // for lazy loading
  const authservice = inject(AuthService);
  const router = inject(Router);

  if(!authservice.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
