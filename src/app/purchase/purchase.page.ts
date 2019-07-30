import { Component, OnInit, Injectable } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { environment } from '../../environments/environment';
import { TestObject } from 'protractor/built/driverProviders';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { USER_KEY, AuthenticationService } from '../service/authentication.service';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { Route } from '@angular/compiler/src/core';

declare var Stripe: any;

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.page.html',
  styleUrls: ['./purchase.page.scss'],
})
export class PurchasePage implements OnInit {

  elements: any;
  stripe: any;
  card: any;
  name: string;

  constructor(
    private customerService: CustomerService,
    private _auth: AuthenticationService,
    private router : Router
  ) { }

  ngOnInit() {
    this.stripe = Stripe(environment.public_key);
    this.elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    // Create an instance of the card Element.
    this.card = this.elements.create('card', { style: style });
    this.card.mount("#card-element");
  }

  pay() {
    // Handle real-time validation errors from the card Element.
    // card.addEventListener('change', function (event) {
    //   var displayError = document.getElementById('card-errors');
    //   if (event.error) {
    //     displayError.textContent = event.error.message;
    //   } else {
    //     displayError.textContent = '';
    //   }
    // });

    // Handle form submission.
    this.stripe.createPaymentMethod('card', this.card, {
      billing_details: { name: this.name, email: this._auth.user.email }
      // customer: this._auth.user.id
    }).then(result =>{
      if (result.error) {
        console.log(result.error);
        // Show error in payment form
      } else {
        this.customerService.savePaymentMethod(result.paymentMethod.id).subscribe((result => {
          this.handleServerResponse(result);
        }),
        (error: HttpErrorResponse) => {
          console.log(error);
        });
      }
    });

  }

  handleServerResponse(response) {
    console.log(response);
    if (response.error) {
      // Show error from server on payment form
    } else if (response.requires_action) {
      // Use Stripe.js to handle required card action
      this.stripe.handleCardAction(
        response.payment_intent_client_secret
      ).then(result => {
        if (result.error) {
          // Show error in payment form
        } else {
          this.customerService.confirmCard(result.paymentIntent.id, response.tickets).subscribe((result => {
            console.log("Success");
          }),
          (error: HttpErrorResponse) => {
            console.log(error);
          });
        }
      });
    } else {
      this._auth.refreshAuthUser();
      let id = localStorage.getItem("currentLottery");
      this.router.navigate([id + '/generator']);
    }
  }
}

