import { Component, OnInit } from '@angular/core';
import { NumberStatistics } from '../model/number-statistics';
import { LotteryService } from '../service/lottery.service';
import { ActivatedRoute } from '@angular/router';
import { StatisticsService } from '../service/statistics.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NumberStat } from '../model/number-stat';
import { timeout } from 'q';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-number-statistics',
  templateUrl: './number-statistics.page.html',
  styleUrls: ['./number-statistics.page.scss'],
})
export class NumberStatisticsPage implements OnInit {

  lotteryName: string;
  lotteryId : number;
  maxDraws: number;
  numberStats: NumberStatistics;
  draws=20;


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
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });

    this.statisticsService.numberStatistics(this.lotteryId, this.draws).subscribe((stat => {
      this.numberStats = stat;
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });

    this.lotteryService.lotteryDraws(this.lotteryId).subscribe((draws => {
      this.maxDraws = draws.length;
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });
  }


  refreshStats(){
    this.statisticsService.numberStatistics(this.lotteryId, this.draws).subscribe((stat => {
      this.numberStats = stat;
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

}
