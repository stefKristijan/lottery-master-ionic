import { Component, OnInit } from '@angular/core';
import { LotteryService } from '../service/lottery.service';
import { StatisticsService } from '../service/statistics.service';
import { ActivatedRoute } from '@angular/router';
import { HomePage } from '../home/home.page';
import { HttpErrorResponse } from '@angular/common/http';
import { MostCommon } from '../model/most-common';
import { MostCommonStatistics } from '../model/most-common-statistics';
import { Lottery } from '../model/lottery';

@Component({
  selector: 'app-most-common',
  templateUrl: './most-common.page.html',
  styleUrls: ['./most-common.page.scss'],
})
export class MostCommonPage implements OnInit {

  lottery = new Lottery();
  maxDraws: number;
  draws = 20;
  currentDraws = 20;
  quantity = 2;
  maxQuantity:number;
  extraQuantity = 2;
  maxExtraQuantity = 2;
  mostCommonStatistics: MostCommonStatistics;


  constructor(
    private lotteryService: LotteryService,
    private statisticsService: StatisticsService,
    private router: ActivatedRoute,
    private home: HomePage
  ) {
  }

  ngOnInit() {
    this.lottery.id = +this.home.router.snapshot.paramMap.get("id");
    this.lotteryService.lotteryById(this.lottery.id).subscribe((l => {
      this.lottery = l;
      this.lottery.name = l.name;
      this.maxQuantity = l.draw > 5 ? 5 : l.draw;
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });

    this.lotteryService.lotteryDraws(this.lottery.id, null).subscribe((draws => {
      this.maxDraws = draws.length;
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });

    this.statisticsService.mostCommonStatistics(this.lottery.id, this.draws, this.quantity, this.extraQuantity).subscribe((mostCommons => {
      this.mostCommonStatistics = mostCommons;
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });
  }


  refreshStats() {
    this.statisticsService.mostCommonStatistics(this.lottery.id, this.draws, this.quantity, this.extraQuantity).subscribe((mostCommons => {
      this.mostCommonStatistics = mostCommons;
      console.log(mostCommons);
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });
    this.currentDraws = this.draws;
  }
}
