import { Component, OnInit } from '@angular/core';
import { RequestFormsService } from '../../services/request-forms.service';
import { RequestForms } from '../../models/request-forms.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule , CirclePlus , MapPinPlus } from 'lucide-angular';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Area } from '../../models/Area/area.model';
import { AreaService } from '../../services/Area/area.service';

@Component({
  selector: 'app-masterlist',
  imports: [ModalComponent ,HttpClientModule , CommonModule , FormsModule, LucideAngularModule],
  templateUrl: './masterlist.component.html',
  styleUrl: './masterlist.component.scss',
  providers: [RequestFormsService, AreaService]
})
export class MasterlistComponent implements OnInit {
  readonly plus = CirclePlus;
  readonly mapPlus = MapPinPlus;
  RequestForm : RequestForms[] = [];
  headerTitle = "Area Information";

  AreaModal: boolean = false;
  dropDownArea: Area[] = [];
  areaFields: Area = {
    areaInformation: '',
    municipality: '',
    created_by: 2,
  }

  constructor(private RequestServices : RequestFormsService, private AreaServices : AreaService){}

  ngOnInit(): void {
    this.displayForm();
  }

  displayDropDown(){
    this.AreaServices.dropDownArea().subscribe((data) => {
      this.dropDownArea = data;
    });
  }

  displayForm(){
    this.RequestServices.displayForms().subscribe((data) => {
      this.RequestForm = data;
    });
  }
  submitArea(){
    this.AreaServices.storeArea(this.areaFields).subscribe(() => {

    });
  }

  openAreaModal(){
    this.AreaModal = true;  
  }
  closeModal(){
    this.AreaModal = false;
  }

}
