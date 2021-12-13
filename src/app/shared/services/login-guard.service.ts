import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class LoginGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      this.router.navigate(['/contacts'], { replaceUrl: true });
      return true;
    }
    return true;
  }
}
