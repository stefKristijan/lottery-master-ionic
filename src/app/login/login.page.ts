import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService, USER_KEY, PASSWORD_KEY } from '../service/authentication.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CustomerService } from '../service/customer.service';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = { email: null, password: null };
  registerForm = { email: null, password: null, repeatPassword: null };
  error: string;
  register = false;

  constructor(
    private _auth: AuthenticationService,
    private customerService: CustomerService,
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
        this.storage.set(PASSWORD_KEY, this.loginForm.password)
      },
      error => {
        console.log(error);
        this.error = error;
      }
    );
  }

  public registerUser() {
    if (this.registerForm.password != this.registerForm.repeatPassword) {
      this.error = "Passwords do not match";
    } else {
      let user = new User();
      user.email = this.registerForm.email;
      user.password = this.registerForm.password;
      this.customerService.registerUser(user).subscribe(
        data => {
          console.log("Account successfully created");
          this.router.navigate(['verify-user/' + user.email]);
          this.register = false;
        },
        error => {
          console.log(error);
          this.error = error;
        }
      );
    }
  }

  /** Get user infos */
  getApiAuth() {
    this._auth.apiAuth().subscribe(data => {
      this.storage.set(USER_KEY, JSON.stringify(data));
      let id = localStorage.getItem("currentLottery");
      this.router.navigate([id + '/generator']);
    });
  }

}
