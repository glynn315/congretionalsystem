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
  RequestForms: RequestForms = {
    control_number: 0,
    patients_name: '',
    representative_name: '',
    address: '' ,
    provider_id: 0 ,
    account_id: 2 ,
    contact_number: 0 ,
    amount: 0 ,
  }
  
  constructor(private RequestServices : RequestFormsService) {}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  submitRequest(){
    this.RequestServices.storeRequest(this.RequestForms).subscribe(() => {
      
    });
  }
  
  



  openModalDOH(){
    localStorage.setItem('Assistance', 'DOH');
    this.headerTitle = 'Form Request ' + localStorage.getItem('Assistance');
    this.modalVisible = true;
    
  }
  openModalDSWD(){
    localStorage.setItem('Assistance', 'DSWD');
    this.headerTitle = 'Form Request ' + localStorage.getItem('Assistance');
    this.modalVisible = true;
  }
  closeModal(){
    localStorage.removeItem('Assistance');
    this.modalVisible = false;
  }
}
