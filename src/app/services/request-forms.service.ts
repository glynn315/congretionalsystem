import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { RequestForms } from '../models/request-forms.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestFormsService {

  private apiUrl = `${environment.apiUrl}/request`;

  constructor(private http: HttpClient) { }

  displayForms(): Observable<RequestForms[]>{
    return this.http.get<RequestForms[]>(`${this.apiUrl}/display`)
  }

  storeRequest(post : RequestForms) : Observable<RequestForms>{
    return this.http.post<RequestForms>(`${this.apiUrl}/store`, post);
  }
}
