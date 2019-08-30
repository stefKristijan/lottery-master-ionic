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
  DRAW = "Generate NUMBERS for next draw",
  DRAW_STATS = "Generate NUMBERS for next draw with STATISTICS",
  FULL = "Generate STATISTICS for ALL NUMBERS"
}

export enum GeneratorSort {
  SUM = "Sort numbers by summary of all coefficients",
  DRAWS = "Sort numbers by drawing coefficient",
  MC = "Sort numbers by most common coefficient",
  RANGE = "Sort numbers by range interval coefficient"
}

@Component({
  selector: 'app-generator',
  templateUrl: './generator.page.html',
  styleUrls: ['./generator.page.scss'],
})
export class GeneratorPage implements OnInit {

  generator: Generator;
  types = GeneratorType;
  sorts = GeneratorSort;
  user = this._auth.user;
  lottery = new Lottery();
  draws: any;
  coefficients: CoefficientStatistics;
  knobsValues: any;
  cost = 1;

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
      this.lotteryService.lotteryDraws(l.id, null).subscribe(d => {
        this.draws = d;
        this.generator = new Generator(this.draws.length);
        let knobs = { lower: 10, upper: this.draws.length };
        this.knobsValues = knobs;
      }),
        (error: HttpErrorResponse) => {
          console.log(error);
        }
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

  generateNumbers() {
    this.generator.maxDraws = this.knobsValues.upper;
    this.generator.draws = this.knobsValues.lower;
    this.generator.lastDrawDivider = this.generator.lastDrawDivider;
    var btn = document.getElementById("generate-btn");
    console.log(btn[0]);
    console.log(btn[1]);
    this.statisticsService.generateNumbers(this.lottery.id, this.generator).subscribe((nc => {
      this.coefficients = nc;
      this._auth.apiAuth().subscribe(u =>{
        this.user = this._auth.user;
      });
    }),
      (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

  setRandomCoefficients() {
    let knobs = {
      upper: Math.floor((Math.random() * this.draws.length) + this.draws.length / 2),
      lower: Math.floor((Math.random() * this.draws.length / 3) + 10)
    };
    this.knobsValues = knobs;
    this.generator.lastDrawDivider = Math.floor((Math.random() * 10) + 1);
    this.generator.drawnMultiplier = Math.floor((Math.random() * 100) + 10);
    this.generator.mcMultiplier = Math.floor((Math.random() * 100) + 10);
    this.generator.rangeMultiplier = Math.floor((Math.random() * 100) + 10);
    this.generator.sort = Object.keys(GeneratorSort)[Math.floor((Math.random() * 3))];
  }

  onTypeChange() {
    switch (this.generator.type) {
      case "DRAW":
        this.cost = 1;
        break;
      case "DRAW_STATS":
        this.cost = 2;
        break;
      default:
        this.cost = 4;

    }
  }

  logout(): void {
    this._auth.logout().subscribe(data => {
      this.router.navigate(['login']);
    });
  }

  back() {
    let id = localStorage.getItem("currentLottery");
    this.router.navigate(['/home/' + id + '/tabs/draws']);
  }
}
