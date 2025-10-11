import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { LucideAngularModule , FilePlusIcon } from 'lucide-angular';
import { SolicitationService } from '../../services/Solicitation/solicitation.service';
import { Solicitation } from '../../models/Solicitation/solicitation.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-solicitations',
  imports: [ModalComponent, LucideAngularModule, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './solicitations.component.html',
  styleUrl: './solicitations.component.scss',
  providers: [SolicitationService]
})
export class SolicitationsComponent implements OnInit {
  
  readonly plus = FilePlusIcon;
  isVisible: boolean = false;
  TitleHeader: string = 'Solicitaions'
  SolicitationFields : Solicitation = {
    name_solicitor: '',
    purpose: '',
    reveivedBy: 123
  }

  constructor(private SolicitationService : SolicitationService) {}

  ngOnInit(): void {
    
  }

  SubmitSolicitation(){
    this.addnewSolicitation();
  }

  addnewSolicitation(){
    this.SolicitationService.storeSolicitation(this.SolicitationFields).subscribe(() => {

    });
  }

  openModal(){
    this.isVisible = true;
  }
  closeModal(){
    this.isVisible = false;
  }
}
