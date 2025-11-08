import { Component, OnInit } from '@angular/core';
import { LucideAngularModule , BanknoteArrowUp } from 'lucide-angular';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Fundings } from '../../models/Fundings/fundings.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FundingsService } from '../../services/Fundings/fundings.service';
import { BudgetsService } from '../../services/Budget/budgets.service';
import { Budget } from '../../models/Budget/budget.model';

@Component({
  selector: 'app-fundings',
  imports: [LucideAngularModule, ModalComponent , HttpClientModule , CommonModule , FormsModule],
  templateUrl: './fundings.component.html',
  styleUrl: './fundings.component.scss',
  providers: [FundingsService , BudgetsService]
})
export class FundingsComponent implements OnInit {
  readonly Funding = BanknoteArrowUp;
  isVisible: boolean = false;
  TitleHeader: string = 'Update Fundings'
  FundingID: number = 0;
  fundingsInformation : Fundings[] = [];
  pettyCashFunding : Fundings = {
    
  };
  budgetField: Budget ={
    fundings_id: 0,
    amount: 0,
    created_by: 123
  }
  TotalBudget: any;

  constructor(private FundingsServices : FundingsService , private BudgetServices : BudgetsService){}

  ngOnInit(): void {
    this.displayFunding();
    this.displayBudgets();
    this.displayPettyBudgets();
  }

  displayBudgets(){
    this.BudgetServices.displayTotalBudget().subscribe((data) => {
      this.TotalBudget = data;
    })
  }

  displayPettyBudgets() {
    this.FundingsServices.displayPettyFundings().subscribe((data) => {
      this.pettyCashFunding = data;
    });
  }

  addPettyCashFunds() {
    if (!this.pettyCashFunding.id) return;

    this.budgetField.fundings_id = this.pettyCashFunding.id;
    this.BudgetServices.storeBudget(this.budgetField).subscribe(() => {
      this.displayPettyBudgets();
      this.budgetField.amount = 0;
    });
  }

  getBudgetByFundingId(fundingId: number): number {
    const budget = this.TotalBudget?.find((b: any) => b.fundings_id === fundingId);
    return budget ? budget.total_remaining_budget : 0;
  }

  displayFunding(){
    this.FundingsServices.displayFundings().subscribe((data) => {
      this.fundingsInformation = data;
    });
  }

  openModal(id : number){
    this.isVisible = true;
    this.FundingID = id;
  }

  addFundings(){
    this.budgetField.fundings_id = this.FundingID;
    this.BudgetServices.storeBudget(this.budgetField).subscribe(() => {

    });
  }
  closeModal(){
    this.isVisible = false;
  }
}
