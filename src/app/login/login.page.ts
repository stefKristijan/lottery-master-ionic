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
        this.getApiAuth();
        // localStorage.setItem(PASSWORD_KEY, this.loginForm.password);
        //TODO - UNCOMMENT FOR MOBILE
        this.storage.set(PASSWORD_KEY, this.loginForm.password)
      },
      error => {
        this.error = error.error.replace("Customer", "Account");;
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
          this.router.navigate(['verify-user/' + user.email]);
          this.register = false;
        },
        error => {
          if (error.error.message == null)
            this.error = "Invalid data was sent, please use an existing e-mail address for registration";
          else
            this.error = error.error.message;
        }
      );
    }
  }

  /** Get user infos */
  getApiAuth() {
    this._auth.apiAuth().subscribe(data => {
      // localStorage.setItem(USER_KEY, JSON.stringify(data));
      //UNCOMMENT FOR MOBILE
      this.storage.set(USER_KEY, JSON.stringify(data));
      this.storage.get("currentLottery").then(l => {
        this.router.navigate([l + '/generator']);
      })
    });
  }

  back() {
    this.storage.get("currentLottery").then(id =>
      this.router.navigate(['/home/' + id + '/tabs/draws'])
    );
  }
}
