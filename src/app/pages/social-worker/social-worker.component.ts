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
  RequestForms: RequestForms = {
    control_number: 0,
    patients_name: '',
    representative_name: '',
    address: '' ,
    provider_id: 0 ,
    account_id: 0 ,
    contact_number: null ,
    amount: null ,
  }
  
  constructor(private RequestServices : RequestFormsService) {}
  
  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  submitRequest(){
    this.RequestForms.account_id = this.user?.account_id;
    this.RequestServices.storeRequest(this.RequestForms).subscribe((formRequest: any) => {
      this.controlNumber = formRequest[1].control_number;
      this.modalVisible = false;

      // ✅ Automatically print after saving
      setTimeout(() => {
        this.generatePrintable();
      }, 500);

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
