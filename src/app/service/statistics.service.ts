import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NumberStatistics } from '../model/number-statistics';
import { RangeStatistics } from '../model/range-statistics';
import { MostCommon } from '../model/most-common';
import { MostCommonStatistics } from '../model/most-common-statistics';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
//  lotteryUrl = 'http://192.168.0.15:8080/api/lottery';
 lotteryUrl = 'http://18.194.88.128:9090/api/lottery';

  constructor(private http: HttpClient) { }

  numberStatistics(lotteryId: number, draws:number): Observable<NumberStatistics> {
    let params = new HttpParams();
    if (draws != null && draws > 1) {
       params = params
        .set("draws", draws.toString());
    }
    return this.http.get<NumberStatistics>(this.lotteryUrl + "/" + lotteryId + "/number-stats", { params });
  }

  rangeStatistics(lotteryId: number, draws:number, range:number, extraRange:number): Observable<RangeStatistics> {
    let params = new HttpParams();
    if (draws != null && draws > 1) {
       params = params
        .set("draws", draws.toString());
    }
    if(range == null || range <= 1){
      range = 10;
    }
    params = params.set("range", range.toString());
    if(extraRange == null || extraRange <= 1){
      extraRange = 2;
    }
    params = params.set("extraRange", extraRange.toString());
    return this.http.get<RangeStatistics>(this.lotteryUrl + "/" + lotteryId + "/range-stats", { params });
  }

  mostCommonStatistics(lotteryId: number, draws:number, quantity:number, extraQuantity:number): Observable<MostCommonStatistics> {
    let params = new HttpParams();
    if (draws != null && draws > 1) {
       params = params
        .set("draws", draws.toString());
    }
    if(quantity == null || quantity <= 1){
      quantity = 2;
    }
    params = params.set("quantity", quantity.toString());
    if(extraQuantity == null || extraQuantity <= 1){
      extraQuantity = 2;
    }
    params = params.set("extraQuantity", extraQuantity.toString());
    return this.http.get<MostCommonStatistics>(this.lotteryUrl + "/" + lotteryId + "/most-common", { params });
  }
}
