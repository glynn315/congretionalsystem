import { Component } from '@angular/core';
import { LucideAngularModule , FilePlusIcon } from 'lucide-angular';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-invitations',
  imports: [LucideAngularModule, ModalComponent],
  templateUrl: './invitations.component.html',
  styleUrl: './invitations.component.scss'
})
export class InvitationsComponent {
  readonly plus = FilePlusIcon;
  isVisible: boolean = false;
  TitleHeader: string = 'Invitations'

  openModal(){
    this.isVisible = true;
  }
  closeModal(){
    this.isVisible = false;
  }
}
