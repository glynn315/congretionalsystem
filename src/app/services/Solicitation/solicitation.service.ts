import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Solicitation } from '../../models/Solicitation/solicitation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitationService {
  private apiUrl = `${environment.apiUrl}/solicitation`;

  constructor(private http: HttpClient) { }

  displaySolicitation(): Observable<Solicitation[]>{
    return this.http.get<Solicitation[]>(`${this.apiUrl}/displaySolicitation`)
  }

  storeSolicitation(post : Solicitation) : Observable<Solicitation>{
    return this.http.post<Solicitation>(`${this.apiUrl}/storeSolicitation`, post);
  }
}
