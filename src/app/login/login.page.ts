import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService, USER_KEY } from '../service/authentication.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = {};
  error : string;

  constructor(
    private _auth: AuthenticationService,
    private _location: Location,
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
  }

  public authUser() {
    this._auth.login(this.loginForm).subscribe(
      data => {
        console.log(data);
        this.getApiAuth();
      },
      error => {
        console.log(error);
            this.error = error;
      }
    );
  }

  /** Get user infos */
  getApiAuth() {
    this._auth.apiAuth().subscribe(data => {
      this.storage.set(USER_KEY, JSON.stringify(data));

      this._location.back();
    });
  }

}
