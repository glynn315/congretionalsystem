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
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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
  filterFromDate: string | null = null;
  filterToDate: string | null = null;

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
    let data = [...this.RequestForm];

    // 🔍 Search by patient name
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase().trim();
      data = data.filter(req =>
        req.patients_name?.toLowerCase().includes(term)
      );
    }

    // 📅 From Date filter
    if (this.filterFromDate) {
      const fromDate = new Date(this.filterFromDate);
      data = data.filter(req =>
        req.request_date && new Date(req.request_date) >= fromDate
      );
    }

    // 📅 To Date filter
    if (this.filterToDate) {
      const toDate = new Date(this.filterToDate);
      toDate.setHours(23, 59, 59, 999); // include whole day
      data = data.filter(req =>
        req.request_date && new Date(req.request_date) >= toDate
      );
    }

    this.filteredData = data;
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
      o.first_name?.toLowerCase().includes(term)
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
  clearDateFilters() {
    this.filterFromDate = null;
    this.filterToDate = null;
    this.searchTerm = '';
    this.applyFilterRequests();
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

  exportRequestsToExcel() {
    if (!this.filteredData || this.filteredData.length === 0) {
      return; // nothing to export
    }

    // Format data for Excel
    const excelData = this.filteredData.map(req => ({
      'Control No.': req.control_number,
      'Patient Name': req.patients_name,
      'Representative Name': req.representative_name,
      'Address': req.address,
      'Contact Number': req.contact_number,
      'Amount': req.amount,
      'Request Date': req.request_date
    }));

    // Create worksheet & workbook
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Request Master List': worksheet },
      SheetNames: ['Request Master List']
    };

    // Write to buffer
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    // Save file
    this.saveExcelFile(excelBuffer, 'Request_Master_List');
  }
  private saveExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });

    saveAs(data, `${fileName}_${new Date().getTime()}.xlsx`);
  }


  openAreaModal(){
    this.AreaModal = true;  
  }
  closeModal(){
    this.AreaModal = false;
  }

}
