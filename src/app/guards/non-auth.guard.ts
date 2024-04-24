import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

export const nonAuthGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authService = inject(AuthService);
  const loginRoute = '/login';

  return new Observable<boolean>((observer) => {
    authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      if (loggedIn && state.url === loginRoute) {
        router.navigate(['/home']); // Redirect to dashboard if logged in
        observer.next(false); // Prevent access to login page
      } else {
        observer.next(true); // Allow access to login page
      }
      observer.complete();
    });
  });
};
