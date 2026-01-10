import { Component, OnInit } from '@angular/core';
import { RequestForms } from '../../../models/request-forms.model';
import { RequestFormsService } from '../../../services/request-forms.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-view-history',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './view-history.component.html',
  styleUrl: './view-history.component.scss',
  providers: [RequestFormsService]
})
export class ViewHistoryComponent implements OnInit {

  constructor(private RequestServices : RequestFormsService){}


  ngOnInit(): void {
    this.displayForm();
  }
  RequestForm : RequestForms[] = [];
  filteredData: RequestForms[] = [];
  paginatedData: RequestForms[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  searchTerm: string = '';
  isModalOpen = false;
  selectedRequest: any = {};
  isCancelChecked = false;
  cancelReason = '';
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
  displayForm() {
    this.RequestServices.displayRecent().subscribe((data) => {
      this.RequestForm = data;
      this.filteredData = [...this.RequestForm];
      this.updatePaginationRequests();
    });
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
  openModifyModal(request: any) {
    this.selectedRequest = { ...request };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedRequest = {};
  }
  updateRequest() {
    if (this.isCancelChecked) {
      this.selectedRequest.is_active = false;
      this.selectedRequest.is_cancel = true;
      this.selectedRequest.cancel_information = this.cancelReason;
    }

    this.RequestServices.updateRequest(this.selectedRequest.request_form_id, this.selectedRequest).subscribe({
      next: () => {
        this.closeModal();
        //this.loadRequests();
        this.resetCancelState();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
  resetCancelState() {
    this.isCancelChecked = false;
    this.cancelReason = '';
  }
}
