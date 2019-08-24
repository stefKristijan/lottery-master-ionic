import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LotteryService } from '../service/lottery.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { StatisticsService } from '../service/statistics.service';
import { NumberCoefficient } from '../model/number-coefficient';
import { AuthenticationService } from '../service/authentication.service';
import { CoefficientStatistics } from '../model/coefficient-statistics';
import { Generator } from '../model/generator';

export enum GeneratorType {
  DRAW,
  DRAW_STATS,
  FULL
}

export enum GeneratorSort {
  SUM,
  DRAWS,
  MC,
  RANGE
}

@Component({
  selector: 'app-generator',
  templateUrl: './generator.page.html',
  styleUrls: ['./generator.page.scss'],
})
export class GeneratorPage implements OnInit {

  generator = new Generator();
  types = GeneratorType;
  sorts = GeneratorSort;
  user = this._auth.user;
  lotteryId: number;
  lotteryName: string;
  coefficients: CoefficientStatistics;
  knobs: {
    lower: 11;
    upper: 90
  };

  constructor(
    private _auth: AuthenticationService,
    private http: HttpClient,
    private lotteryService: LotteryService,
    private statisticsService: StatisticsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.lotteryId = +this.route.snapshot.paramMap.get("id");
    this.lotteryService.lotteryById(this.lotteryId).subscribe((l => {
      this.lotteryName = l.name;
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });

  }

  generateNumbers() {
    this.generator.maxDraws = this.knobs.upper;
    this.generator.draws = this.knobs.lower;
    this.statisticsService.generateNumbers(this.lotteryId, this.generator).subscribe((nc => {
      this.coefficients = nc;
      this._auth.refreshAuthUser();
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

  logout(): void {
    this._auth.logout().subscribe(data => {
      this.router.navigate(['login']);
    });
  }
}
