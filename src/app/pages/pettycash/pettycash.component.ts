import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { PettycashService } from '../../services/PettyCash/pettycash.service';
import { Pettycash } from '../../models/PettyCash/pettycash.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pettycash',
  imports: [ModalComponent , CommonModule, FormsModule, LucideAngularModule, HttpClientModule],
  templateUrl: './pettycash.component.html',
  styleUrl: './pettycash.component.scss',
  providers: [PettycashService]
})
export class PettycashComponent implements OnInit {

  TitleHeader: string = 'Petty Cash Information';
  isVisible: boolean = false;
  readonly PlusIcon = Plus;
  PettyCashField: Pettycash ={
    requestName: '',
    pettycashDescription: '',
    pettycashAmount: null,
    receivedBy: 2,
  }
  PettyCashList: Pettycash[] = [];

  constructor(private PettyCashServices : PettycashService) {}
  ngOnInit(): void {

  }

  openModal(){
    this.isVisible = true;
  }
  

  closeModal(){
    this.isVisible = false;
  }

  submitPettyCash(){
    this.PettyCashServices.storePettyCash(this.PettyCashField).subscribe(() => {});
  }

}
