import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Masterlist } from '../../models/Masterlist/masterlist.model';

@Injectable({
  providedIn: 'root'
})
export class MasterlistService {

  private apiUrl = `${environment.apiUrl}/personel`;

  constructor(private http: HttpClient) { }

  displayPersonel(): Observable<Masterlist[]>{
    return this.http.get<Masterlist[]>(`${this.apiUrl}/displayList`)
  }
  displayPersonelbyID(id:number): Observable<Masterlist[]>{
    return this.http.get<Masterlist[]>(`${this.apiUrl}/displayList/${id}`)
  }

  storePersonel(post : Masterlist) : Observable<Masterlist>{
    return this.http.post<Masterlist>(`${this.apiUrl}/store`, post);
  }
}
