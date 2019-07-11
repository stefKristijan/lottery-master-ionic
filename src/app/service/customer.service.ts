import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from '../../environments/environment';
import { AppModule } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient
  ) { }

  chargeCustomer(token: string): Observable<User> {
    console.log("Token: " + token);
    let params = new HttpParams()
    params = params.set("token", token)
      .set("amount", "2");
    return this.http.post<User>(environment.remoteUrl + '/customer/charge', {},  {params});
  }


}
