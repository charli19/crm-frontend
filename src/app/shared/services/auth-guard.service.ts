import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const accessToken = sessionStorage.getItem('access_token');
    if (!accessToken) {
      this.router.navigate(['login'], { replaceUrl: true });
      return false;
    }
    return true;
  }
}
