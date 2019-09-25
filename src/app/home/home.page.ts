import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LotteryService } from '../service/lottery.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  draws = [];
  lotteryName: string;
  router:ActivatedRoute;

  constructor(
    private http: HttpClient,
    private lotteryService: LotteryService,
    private route: ActivatedRoute,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.router = this.route;
    this.storage.set("currentLottery", this.route.snapshot.paramMap.get('id'));
  }

}
