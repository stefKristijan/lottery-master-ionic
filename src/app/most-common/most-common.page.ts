import { Component, OnInit } from '@angular/core';
import { LotteryService } from '../service/lottery.service';
import { StatisticsService } from '../service/statistics.service';
import { ActivatedRoute } from '@angular/router';
import { HomePage } from '../home/home.page';
import { HttpErrorResponse } from '@angular/common/http';
import { MostCommon } from '../model/most-common';
import { MostCommonStatistics } from '../model/most-common-statistics';

@Component({
  selector: 'app-most-common',
  templateUrl: './most-common.page.html',
  styleUrls: ['./most-common.page.scss'],
})
export class MostCommonPage implements OnInit {

  lotteryName: string;
  lotteryId: number;
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
    this.lotteryId = +this.home.router.snapshot.paramMap.get("id");
    this.lotteryService.lotteryById(this.lotteryId).subscribe((l => {
      this.lotteryName = l.name;
      this.maxQuantity = l.draw > 10 ? 10 : l.draw;
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });

    this.lotteryService.lotteryDraws(this.lotteryId, null).subscribe((draws => {
      this.maxDraws = draws.length;
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });

    this.statisticsService.mostCommonStatistics(this.lotteryId, this.draws, this.quantity, this.extraQuantity).subscribe((mostCommons => {
      this.mostCommonStatistics = mostCommons;
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });
  }


  refreshStats() {
    this.statisticsService.mostCommonStatistics(this.lotteryId, this.draws, this.quantity, this.extraQuantity).subscribe((mostCommons => {
      this.mostCommonStatistics = mostCommons;
      console.log(mostCommons);
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });
    this.currentDraws = this.draws;
  }
}
