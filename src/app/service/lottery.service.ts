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

  lotteryDraws(lotteryId: number): Observable<Draw[]> {
    let params = new HttpParams()
      .set("page", "0")
      .set("size", "200");
    return this.http.get<Draw[]>(this.url + "/" + lotteryId + "/draws", { params });
  }
}
