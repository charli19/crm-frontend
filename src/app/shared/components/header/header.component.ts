import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'crm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public securityService: SecurityService, public router: Router) {}

  ngOnInit() {}

  public logout(): void {
    this.securityService.logout().subscribe((res) => {
      if (res.status === 200) {
        sessionStorage.removeItem('access_token');
        this.router.navigate(['login'], { replaceUrl: true });
      }
    });
  }
}
