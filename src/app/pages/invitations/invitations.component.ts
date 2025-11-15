import { Component, OnInit } from '@angular/core';
import { LucideAngularModule, FilePlusIcon } from 'lucide-angular';
import { ModalComponent } from '../../shared/modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvitationService } from '../../services/Invitation/invitation.service';
import { Invitation } from '../../models/Invitation/invitation.model';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-invitations',
  standalone: true,
  imports: [
    LucideAngularModule,
    ModalComponent,
    CommonModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule
  ],
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.scss'],
  providers: [InvitationService]
})
export class InvitationsComponent implements OnInit {

  readonly plus = FilePlusIcon;
  isVisible = false;
  TitleHeader = 'Invitations';

  InvitationFields: Invitation = {
    name_inviter: '',
    purpose: '',
    reveivedBy: 123,
    dateInvitation: '',
    event_address: '',
    remarks: '',
    contact_number: null
  };

  InvitationData: Invitation[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [],
    dateClick: (info) => this.handleDateClick(info),
  };

  constructor(private InvitationServices: InvitationService) {}

  ngOnInit(): void {
    this.displayList();
  }

  displayList() {
    this.InvitationServices.displayInvitation().subscribe((data) => {
      this.InvitationData = data;
      this.loadCalendarEvents();
    });
  }

  loadCalendarEvents() {
    this.calendarOptions.events = this.InvitationData.map(invite => ({
      title: invite.name_inviter + ' - ' + invite.purpose,
      date: invite.dateInvitation
    }));
  }

  handleDateClick(info: any) {
    alert('Date clicked: ' + info.dateStr);
  }

  submitInvitation() {
    this.newInvitation();
  }

  newInvitation() {
    this.InvitationServices.storeInvitation(this.InvitationFields).subscribe(() => {
      this.displayList();
      this.isVisible = false;
    });
  }

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }
}
