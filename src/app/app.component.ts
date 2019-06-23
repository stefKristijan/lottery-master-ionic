import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LotteryService } from './service/lottery.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  lotteries = [];
  q: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private lotteryService: LotteryService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.lotteryService.lotteryList().subscribe((lotteries => this.lotteries = lotteries),
        (error: HttpErrorResponse) => {
          console.log(error);
        });
    });
  }

  onInput(e){
    e.preventDefault();
    this.lotteryService.lotteryList().subscribe((lotteries => 
      this.lotteries = lotteries.filter(l => l.name.toLowerCase().includes(e.target.value.toLowerCase()))),
    (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  onCancel(e){
    e.preventDefault();
    
  }
}
