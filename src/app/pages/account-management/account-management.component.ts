import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule , UserPlus } from 'lucide-angular';
import { AccountsService } from '../../services/Account/accounts.service';
import { Account } from '../../models/Accounts/account.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-account-management',
  imports: [ModalComponent , FormsModule, CommonModule, LucideAngularModule, HttpClientModule],
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.scss',
  providers:[AccountsService]
})
export class AccountManagementComponent implements OnInit{
  readonly plus = UserPlus;
  TitleHeader: string = 'Account Information'
  isVisible: boolean = false;
  Accounts: Account[] = [];
  AccountFields: Account = {
    firstname: '',
    middlename: '',
    lastname: '',
    province: '',
    municipality: '',
    barangay: '',
    username: '',
    password: '',
    created_by: 1,
    role: ''
  }

  constructor(private AccountServices : AccountsService) {}

  ngOnInit(): void {
    this.displayList();
  }
  displayList(){
    this.AccountServices.displayAccount().subscribe((data) => {
      this.Accounts=data;
    });
  }

  closeModal(){
    this.isVisible = false;
  }
  openModal(){
    this.isVisible = true;
  }

  submitInformation(){
    this.AccountServices.storeAccount(this.AccountFields).subscribe(() => {

    });
  }

}
