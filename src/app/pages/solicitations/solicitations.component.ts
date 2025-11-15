import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { LucideAngularModule , FilePlusIcon } from 'lucide-angular';
import { SolicitationService } from '../../services/Solicitation/solicitation.service';
import { Solicitation } from '../../models/Solicitation/solicitation.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
@Component({
  selector: 'app-solicitations',
  imports: [FullCalendarModule,ModalComponent, LucideAngularModule, FormsModule, CommonModule, HttpClientModule],
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
    reveivedBy: 123,
    particular: '',
    amount: null
  }
  SolicitationData: Solicitation[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [],
    dateClick: (info) => this.handleDateClick(info),
  };

  constructor(private SolicitationService : SolicitationService) {}

  ngOnInit(): void {
    this.displayList();
  }

  displayList() {
    this.SolicitationService.displaySolicitation().subscribe((data) => {
      this.SolicitationData = data;
      this.loadCalendarEvents();
    });
  }

  SubmitSolicitation(){
    this.addnewSolicitation();
  }

  addnewSolicitation(){
    this.SolicitationService.storeSolicitation(this.SolicitationFields).subscribe(() => {
      this.closeModal();
      this.displayList();
    });
  }
  loadCalendarEvents() {
    this.calendarOptions.events = this.SolicitationData.map(solicitation => ({
      title: solicitation.name_solicitor + ' - ' + solicitation.purpose,
      date: solicitation.dateCreated
    }));
  }

  handleDateClick(info: any) {
    alert('Date clicked: ' + info.dateStr);
  }

  openModal(){
    this.isVisible = true;
  }
  closeModal(){
    this.isVisible = false;
  }
}
