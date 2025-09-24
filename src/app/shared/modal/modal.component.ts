import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule ,CircleX} from 'lucide-angular';
@Component({
  selector: 'app-modal',
  imports: [LucideAngularModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  readonly x = CircleX;
  @Input() Title: string = "Header";
  @Input() isVisible: boolean = false;
  @Output() closeModal = new EventEmitter<void>();


  close(){
    this.closeModal.emit();
  }
}
