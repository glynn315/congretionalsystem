import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, UserPlus , ChevronLeft } from 'lucide-angular';
import { ModalComponent } from '../../shared/modal/modal.component';
import { MasterlistService } from '../../services/MasterList/masterlist.service';
import { HttpClientModule } from '@angular/common/http';
import { Masterlist } from '../../models/Masterlist/masterlist.model';
import { ActivatedRoute, Router } from '@angular/router';

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

  closeModal() {
    this.masterlistModal = false;
  }
  backtoMasterList(){
    this.Router.navigate(['/masterlist']);
  }

}
