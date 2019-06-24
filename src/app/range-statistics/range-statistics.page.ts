import { Component, OnInit } from '@angular/core';
import { LotteryService } from '../service/lottery.service';
import { StatisticsService } from '../service/statistics.service';
import { ActivatedRoute } from '@angular/router';
import { NumberStatistics } from 'src/app/model/number-statistics';
import { HttpErrorResponse } from '@angular/common/http';
import { RangeStatistics } from '../model/range-statistics';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-range-statistics',
  templateUrl: './range-statistics.page.html',
  styleUrls: ['./range-statistics.page.scss'],
})
export class RangeStatisticsPage implements OnInit {

  lotteryName: string;
  lotteryId : number;
  maxDraws: number;
  rangeStats: RangeStatistics;
  numberStats: NumberStatistics;
  draws=20;
  currentDraws = 20;
  range=5;
  extraRange=2;


  constructor(
    private lotteryService: LotteryService,
    private statisticsService: StatisticsService,
    private router: ActivatedRoute,
    private home:HomePage
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

      this.statisticsService.rangeStatistics(this.lotteryId, this.draws, this.range, this.extraRange).subscribe((rangeStat =>{
        this.rangeStats = rangeStat;
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
      this.currentDraws = this.draws;
      this.statisticsService.rangeStatistics(this.lotteryId, this.draws, this.range, this.extraRange).subscribe((rangeStat =>{
        this.rangeStats = rangeStat;
        console.log(this.rangeStats);
      }),
        (error: HttpErrorResponse) => {
          console.log(error);
        });
  }
}
