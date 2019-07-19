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
  
  private url: string = environment.remoteUrl + "api/";

  constructor(
    private http: HttpClient
  ) { }

  chargeCustomer(token: string): Observable<User> {
    console.log("Token: " + token);
    let params = new HttpParams()
    params = params.set("token", token)
      .set("sku", "sku_FPwZsulv5f7wf5");
    return this.http.post<User>(this.url + 'checkout', {},  {params});
  }


}
