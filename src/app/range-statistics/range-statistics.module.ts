import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RangeStatisticsPage } from './range-statistics.page';

const routes: Routes = [
  {
    path: '',
    component: RangeStatisticsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RangeStatisticsPage]
})
export class RangeStatisticsPageModule {}
