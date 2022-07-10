import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private _http: HttpClient) {}

    getPayments(): Observable<any> {

      return this._http.get(environment.endpoints.payments).pipe(first());
    }

    paymentDelete(paymentId: number){

      return this._http.delete(`${environment.endpoints.payments}/${paymentId}`).pipe(first());
    }

    insertPayment(payment){

      return this._http.post(`${environment.endpoints.payments}`, payment).pipe(first());
    }

    updatePayment(payment){

      return this._http.put(`${environment.endpoints.payments}/${payment.id}`, payment).pipe(first());
    }

    updatePaymentPaid(paymentId: number, paid: boolean){

      return this._http.patch(`${environment.endpoints.payments}/${paymentId}`, { paid: paid }).pipe(first());
    }

}
