import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LotteryService } from '../service/lottery.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  draws = [];
  lotteryName: string;

  constructor(
    private http: HttpClient,
    private lotteryService: LotteryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    localStorage.setItem("currentLottery", this.route.snapshot.paramMap.get('id'));
  }

}
