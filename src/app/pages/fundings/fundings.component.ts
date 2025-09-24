import { Component } from '@angular/core';
import { LucideAngularModule , BanknoteArrowUp } from 'lucide-angular';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-fundings',
  imports: [LucideAngularModule, ModalComponent],
  templateUrl: './fundings.component.html',
  styleUrl: './fundings.component.scss'
})
export class FundingsComponent {
  readonly Funding = BanknoteArrowUp;
  isVisible: boolean = false;
  TitleHeader: string = 'Update Fundings'

  openModal(){
    this.isVisible = true;
  }
  closeModal(){
    this.isVisible = false;
  }
}
