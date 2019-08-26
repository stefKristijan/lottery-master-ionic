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
  lotteryName: string;
  lotteryId: number;


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
    this.lotteryService.lotteryDraws(this.lotteryId, 50).subscribe((draws => {
      this.draws = draws
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

}
