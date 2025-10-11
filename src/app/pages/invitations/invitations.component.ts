import { Component, OnInit } from '@angular/core';
import { LucideAngularModule , FilePlusIcon } from 'lucide-angular';
import { ModalComponent } from '../../shared/modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvitationService } from '../../services/Invitation/invitation.service';
import { Invitation } from '../../models/Invitation/invitation.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-invitations',
  imports: [LucideAngularModule, ModalComponent, CommonModule , FormsModule, HttpClientModule],
  templateUrl: './invitations.component.html',
  styleUrl: './invitations.component.scss',
  providers: [InvitationService]
})
export class InvitationsComponent implements OnInit {
  
  readonly plus = FilePlusIcon;
  isVisible: boolean = false;
  TitleHeader: string = 'Invitations'
  InvitationFields: Invitation ={
    name_inviter: '',
    purpose: '',
    reveivedBy: 123,
    dateInvitation: ''
  }


  constructor(private InvitationServices : InvitationService) {}

  ngOnInit(): void {
    
  }

  submitInvitation(){
    this.newInvitation();
  }

  newInvitation(){
    this.InvitationServices.storeInvitation(this.InvitationFields).subscribe(() => {

    });
  }

  openModal(){
    this.isVisible = true;
  }
  closeModal(){
    this.isVisible = false;
  }
}
