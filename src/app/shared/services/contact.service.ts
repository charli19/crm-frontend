import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  url = 'http://localhost:8080';
  prefix = '/api/v1/contacts/';

  constructor(private httpClient: HttpClient) {}

  public getContacts(pageIndex: number, pageSize: number): Observable<any> {
    const params = '?pageIndex=' + pageIndex + '&pageSize=' + pageSize;
    const url = this.url + this.prefix + params;

    return this.httpClient.get<any>(url);
  }

  public createContact(contact: Contact): Observable<any> {
    const url = this.url + this.prefix;
    return this.httpClient.post<Contact>(url, contact, { observe: 'response' });
  }

  public deleteContact(id: number): Observable<any> {
    const url = this.url + this.prefix + id;
    return this.httpClient.delete<any>(url, { observe: 'response' });
  }
}
