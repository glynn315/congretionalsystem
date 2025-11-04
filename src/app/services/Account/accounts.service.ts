import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../../models/Accounts/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private apiUrl = `${environment.apiUrl}/accounts`;

  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  getUser(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/me`, { headers });
  }

  logout(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
  }

  displayAccount(): Observable<Account[]>{
    return this.http.get<Account[]>(`${this.apiUrl}/displayAccount`)
  }

  storeAccount(post : Account) : Observable<Account>{
    return this.http.post<Account>(`${this.apiUrl}/storeAccounts`, post);
  }
}
