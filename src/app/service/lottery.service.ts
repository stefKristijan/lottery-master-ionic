import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lottery } from '../model/lottery';
import { Draw } from '../model/draw';

@Injectable({
  providedIn: 'root'
})
export class LotteryService {


  private lotteryUrl = 'http://192.168.0.15:8080/api/lottery';

  constructor(
    private http: HttpClient
  ) { }

  lotteryById(lotteryId: number): Observable<Lottery> {
    return this.http.get<Lottery>(this.lotteryUrl + "/" + lotteryId);    
  }

  lotteryList(): Observable<Lottery[]> {
    return this.http.get<Lottery[]>(this.lotteryUrl);
  }

  lotteryDraws(lotteryId: number): Observable<Draw[]> {
    let params = new HttpParams()
      .set("page", "0")
      .set("size", "999999999");
    return this.http.get<Draw[]>(this.lotteryUrl + "/" + lotteryId + "/draws", { params });
  }
}
