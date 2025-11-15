import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { RequestFormsService } from '../../services/request-forms.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestForms } from '../../models/request-forms.model';

@Component({
  selector: 'app-social-worker',
  standalone: true,
  imports: [ModalComponent, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './social-worker.component.html',
  styleUrls: ['./social-worker.component.scss'],
  providers: [RequestFormsService]
})
export class SocialWorkerComponent implements OnInit {
  
  headerTitle: string = '';
  modalVisible: boolean = false;
  controlNumber: string | null = null;
  user: any = null;
  nameWarning: string | null = null;
  recentRequest: RequestForms[] = [];
  today: string = '';

  RequestForms: RequestForms = {
    control_number: 0,
    patients_name: '',
    representative_name: '',
    address: '',
    request_provided: '',
    provider_id: 0,
    account_id: 0,
    contact_number: null,
    amount: null,
  };

  constructor(private RequestServices: RequestFormsService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) this.user = JSON.parse(userData);

    this.today = new Date().toLocaleDateString();
    this.checkRecent();
  }

  checkNameChange(name: string) {
    if (!name || !name.trim()) {
      this.nameWarning = null;
      return;
    }

    const hasRecentDuplicate = this.recentRequest.some(req =>
      req.patients_name?.trim().toLowerCase() === name.trim().toLowerCase()
    );

    this.nameWarning = hasRecentDuplicate
      ? "This patient has already made a request within the last 3 months."
      : null;
  }

  submitRequest() {
    this.RequestForms.account_id = this.user?.account_id;

    this.RequestServices.storeRequest(this.RequestForms).subscribe((formRequest: any) => {
      this.controlNumber = formRequest[1]?.control_number ?? null;

      this.modalVisible = false;

      setTimeout(() => {
        alert("The Data is added");
        this.generatePrintable();
      }, 500);
    });
  }

  checkRecent() {
    this.RequestServices.displayRecent().subscribe((data) => {
      this.recentRequest = data;
    });
  }
  amountToWords(num: number): string {
    if (num === null || num === undefined) return '';

    const a = [
      '', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE',
      'TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN',
      'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'
    ];
    const b = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];

    const inWords = (n: number): string => {
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? ` ${a[n % 10]}` : '');
      if (n < 1000) return a[Math.floor(n / 100)] + ' HUNDRED' + (n % 100 ? ` ${inWords(n % 100)}` : '');
      if (n < 1000000)
        return inWords(Math.floor(n / 1000)) + ' THOUSAND' + (n % 1000 ? ` ${inWords(n % 1000)}` : '');
      if (n < 1000000000)
        return inWords(Math.floor(n / 1000000)) + ' MILLION' + (n % 1000000 ? ` ${inWords(n % 1000000)}` : '');
      return '';
    };

    return inWords(num);
  }

  generatePrintable() {
    const isDOH = this.RequestForms.provider_id === 1;
    const amountInWords = this.amountToWords(Number(this.RequestForms.amount)) + ' PESOS ONLY';
    const provider = this.RequestForms.provider_id;

    if (provider === 1) {
      const html = `
        <html>
          <head>
            <title>DOH Referral Form</title>
            <style>
              @page {
                size: legal landscape;
                margin: 8mm;
              }

              body {
                font-family: Arial, sans-serif;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }

              .doh-container {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                width: 100%;
              }

              .doh-copy {
                width: 49%;
                font-size: 12px;
                line-height: 1.23;
                border: 2px solid black;
                padding-top:20px;
                overflow:hidden;
              }

              .doh-header {
                text-align: center;
                font-weight: bold;
                font-size: 13px;
                margin-bottom: 8px;
              }
              .doh-header-img img{
                width:100%;
              }

              .doh-title {
                text-align: center;
                font-weight: bold;
                font-size: 14px;
                text-decoration: underline;
                margin: 6px 0;
              }

              table {
                width: 100%;
                border-collapse: collapse;
                font-size: 12px;
              }

              td {
                padding: 2px 0;
              }

              .label {
                width: 140px;
                font-weight: bold;
                vertical-align: top;
              }
              .header-placeholder{
                padding-top:10px;
                background: #1800ad;
              }
              .guarantee-slip{
                background: #ff7a00;
                display:flex;
                flex-direction:row;
                justify-content:center;
                align-items:center;
              }
              .field-doh{
                padding:top:20px;
                border-bottom:1px solid black;
                width:90%;
              }
            </style>
          </head>
          <body onload="window.print(); window.close();">
            <div class="doh-container">
              <div class="doh-copy">
                <div class="doh-header-img">
                  <img src="/header.jpg">
                </div>
                <div class="header-placeholder">
                  <div class="guarantee-slip">
                    <div style="width:50%;display:flex;flex-direction:row;align-items:center;">
                      <header style="font-weight:900;color:white;font-size:23px;padding:5px;">
                        GUARANTEE SLIP
                      </header>
                    </div>
                    <div style="width:50%; display:flex;flex-direction:row;background:#004aad;margin:0px; height:50px;align-items:center; overflow:hidden;">
                      <p style="background:#004aad;width:40%;font-weight:bold; font-size:18px;margin:unset !important; padding:5px;color:#fff;">CONTROL NO.</p>
                      <p style="background:#fff; width:60%; font-size:20px; display:flex;flex-direction:row;align-items:center; height:30px;margin:unset !important;">${this.controlNumber}</p>
                    </div>
                  </div>
                </div>
                <div style="width:100%; display:flex;flex-direction:row;background:#004aad;margin:0px;align-items:center; overflow:hidden;margin-top:20px; gap:10px">
                  <span style="width:70%;color:#fff;border-radius:10px;padding-left:10px;">Personal Information</span>
                  <span style="width:30%; background: #fff;padding-left:10px;">Date: ${this.today}</span>
                </div>
                <table style="padding:10px;">
                  <tr>
                    <td class="label" style="padding:10px 5px;">PATIENT’S NAME:</td>
                    <td class="field-doh" style="padding:10px 5px;">${this.RequestForms.patients_name}</td>
                  </tr>

                  <tr>
                    <td class="label" style="padding:10px 5px;">REPRESENTATIVE’S NAME:</td>
                    <td class="field-doh" style="padding:10px 5px;">${this.RequestForms.representative_name}</td>
                  </tr>

                  <tr>
                    <td class="label" style="padding:10px 5px;">ADDRESS:</td>
                    <td class="field-doh" style="padding:10px 5px;">${this.RequestForms.address}</td>
                  </tr>

                  <tr>
                    <td class="label" style="padding:10px 5px;">CONTACT NO.:</td>
                    <td class="field-doh" style="padding:10px 5px;">${this.RequestForms.contact_number}</td>
                  </tr>
                </table>

                <div style="width:100%; background:#004aad; padding:5px; color:#fff; margin-top:10px;">ASSISTANCE PROVIDED:</div>
                <table>
                  <tr><td class="label">ASSISTANCE PROVIDED:</td><td>${this.RequestForms.request_provided}</td></tr>
                  <tr><td class="label">AMOUNT (figures):</td><td>${this.RequestForms.amount}</td></tr>
                  <tr><td class="label">AMOUNT (words):</td><td>${amountInWords}</td></tr>
                  <tr><td class="label">CHARGED TO:</td><td style="font-weight:900;font-size:15px;">DOH 12 - MAIFFIP</td></tr>
                </table>
                <div style="text-align:center; font-weight:bold; margin-top:20px;"> ATTY. FERDINAND L. HERNANDEZ <br> 2ND DISTRICT, CONGRESSMAN </div>
                <div style="margin-top:15px; background: #ff7a00; padding:15px;"> </div>
              </div>

              <div class="doh-copy">
                <div class="doh-header-img">
                  <img src="/header.jpg">
                </div>
                <div class="header-placeholder">
                  <div class="guarantee-slip">
                    <div style="width:50%;display:flex;flex-direction:row;align-items:center;">
                      <header style="font-weight:900;color:white;font-size:23px;padding:5px;">
                        GUARANTEE SLIP
                      </header>
                    </div>
                    <div style="width:50%; display:flex;flex-direction:row;background:#004aad;margin:0px; height:50px;align-items:center; overflow:hidden;">
                      <p style="background:#004aad;width:40%;font-weight:bold; font-size:18px;margin:unset !important; padding:5px;color:#fff;">CONTROL NO.</p>
                      <p style="background:#fff; width:60%; font-size:20px; display:flex;flex-direction:row;align-items:center; height:30px;margin:unset !important;">${this.controlNumber}</p>
                    </div>
                  </div>
                </div>
                <div style="width:100%; display:flex;flex-direction:row;background:#004aad;margin:0px;align-items:center; overflow:hidden;margin-top:20px; gap:10px">
                  <span style="width:70%;color:#fff;border-radius:10px;padding-left:10px;">Personal Information</span>
                  <span style="width:30%; background: #fff;padding-left:10px;">Date: ${this.today}</span>
                </div>
                <table style="padding:10px;">
                  <tr>
                    <td class="label" style="padding:10px 5px;">PATIENT’S NAME:</td>
                    <td class="field-doh" style="padding:10px 5px;">${this.RequestForms.patients_name}</td>
                  </tr>

                  <tr>
                    <td class="label" style="padding:10px 5px;">REPRESENTATIVE’S NAME:</td>
                    <td class="field-doh" style="padding:10px 5px;">${this.RequestForms.representative_name}</td>
                  </tr>

                  <tr>
                    <td class="label" style="padding:10px 5px;">ADDRESS:</td>
                    <td class="field-doh" style="padding:10px 5px;">${this.RequestForms.address}</td>
                  </tr>

                  <tr>
                    <td class="label" style="padding:10px 5px;">CONTACT NO.:</td>
                    <td class="field-doh" style="padding:10px 5px;">${this.RequestForms.contact_number}</td>
                  </tr>
                </table>

                <div style="width:100%; background:#004aad; padding:5px; color:#fff; margin-top:10px;">ASSISTANCE PROVIDED:</div>
                <table>
                  <tr><td class="label">ASSISTANCE PROVIDED:</td><td>${this.RequestForms.request_provided}</td></tr>
                  <tr><td class="label">AMOUNT (figures):</td><td>${this.RequestForms.amount}</td></tr>
                  <tr><td class="label">AMOUNT (words):</td><td>${amountInWords}</td></tr>
                  <tr><td class="label">CHARGED TO:</td><td style="font-weight:900;font-size:15px;">DOH 12 - MAIFFIP</td></tr>
                </table>
                <div style="text-align:center; font-weight:bold; margin-top:20px;"> ATTY. FERDINAND L. HERNANDEZ <br> 2ND DISTRICT, CONGRESSMAN </div>
                <div style="margin-top:15px; background: #ff7a00; padding:15px;"> </div>
              </div>

            </div>
          </body>
        </html>
      `;

      const printWindow = window.open('', '_blank', 'width=1200,height=900');
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(html);
        printWindow.document.close();
      }
      return;
    }
    if (provider === 2) {
      const html = `
        <html>
          <head>
            <title>DSWD Guarantee Slip</title>
            <style>
              @page {
                size: legal portrait;
                margin: 10mm;
              }

              body {
                font-family: Arial, sans-serif;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }

              .container { width: 100%; }

              .header img { width: 100%; }

              .title {
                text-align: center;
                font-size: 30px;
                font-weight: bold;
                margin: 10px 0 20px;
              }

              .control-box {
                border: 2px solid black;
                padding: 10px;
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
              }

              table {
                width: 100%;
                border-collapse: collapse;
              }

              td {
                padding: 8px 5px;
                vertical-align: top;
                font-size: 18px;
              }

              .label {
                width: 35%;
                font-weight: bold;
              }

              .field {
                width: 100%;
                border-bottom: 1px solid black;
              }

              .section-title {
                margin-top: 20px;
                font-size: 20px;
                font-weight: bold;
                border-bottom: 2px solid black;
                padding-bottom: 5px;
              }

              .signature {
                margin-top: 40px;
                text-align: center;
                font-weight: bold;
              }
            </style>
          </head>

          <body onload="window.print(); window.close();">
            <div class="container">

              <div class="header">
                <img src="/header2.jpg">
              </div>
              <div class="control-box">
                CONTROL NO.: ${this.controlNumber}
              </div>


              <div style="display:flex; flex-direction:row; gap:10px; align-items:start;">
                <table style="width:75%;">
                  <tr><td class="label" style="width:40%;">Patient's Name:</td><td class="field">${this.RequestForms.patients_name}</td></tr>
                  <tr><td class="label">Representative's Name:</td><td class="field">${this.RequestForms.representative_name}</td></tr>
                </table>
                <table style="width:25%;">
                  <tr><td>Contact Number:</td></tr>
                  <tr style="border: 1px solid black;"><td>${this.RequestForms.contact_number}</td></tr>
                </table>
              </div>
              <table>
                <tr><td style="width:30% !important;">ADDRESS:</td><td class="field">${this.RequestForms.address}</td></tr>
              </table>

              

              <div class="section-title">THE ASSISTANCE PROVIDED</div>

              <table>
                <tr><td style="width:30% !important;">Purpose:</td><td class="field">${this.RequestForms.request_provided ?? ''}</td></tr>
                <tr><td style="width:30% !important;">Amount (figures):</td><td class="field">${this.RequestForms.amount ?? ''}</td></tr>
                <tr><td style="width:30% !important;">Purpose (Words)</td><td class="field">${amountInWords}</td></tr>
              </table>

              <div class="signature">
                <div style="margin-top:40px; border-top:1px solid black; width:250px; margin:auto;"></div>
                ATTY. FERDINAND L. HERNANDEZ <br>
                2ND DISTRICT, CONGRESSMAN
              </div>

            </div>
          </body>
        </html>
      `;
      const printWindow = window.open('', '_blank', 'width=1200,height=900');
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(html);
        printWindow.document.close();
      }
      return;
    }
  }


  openModalDOH() {
    localStorage.setItem('Assistance', 'DOH');
    this.headerTitle = 'Form Request DOH';
    this.modalVisible = true;
    this.RequestForms.provider_id = 1;
  }

  openModalDSWD() {
    localStorage.setItem('Assistance', 'DSWD');
    this.headerTitle = 'Form Request DSWD';
    this.modalVisible = true;
    this.RequestForms.provider_id = 2;
  }

  closeModal() {
    localStorage.removeItem('Assistance');
    this.modalVisible = false;
  }
}
