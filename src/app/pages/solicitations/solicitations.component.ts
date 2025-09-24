import { Component } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { LucideAngularModule , FilePlusIcon } from 'lucide-angular';

@Component({
  selector: 'app-solicitations',
  imports: [ModalComponent, LucideAngularModule],
  templateUrl: './solicitations.component.html',
  styleUrl: './solicitations.component.scss'
})
export class SolicitationsComponent {
  readonly plus = FilePlusIcon;
  isVisible: boolean = false;
  TitleHeader: string = 'Solicitaions'

  openModal(){
    this.isVisible = true;
  }
  closeModal(){
    this.isVisible = false;
  }
}
