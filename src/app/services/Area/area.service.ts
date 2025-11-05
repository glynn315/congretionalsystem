import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from '../../models/Area/area.model';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private apiUrl = `${environment.apiUrl}/area`;

  constructor(private http: HttpClient) { }

  dropDownArea(): Observable<Area[]>{
    return this.http.get<Area[]>(`${this.apiUrl}/dropdown`)
  }

  storeArea(post : Area) : Observable<Area>{
    return this.http.post<Area>(`${this.apiUrl}/store`, post);
  }
}
