import { PaymentDetailService } from './../../shared/payment-detail.service';
import { Component, OnInit } from '@angular/core';
import { faUserCircle, faCreditCard, faCalendar, faKey, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styles: []
})
export class PaymentDetailComponent implements OnInit {
  faUserCircle = faUserCircle;
  faCreditCard = faCreditCard;
  faCalendar = faCalendar;
  faDatabase = faDatabase;
  faKey = faKey;


  constructor(public service: PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }


  resetForm(form?: NgForm){
    if (form != null) {
      form.resetForm();
    }

    this.service.formData = {
      PMID: 0,
      CardOwnerName: '',
      CardNumber: '',
      ExpirationDate: '',
      CVV: ''
    };
  }

  onSubmit(form: NgForm){
    if (this.service.formData.PMID === 0){
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }


    }

    insertRecord(form: NgForm){
      this.service.postPaymentDetail().
      subscribe(
        res => {
          this.resetForm(form);
          this.toastr.success('Submtted Successfully', 'Payment Detail Register');
          this.service.refreshList();
        },
        err => {
          console.log(err);
        }
      );
    }

    updateRecord(form: NgForm){
      this.service.putPaymentDetail().
      subscribe(
        res => {
          this.resetForm(form);
          this.toastr.info('Update Successfully', 'Payment Detail Register');
          this.service.refreshList();
        },
        err => {
          console.log(err);
        }
      );
    }

}
