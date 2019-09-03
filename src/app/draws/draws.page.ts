import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LotteryService } from '../service/lottery.service';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { HomePage } from '../home/home.page';
import { Draw } from '../model/draw';
import { getLocaleId, getLocaleDateTimeFormat } from '@angular/common';

@Component({
  selector: 'app-draws',
  templateUrl: './draws.page.html',
  styleUrls: ['./draws.page.scss'],
})
export class DrawsPage implements OnInit {

  draws = [];
  maxDraws : number;
  lotteryName: string;
  lotteryId: number;
  currentDraws=50;


  constructor(
    private http: HttpClient,
    private lotteryService: LotteryService,
    private route: ActivatedRoute,
    private home: HomePage
  ) {
  }


  ngOnInit() {
    this.lotteryId = +this.home.router.snapshot.paramMap.get("id");
    this.lotteryService.lotteryById(this.lotteryId).subscribe((l => {
      this.lotteryName = l.name;
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });
    this.lotteryService.lotteryDraws(this.lotteryId, null).subscribe((draws => {
      this.maxDraws = draws.length;
      this.draws = draws.slice(0, 50);
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

  refresh(){
    this.lotteryService.lotteryDraws(this.lotteryId, this.currentDraws).subscribe((draws => {
      this.draws = draws;
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

}
