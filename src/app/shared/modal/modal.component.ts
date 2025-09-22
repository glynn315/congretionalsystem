import { Component } from '@angular/core';
import { LucideAngularModule ,CircleX} from 'lucide-angular';
@Component({
  selector: 'app-modal',
  imports: [LucideAngularModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  readonly close = CircleX;
  headerText: string = 'Sample Header Text'
}
