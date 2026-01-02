import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pettycash } from '../../models/PettyCash/pettycash.model';

@Injectable({
  providedIn: 'root'
})
export class PettycashService {
  private apiUrl = `${environment.apiUrl}/pettycash`;

  constructor(private http: HttpClient) { }

  displayPettyCash(): Observable<Pettycash[]>{
    return this.http.get<Pettycash[]>(`${this.apiUrl}/displayPettyCash`)
  }

  storePettyCash(post : Pettycash) : Observable<Pettycash>{
    return this.http.post<Pettycash>(`${this.apiUrl}/storePettyCash`, post);
  }
}
