import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, UserPlus , ChevronLeft, Download } from 'lucide-angular';
import { ModalComponent } from '../../shared/modal/modal.component';
import { MasterlistService } from '../../services/MasterList/masterlist.service';
import { HttpClientModule } from '@angular/common/http';
import { Masterlist } from '../../models/Masterlist/masterlist.model';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-personel-list',
  imports: [FormsModule, CommonModule, LucideAngularModule, ModalComponent, HttpClientModule],
  templateUrl: './personel-list.component.html',
  styleUrl: './personel-list.component.scss',
  providers: [MasterlistService]
})
export class PersonelListComponent implements OnInit {

  readonly back = ChevronLeft;
  readonly UserPlus = UserPlus;
  readonly Download = Download;
  masterListHeader = "Personel Information";
  masterlistModal = false;
  areaPosition: any;
  areaID: number | null = null;

  MasterListFields: Masterlist = {
    first_name: '',
    last_name: '',
    middle_name: '',
    extension: '',
    birthday: '',
    sex: '',
    civil_status: '',
    purok: '',
    municipality_city: '',
    contact_number: null,
    affiliate: '',
    type: '',
    parallel_id: null,
    area_id: null,
    created_by: 2,
  };

  MasterList: Masterlist[] = [];
  BarangayOfficials: Masterlist[] = [];
  BarangaySK: Masterlist[] = [];
  BarangayLeaders: Masterlist[] = [];
  BarangayPurok: Masterlist[] = [];

  constructor(private MasterListServices: MasterlistService, private actRoute: ActivatedRoute , private Router: Router) {}

  ngOnInit(): void {
    this.areaID = Number(this.actRoute.snapshot.paramMap.get('area_id'));
    this.displayBarangay();
    this.displayLeaders();
    this.displayPurok();
    this.displaySK();
  }

  openModal1() {
    this.masterlistModal = true;
    this.areaPosition = "Barangay Officials";
    this.MasterListFields.type = "Barangay Officials";
  }

  openModal2() {
    this.masterlistModal = true;
    this.areaPosition = "SK Officials";
    this.MasterListFields.type = "SK Officials";
  }

  openModal3() {
    this.masterlistModal = true;
    this.areaPosition = "Additional Leaders";
    this.MasterListFields.type = "Additional Leaders";
  }

  openModal4() {
    this.masterlistModal = true;
    this.areaPosition = "Purok Leaders";
    this.MasterListFields.type = "Purok Leaders";
  }

  storePersonel() {
    this.MasterListFields.area_id = this.areaID;
    this.MasterListServices.storePersonel(this.MasterListFields).subscribe(() => {
      this.displayBarangay();
    });
  }

  displayBarangay() {
    this.MasterListServices.displayPersonelbyID(this.areaID!).subscribe((data) => {
      this.MasterList = data;
      this.BarangayOfficials = this.MasterList.filter(
        personel => personel.type === 'Barangay Officials'
      );
    });
  }
  displaySK() {
    this.MasterListServices.displayPersonelbyID(this.areaID!).subscribe((data) => {
      this.MasterList = data;
      this.BarangaySK = this.MasterList.filter(
        personel => personel.type === 'SK Officials'
      );
    });
  }
  displayLeaders() {
    this.MasterListServices.displayPersonelbyID(this.areaID!).subscribe((data) => {
      this.MasterList = data;
      this.BarangayLeaders = this.MasterList.filter(
        personel => personel.type === 'Additional Leaders'
      );
    });
  }
  displayPurok() {
    this.MasterListServices.displayPersonelbyID(this.areaID!).subscribe((data) => {
      this.MasterList = data;
      this.BarangayPurok = this.MasterList.filter(
        personel => personel.type === 'Purok Leaders'
      );
    });
  }

  exportToExcel() {
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    this.addSheet(workbook, this.BarangayOfficials, 'Barangay Officials');
    this.addSheet(workbook, this.BarangaySK, 'SK Officials');
    this.addSheet(workbook, this.BarangayLeaders, 'Additional Leaders');
    this.addSheet(workbook, this.BarangayPurok, 'Purok Leaders');

    const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
    });

    this.saveExcelFile(excelBuffer, 'Officials_Masterlist_By_Category');
  }
  private addSheet(workbook: XLSX.WorkBook, list: any[], sheetName: string) {
    if (!list || list.length === 0) {
        return;
    }

    const formattedData = list.map(person => ({
        First_Name: person.first_name,
        Middle_Name: person.middle_name || '',
        Last_Name: person.last_name,
        Extension: person.extension || '',
        Sex: person.sex,
        Civil_Status: person.civil_status,
        Birthday: person.birthday,
        Purok: person.purok,
        Municipality: person.municipality_city,
        Contact_Number: person.contact_number
    }));

    const worksheet: XLSX.WorkSheet =
        XLSX.utils.json_to_sheet(formattedData);

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  } 

  private saveExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });

    saveAs(data, `${fileName}_${new Date().getTime()}.xlsx`);
  }



  closeModal() {
    this.masterlistModal = false;
  }
  backtoMasterList(){
    this.Router.navigate(['/masterlist']);
  }

}
