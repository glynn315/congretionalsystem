import { Component, OnInit } from '@angular/core';
import { BudgetsService } from '../../services/Budget/budgets.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LucideAngularModule } from 'lucide-angular';
import { Budget } from '../../models/Budget/budget.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fundings-history',
  imports: [CommonModule, FormsModule , HttpClientModule , LucideAngularModule],
  templateUrl: './fundings-history.component.html',
  styleUrl: './fundings-history.component.scss',
  providers: [BudgetsService]
})
export class FundingsHistoryComponent implements OnInit {

  fundingsID: number| null = null;
  fundingsList: Budget[] = [];

  constructor(private BudgetServices : BudgetsService , private actRoute: ActivatedRoute){ }

  ngOnInit(): void {
    this.fundingsID = Number(this.actRoute.snapshot.paramMap.get('FundingID'));
    if (this.fundingsID) {
      this.displayBudget();
    }
    
  } 

  displayBudget(){
    this.BudgetServices.displayBudgetbyID(this.fundingsID!).subscribe((data) => {
      this.fundingsList = data;
    })
  }

}
