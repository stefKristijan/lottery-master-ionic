import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from '../../environments/environment';
import { AppModule } from '../app.module';
import { TicketOrder } from '../model/ticket-order';
import { TicketItem } from '../model/ticket-item';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url: string = environment.remoteUrl + "api/";

  constructor(
    private http: HttpClient
  ) { }

  chargeCustomer(token: string): Observable<User> {
    console.log("Token: " + token);
    let params = new HttpParams()
    params = params.set("token", token)
      .set("sku", "sku_FUluuybTDuxAeT");
    return this.http.post<User>(this.url + 'generator/buy-tickets', {}, { params });
  }

  savePaymentMethod(paymentMethodId: string, ticket: string): Observable<any> {
    let ticketOrder = new TicketOrder();
    ticketOrder.paymentMethodId = paymentMethodId;
    ticketOrder.ticketItem = ticket;
    console.log(ticketOrder);
    return this.http.post<any>(this.url + 'payment/order-tickets', ticketOrder);
  }

  confirmCard(id: any, tickets: number) {
    const form = new FormData();
    form.append('paymentIntentId', id);
    form.append('tickets', tickets.toString())
    return this.http.post<any>(this.url + 'payment/confirm', form);
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + "customer", user);
  }

  verifyUser(email: string, code: string): Observable<any> {
    let params = new HttpParams()
      .set("email", email)
      .set("verificationCode", code);
    return this.http.get<any>(this.url + "customer/verify", { params });
  }

  resendCode(email: string) {
    let params = new HttpParams()
      .set("email", email)
    return this.http.get<any>(this.url + "customer/resend-verification-code", { params });
  }
}
