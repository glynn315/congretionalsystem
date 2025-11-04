import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fundings } from '../../models/Fundings/fundings.model';

@Injectable({
  providedIn: 'root'
})
export class FundingsService {

  private apiUrl = `${environment.apiUrl}/fundings`;

  constructor(private http: HttpClient) { }

  displayFundings(): Observable<Fundings[]>{
    return this.http.get<Fundings[]>(`${this.apiUrl}/displayFundings`)
  }


  displayPettyFundings(): Observable<Fundings>{
    return this.http.get<Fundings>(`${this.apiUrl}/displayPettyCashFunding`)
  }
}
