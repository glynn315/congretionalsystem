import { Component, OnInit } from '@angular/core';
import { RequestFormsService } from '../../services/request-forms.service';
import { RequestForms } from '../../models/request-forms.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule , CirclePlus , MapPinPlus , Eye } from 'lucide-angular';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Area } from '../../models/Area/area.model';
import { AreaService } from '../../services/Area/area.service';
import { Router } from '@angular/router';
import { Masterlist } from '../../models/Masterlist/masterlist.model';
import { MasterlistService } from '../../services/MasterList/masterlist.service';

@Component({
  selector: 'app-masterlist',
  imports: [ModalComponent ,HttpClientModule , CommonModule , FormsModule, LucideAngularModule],
  templateUrl: './masterlist.component.html',
  styleUrl: './masterlist.component.scss',
  providers: [RequestFormsService, AreaService , MasterlistService]
})
export class MasterlistComponent implements OnInit {
  readonly plus = CirclePlus;
  readonly mapPlus = MapPinPlus;
  readonly viewEye = Eye;
  RequestForm : RequestForms[] = [];
  OfficialsList : Masterlist[] = [];
  headerTitle = "Area Information";
  AssistanceMasterList: boolean = true;
  OfficialsMasterList: boolean = false;
  locationList: boolean = false;
  AreaModal: boolean = false;
  dropDownArea: Area[] = [];
  areaID: number|null = null;
  searchTerm: string = '';
  
  filteredData: RequestForms[] = [];
  paginatedData: RequestForms[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  searchTermOfficials: string = '';
  filteredDataOfficials: Masterlist[] = [];
  paginatedDataOfficials: Masterlist[] = [];
  currentPageOfficials: number = 1;
  totalPagesOfficials: number = 1;
  areaFields: Area = {
    areaInformation: '',
    municipality: '',
    created_by: 2,
  }

  constructor(private RequestServices : RequestFormsService, private AreaServices : AreaService , private router: Router, private MasterListServices: MasterlistService){}

  ngOnInit(): void {
    this.displayForm();
    this.displayDropDown();
    this.displayMasterList();
  }

  displayDropDown(){
    this.AreaServices.dropDownArea().subscribe((data) => {
      this.dropDownArea = data;
    });
  }
  openMasterList(){
    this.AssistanceMasterList = false;
    this.locationList = true;
    this.OfficialsMasterList = false;
  }
  openRequestMasterList(){
    this.AssistanceMasterList = true;
    this.locationList = false;
    this.OfficialsMasterList = false;
  }
  openOfficialsMasterList(){
    this.AssistanceMasterList = false;
    this.locationList = false;
    this.OfficialsMasterList = true;
  }
  applyFilterRequests() {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredData = this.RequestForm.filter(req =>
      req.patients_name?.toLowerCase().includes(term)
    );
    this.currentPage = 1;
    this.updatePaginationRequests();
  }

  updatePaginationRequests() {
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.filteredData.slice(startIndex, endIndex);
  }

  nextPageRequests() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginationRequests();
    }
  }

  previousPageRequests() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginationRequests();
    }
  }

  applyFilterOfficials() {
    const term = this.searchTermOfficials.toLowerCase().trim();
    this.filteredDataOfficials = this.OfficialsList.filter(o =>
      o.name?.toLowerCase().includes(term)
    );
    this.currentPageOfficials = 1;
    this.updatePaginationOfficials();
  }

  updatePaginationOfficials() {
    this.totalPagesOfficials = Math.ceil(this.filteredDataOfficials.length / this.itemsPerPage);
    const startIndex = (this.currentPageOfficials - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedDataOfficials = this.filteredDataOfficials.slice(startIndex, endIndex);
  }

  nextPageOfficials() {
    if (this.currentPageOfficials < this.totalPagesOfficials) {
      this.currentPageOfficials++;
      this.updatePaginationOfficials();
    }
  }

  previousPageOfficials() {
    if (this.currentPageOfficials > 1) {
      this.currentPageOfficials--;
      this.updatePaginationOfficials();
    }
  }


  viewInformation(area_id: number){
    if (area_id) {
      this.areaID = area_id;
      this.router.navigate([`/viewInformation/${this.areaID}`]);
    }
  }

  displayForm() {
    this.RequestServices.displayForms().subscribe((data) => {
      this.RequestForm = data;
      this.filteredData = [...this.RequestForm];
      this.updatePaginationRequests();
    });
  }

  displayMasterList(){
    this.MasterListServices.displayPersonel().subscribe((data) => {
      this.OfficialsList = data;
      this.filteredDataOfficials = [...this.OfficialsList];
      this.updatePaginationOfficials();
    });
  }
  submitArea(){
    this.AreaServices.storeArea(this.areaFields).subscribe(() => {
      this.displayDropDown();
      this.AreaModal = false;
      this.AssistanceMasterList = false;
      this.locationList = true;
      this.OfficialsMasterList = false;
    });
  }

  openAreaModal(){
    this.AreaModal = true;  
  }
  closeModal(){
    this.AreaModal = false;
  }

}
