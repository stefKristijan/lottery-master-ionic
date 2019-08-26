import { Component, OnInit } from '@angular/core';
import { LotteryService } from '../service/lottery.service';
import { StatisticsService } from '../service/statistics.service';
import { ActivatedRoute } from '@angular/router';
import { NumberStatistics } from 'src/app/model/number-statistics';
import { HttpErrorResponse } from '@angular/common/http';
import { RangeStatistics } from '../model/range-statistics';
import { HomePage } from '../home/home.page';
import { Lottery } from '../model/lottery';

@Component({
  selector: 'app-range-statistics',
  templateUrl: './range-statistics.page.html',
  styleUrls: ['./range-statistics.page.scss'],
})
export class RangeStatisticsPage implements OnInit {

  lottery = new Lottery();
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
    this.lottery.id = +this.home.router.snapshot.paramMap.get("id");
    this.lotteryService.lotteryById(this.lottery.id).subscribe((l => {
      this.lottery = l;
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });

    this.statisticsService.numberStatistics(this.lottery.id, this.draws).subscribe((stat => {
      this.numberStats = stat;
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

      this.statisticsService.rangeStatistics(this.lottery.id, this.draws, this.range, this.extraRange).subscribe((rangeStat =>{
        this.rangeStats = rangeStat;
      }),
        (error: HttpErrorResponse) => {
          console.log(error);
        });
    }


  refreshStats(){
    this.statisticsService.numberStatistics(this.lottery.id, this.draws).subscribe((stat => {
      this.numberStats = stat;
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });
      this.currentDraws = this.draws;
      this.statisticsService.rangeStatistics(this.lottery.id, this.draws, this.range, this.extraRange).subscribe((rangeStat =>{
        this.rangeStats = rangeStat;
      }),
        (error: HttpErrorResponse) => {
          console.log(error);
        });
  }
}
