import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LotteryService } from '../service/lottery.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { StatisticsService } from '../service/statistics.service';
import { NumberCoefficient } from '../model/number-coefficient';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.page.html',
  styleUrls: ['./generator.page.scss'],
})
export class GeneratorPage implements OnInit {

  lotteryId: number;
  lotteryName: string;
  numberCoefficients = [];
  maxNc: number;
  minNc: number;
  maxMcNc: number;
  minMcNc: number;
  maxRcNc: number;
  minRcNc: number;
  maxDNc: number;
  minDNc: number;

  constructor(
    private http: HttpClient,
    private lotteryService: LotteryService,
    private statisticsService: StatisticsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.lotteryId = +this.route.snapshot.paramMap.get("id");
    this.lotteryService.lotteryById(this.lotteryId).subscribe((l => {
      this.lotteryName = l.name;
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });
    this.statisticsService.generateNumbers(this.lotteryId).subscribe((nc => {
      this.findMinAndMaxCoefficients(nc);
      this.numberCoefficients = nc;
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });
  }


  private findMinAndMaxCoefficients(nc: NumberCoefficient[]) {
    this.maxDNc = nc[0].drawnCoefficient;
    this.minDNc = nc[0].drawnCoefficient;
    this.maxMcNc = nc[0].mcCoefficient;
    this.minMcNc = nc[0].mcCoefficient;
    this.maxRcNc = nc[0].rangeCoefficient;
    this.minRcNc = nc[0].rangeCoefficient;
    this.maxNc = nc[0].coefficientSum;
    this.minNc = nc[0].coefficientSum;
    nc.forEach(c => {
      if (c.coefficientSum > this.maxNc)
        this.maxNc = c.coefficientSum;
      if (c.coefficientSum < this.minNc)
        this.minNc = c.coefficientSum;

      if (c.rangeCoefficient > this.maxRcNc)
        this.maxRcNc = c.rangeCoefficient;
      if (c.rangeCoefficient < this.minRcNc)
        this.minRcNc = c.rangeCoefficient;

      if (c.mcCoefficient > this.maxMcNc)
        this.maxMcNc = c.mcCoefficient;
      if (c.mcCoefficient < this.minMcNc)
        this.minMcNc = c.mcCoefficient;

      if (c.drawnCoefficient > this.maxDNc)
        this.maxDNc = c.drawnCoefficient;
      if (c.drawnCoefficient < this.minDNc)
        this.minDNc = c.drawnCoefficient;
    });
  }
}
