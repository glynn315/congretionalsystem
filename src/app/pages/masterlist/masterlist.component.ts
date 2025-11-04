import { Component, OnInit } from '@angular/core';
import { RequestFormsService } from '../../services/request-forms.service';
import { RequestForms } from '../../models/request-forms.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-masterlist',
  imports: [HttpClientModule , CommonModule , FormsModule],
  templateUrl: './masterlist.component.html',
  styleUrl: './masterlist.component.scss',
  providers: [RequestFormsService]
})
export class MasterlistComponent implements OnInit {

  RequestForm : RequestForms[] = [];

  constructor(private RequestServices : RequestFormsService){}

  ngOnInit(): void {
    this.displayForm();
  }

  displayForm(){
    this.RequestServices.displayForms().subscribe((data) => {
      this.RequestForm = data;
    });
  }

}
