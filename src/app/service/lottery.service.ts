import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lottery } from '../model/lottery';
import { Draw } from '../model/draw';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LotteryService {

  
  private url: string = environment.remoteUrl + "api/lottery";

  constructor(
    private http: HttpClient
  ) { }

  lotteryById(lotteryId: number): Observable<Lottery> {
    return this.http.get<Lottery>(this.url + "/" + lotteryId);    
  }

  lotteryList(): Observable<Lottery[]> {
    return this.http.get<Lottery[]>(this.url);
  }

  lotteryDraws(lotteryId: number, size: number): Observable<Draw[]> {
    if(size == null || size == 0){
      size = 100000;
    }
    let params = new HttpParams()
      .set("page", "0")
      .set("size", size.toString());
    return this.http.get<Draw[]>(this.url + "/" + lotteryId + "/draws", { params });
  }
}
