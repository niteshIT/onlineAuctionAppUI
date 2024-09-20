import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/Auth/Auth.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export function authGuard(): CanActivateFn {
  return () => {
    const oauthService: AuthService = inject(AuthService);
    const otoastrService: ToastrService = inject(ToastrService)
    const orouterService: Router = inject(Router);
    if (oauthService.isloggedIn()) {
      return true;
    }
    else {
      otoastrService.error("Please Login First");

      orouterService.navigate(['login']);
      return false;

    }
  };
};
