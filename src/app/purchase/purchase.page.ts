import { Component, OnInit, Injectable } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { environment } from '../../environments/environment';
import { TestObject } from 'protractor/built/driverProviders';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { USER_KEY, AuthenticationService } from '../service/authentication.service';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';

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
    private _location: Location,
    private storage: Storage,
    private _auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.stripe = Stripe('pk_test_dsYZN1QfgxmZ0CA6M3kgEJ0n00VpCLH7Ny');
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
          // The card action has been handled
          // The PaymentIntent can be confirmed again on the server
          fetch('/ajax/confirm_payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ payment_intent_id: result.paymentIntent.id })
          }).then(confirmResult => {
            return confirmResult.json();
          }).then(this.handleServerResponse);
        }
      });
    } else {
      // Show success message
    }
  }
}


  // stripe.redirectToCheckout({
  //   items: [{ sku: 'sku_FV3vwZay3ctfM2', quantity: 1 }],

  //   // Do not rely on the redirect to the successUrl for fulfilling
  //   // purchases, customers may not always reach the success_url after
  //   // a successful payment.
  //   // Instead use one of the strategies described in
  //   // https://stripe.com/docs/payments/checkout/fulfillment
  //   successUrl: 'http://lottery-master.com',
  //   cancelUrl: 'http://lottery-master.com',
  //   customerEmail: this._auth.user.email
  // })
  //   .then(function (result) {
  //     if (result.success) {
  //       console.log("Success");
  //     }
  //     else if (result.error) {
  //       // If `redirectToCheckout` fails due to a browser or network
  //       // error, display the localized error message to your customer.
  //       var displayError = document.getElementById('error-message');
  //       displayError.textContent = result.error.message;
  //     }
  //   });
// Submit the form with the token ID.
// stripeTokenHandler(token) {
//   // Insert the token ID into the form so it gets submitted to the server
//   var form = document.getElementById('payment-form');
//   var hiddenInput = document.createElement('input');
//   hiddenInput.setAttribute('type', 'hidden');
//   hiddenInput.setAttribute('name', 'stripeToken');
//   hiddenInput.setAttribute('value', token.id);
//   form.appendChild(hiddenInput);

//   // Submit the form
//   console.log(form);
// }

  //   this.stripe.createCardToken(this.card).then((token) => {
  //     this.customerService.chargeCustomer(token.id).subscribe((user => {
  //       this.storage.remove(USER_KEY);
  //       this.storage.set(USER_KEY, JSON.stringify(user));
  //       this._location.back();
  //     }),
  //       (error: HttpErrorResponse) => {
  //         console.log(error);
  //       });
  //   })
  //   .catch(error => console.log(error));
  // }

