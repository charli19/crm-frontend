import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/shared/services/security.service';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(public securityService: SecurityService, public router: Router) {}

  ngOnInit(): void {}

  public login(): void {
    if (this.form.valid) {
      this.securityService
        .login(
          this.form.get('username')?.value,
          this.form.get('password')?.value
        )
        .subscribe((res) => {
          if (res.status === 200) {
            this.getAccessToken();
          }
        });
    }
  }

  private getAccessToken() {
    this.securityService.getAccessToken().subscribe((res) => {
      if (res.status === 200) {
        sessionStorage.setItem('access_token', res.body.access_token);
        this.router.navigate(['contacts'], { replaceUrl: true });
      }
    });
  }
}
