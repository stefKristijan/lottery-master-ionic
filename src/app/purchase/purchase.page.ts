import { Component, OnInit, Injectable } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { environment } from '../../environments/environment';
import { Stripe } from '@ionic-native/stripe/ngx';
import { TestObject } from 'protractor/built/driverProviders';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { USER_KEY } from '../service/authentication.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.page.html',
  styleUrls: ['./purchase.page.scss'],
})
export class PurchasePage implements OnInit {

  card: any={
    number: '',
    expMonth: '',
    expYear: '',
    cvc : ''
  }

  constructor(
    private stripe: Stripe,
    private customerService : CustomerService,
    private router : Router,
    private storage : Storage
  ) { }

  ngOnInit() {
    this.stripe.setPublishableKey(environment.public_key);
  }

  pay(){
    this.stripe.createCardToken(this.card).then((token) => {
      this.customerService.chargeCustomer(token.id).subscribe((user => {
        this.storage.set(USER_KEY, JSON.stringify(user));
        this.router.navigate(['generator'])
      }),
        (error: HttpErrorResponse) => {
          console.log(error);
        });
    })
    .catch(error => console.log(error));
  }

}
