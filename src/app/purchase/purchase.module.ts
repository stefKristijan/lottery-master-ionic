import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PurchasePage } from './purchase.page';
import { Stripe } from '@ionic-native/stripe/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';

const routes: Routes = [
  {
    path: '',
    component: PurchasePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers:[
    Stripe,
    SQLite,
    SQLitePorter
  ],
  declarations: [PurchasePage]
})
export class PurchasePageModule {}