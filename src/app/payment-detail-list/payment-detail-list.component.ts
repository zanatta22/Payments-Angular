import { PaymentDetailService } from './../shared/payment-detail.service';
import { Component, OnInit } from '@angular/core';
import { PaymentDetail } from '../shared/payment-detail.model';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styles: []
})
export class PaymentDetailListComponent implements OnInit {
  faTrashAlt = faTrashAlt;

  constructor(public service: PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  popularForm(pd: PaymentDetail){
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(PMID){
    if (confirm('are you sure to delete this record ?')){
    this.service.deletePaymentDetail(PMID)
    .subscribe(res => {
      this.service.refreshList();
      this.toastr.warning('Delete Successfully', 'Payment Detail Register');
    },
        err => {
          console.log(err);
        }
      );
    }
  }

}
