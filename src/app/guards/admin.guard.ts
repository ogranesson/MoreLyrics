import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { FirestoreService } from '../firestore.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { Admin } from '../models/admin.model';

export const adminGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const firestoreService = inject(FirestoreService);
  const router = inject(Router);

  return firestoreService.getAdmins(authService.getUid()).pipe(map(
    (admin: Admin|undefined) => {
      if (admin) {
        return true;
      }

      return router.parseUrl('/home');
    }
  ))
};
