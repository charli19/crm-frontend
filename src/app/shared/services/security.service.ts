import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private url = 'http://localhost:8080';

  private grantType: string = 'client_credentials';
  private clientId: string = 'eid';
  private clientSecret: string = '123456';

  constructor(private httpClient: HttpClient) {}

  public login(username: any, password: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    const body = 'username=' + username + '&password=' + password;

    return this.httpClient.post<Observable<any>>(this.url + '/login', body, {
      observe: 'response',
      headers,
    });
  }

  public getAccessToken(): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    const body =
      'grant_type=' +
      this.grantType +
      '&client_id=' +
      this.clientId +
      '&client_secret=' +
      this.clientSecret;

    return this.httpClient.post<Observable<any>>(
      this.url + '/oauth2/token',
      body,
      {
        observe: 'response',
        headers,
      }
    );
  }

  public logout(): Observable<any> {
    return this.httpClient.post<Observable<any>>(this.url + '/logout', null, {
      observe: 'response',
    });
  }
}
