import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LotteryService } from '../service/lottery.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { StatisticsService } from '../service/statistics.service';
import { NumberCoefficient } from '../model/number-coefficient';
import { AuthenticationService } from '../service/authentication.service';
import { CoefficientStatistics } from '../model/coefficient-statistics';
import { Generator } from '../model/generator';
import { Lottery } from '../model/lottery';

export enum GeneratorType {
  DRAW = "Draw",
  DRAW_STATS = "Draw + statistics",
  FULL = "Full"
}

export enum GeneratorSort {
  SUM = "Sum",
  DRAWS = "Drawn",
  MC = "Most common",
  RANGE = "Range"
}

@Component({
  selector: 'app-generator',
  templateUrl: './generator.page.html',
  styleUrls: ['./generator.page.scss'],
})
export class GeneratorPage implements OnInit {

  generator : Generator;
  types = GeneratorType;
  sorts = GeneratorSort;
  user = this._auth.user;
  lottery = new Lottery();
  draws : any;
  coefficients: CoefficientStatistics;
  knobs: {
    lower: 11,
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
    this.lottery.id = +this.route.snapshot.paramMap.get("id");
    this.lotteryService.lotteryById(this.lottery.id).subscribe((l => {
      this.lottery = l;
      this.lotteryService.lotteryDraws(l.id, null).subscribe(d =>{
        this.draws = d;
        this.generator = new Generator(this.draws.length);
      }),
      (error : HttpErrorResponse) =>{
        console.log(error);
      }
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });

  }

  generateNumbers() {
    this.generator.maxDraws = this.knobs.upper;
    this.generator.draws = this.knobs.lower;
    this.generator.lastDrawDivider = this.generator.lastDrawDivider * 1.0;
    this.statisticsService.generateNumbers(this.lottery.id, this.generator).subscribe((nc => {
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
