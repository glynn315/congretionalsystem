import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { RequestFormsService } from '../../services/request-forms.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestForms } from '../../models/request-forms.model';
@Component({
  selector: 'app-social-worker',
  standalone: true,
  imports: [ModalComponent, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './social-worker.component.html',
  styleUrls: ['./social-worker.component.scss'],
  providers: [RequestFormsService]
})
export class SocialWorkerComponent implements OnInit {
  headerTitle: string = '';
  modalVisible: boolean = false;
  controlNumber: string|null = null;
  user: any = null;
  nameWarning: string | null = null;
  RequestForms: RequestForms = {
    control_number: 0,
    patients_name: '',
    representative_name: '',
    address: '' ,
    request_provided: '' ,
    provider_id: 0 ,
    account_id: 0 ,
    contact_number: null ,
    amount: null ,
  }
  recentRequest: RequestForms[] =[];
  
  constructor(private RequestServices : RequestFormsService) {}
  
  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
    this.checkRecent();
  }
  checkNameChange(name: string) {
    if (!name || name.trim() === '') {
      this.nameWarning = null;
      return;
    }

    const hasRecentDuplicate = this.recentRequest.some(req =>
      req.patients_name!.trim().toLowerCase() === name.trim().toLowerCase()
    );

    this.nameWarning = hasRecentDuplicate
      ? "This patient has already made a request within the last 3 months."
      : null;
  }

  submitRequest(){
    this.RequestForms.account_id = this.user?.account_id;
    this.RequestServices.storeRequest(this.RequestForms).subscribe((formRequest: any) => {
      this.controlNumber = formRequest[1].control_number;
      this.modalVisible = false;
      setTimeout(() => {
        alert("The Data is added");
        this.generatePrintable();
      }, 500);

    });
  }
  checkRecent(){
    this.RequestServices.displayRecent().subscribe((data) =>{
      this.recentRequest = data;
    });
  }
  generatePrintable() {
    const printable = document.getElementById('printableForm');
    if (printable) {
      printable.removeAttribute('hidden');
      window.print();
      printable.setAttribute('hidden', 'true');
    }
  }
  openModalDOH(){
    localStorage.setItem('Assistance', 'DOH');
    this.headerTitle = 'Form Request ' + localStorage.getItem('Assistance');
    this.modalVisible = true;
    this.RequestForms.provider_id = 1;
    
  }
  openModalDSWD(){
    localStorage.setItem('Assistance', 'DSWD');
    this.headerTitle = 'Form Request ' + localStorage.getItem('Assistance');
    this.modalVisible = true;
    this.RequestForms.provider_id = 2;
  }
  closeModal(){
    localStorage.removeItem('Assistance');
    this.modalVisible = false;
  }
}
