import { Component } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-social-worker',
  imports: [ModalComponent],
  templateUrl: './social-worker.component.html',
  styleUrl: './social-worker.component.scss'
})
export class SocialWorkerComponent {
  headerTitle: string = '';
  modalVisible: boolean = false;


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
