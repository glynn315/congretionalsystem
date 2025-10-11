import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invitation } from '../../models/Invitation/invitation.model';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  private apiUrl = `${environment.apiUrl}/invitation`;

  constructor(private http: HttpClient) { }

  displayInvitation(): Observable<Invitation[]>{
    return this.http.get<Invitation[]>(`${this.apiUrl}/displayInvitation`)
  }

  storeInvitation(post : Invitation) : Observable<Invitation>{
    return this.http.post<Invitation>(`${this.apiUrl}/storeInvitation`, post);
  }
}
