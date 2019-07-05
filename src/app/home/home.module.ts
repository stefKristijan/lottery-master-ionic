import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'draws',
        loadChildren: '../draws/draws.module#DrawsPageModule'
      },
      {
        path: 'number-statistics',
        loadChildren: '../number-statistics/number-statistics.module#NumberStatisticsPageModule'
      },
      {
        path: 'range-statistics',
        loadChildren: '../range-statistics/range-statistics.module#RangeStatisticsPageModule'
      },
      {
        path: 'most-common',
        loadChildren: '../most-common/most-common.module#MostCommonPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/draws',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
