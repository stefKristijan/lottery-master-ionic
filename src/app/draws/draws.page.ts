import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LotteryService } from '../service/lottery.service';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-draws',
  templateUrl: './draws.page.html',
  styleUrls: ['./draws.page.scss'],
})
export class DrawsPage implements OnInit {

  draws = [];
  lotteryName: string;
  

  constructor(
    private http: HttpClient,
    private lotteryService: LotteryService,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    let lotteryId = +localStorage.getItem("currentLottery");
    this.lotteryService.lotteryById(lotteryId).subscribe((l => {
      this.lotteryName = l.name;
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });
    this.lotteryService.lotteryDraws(lotteryId).subscribe((draws => {
      this.draws = draws
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

}
