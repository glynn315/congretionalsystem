import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Budget } from '../../models/Budget/budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetsService {

  private apiUrl = `${environment.apiUrl}/budget`;

  constructor(private http: HttpClient) { }

  displayBudget(): Observable<Budget[]>{
    return this.http.get<Budget[]>(`${this.apiUrl}/displayBudgets`)
  }

  storeBudget(post : Budget) : Observable<Budget>{
    return this.http.post<Budget>(`${this.apiUrl}/storeBudgets`, post);
  }
  displayTotalBudget() : Observable<Budget>{
    return this.http.get<Budget>(`${this.apiUrl}/countBudget`);
  }
}
