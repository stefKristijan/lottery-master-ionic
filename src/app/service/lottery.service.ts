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

  constructor(
    private http: HttpClient
  ) { }

  lotteryById(lotteryId: number): Observable<Lottery> {
    return this.http.get<Lottery>(environment.lotteryUrl + "/" + lotteryId);    
  }

  lotteryList(): Observable<Lottery[]> {
    return this.http.get<Lottery[]>(environment.lotteryUrl);
  }

  lotteryDraws(lotteryId: number): Observable<Draw[]> {
    let params = new HttpParams()
      .set("page", "0")
      .set("size", "200");
    return this.http.get<Draw[]>(environment.lotteryUrl + "/" + lotteryId + "/draws", { params });
  }
}
