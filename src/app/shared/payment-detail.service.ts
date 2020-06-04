import { PaymentDetail } from './payment-detail.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  formData: PaymentDetail = {
    CVV: null,
    CardNumber: null,
    CardOwnerName: null,
    ExpirationDate: null,
    PMID: null
  };

  readonly rootUrl = 'http://localhost:62303/api';
  list: PaymentDetail[];

  constructor(private http: HttpClient) { }

  postPaymentDetail(){
    return this.http.post(this.rootUrl + '/paymentdetails', this.formData);
  }
  putPaymentDetail(){
    return this.http.put(this.rootUrl + '/paymentDetails/' + this.formData.PMID, this.formData);
  }

  deletePaymentDetail(PMID){
    return this.http.delete(this.rootUrl + '/paymentDetails/' + PMID);
  }

  refreshList(){
    this.http.get(this.rootUrl + '/paymentDetails')
    .toPromise()
    .then(res => this.list = res as PaymentDetail[]);
  }


}
