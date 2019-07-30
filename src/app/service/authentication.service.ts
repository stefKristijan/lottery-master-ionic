import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { map, tap, filter } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { ThrowStmt } from '@angular/compiler';

export const USER_KEY = 'LM_USER';
export const PASSWORD_KEY = "LM_PASS";
export const EMAIL_VERIFY = "LM_VERIFY_EMAIL";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private url: string = environment.remoteUrl;
  private loggedUser = new BehaviorSubject(this.user);
  private pass: string;

  constructor(
    private storage: Storage,
    private http: HttpClient
  ) {
    storage.get(USER_KEY).then(user => {
      if (user != null) {
        this.loggedUser.next(Object.assign(new User, JSON.parse(user)));
        storage.get(PASSWORD_KEY).then(pass => {
          this.pass = pass;
          this.login({ email: this.loggedUser.value.email, password: pass }).subscribe(
            data => {
            },
            error => {
              console.log("Error: " + JSON.stringify(error))
              this.storage.remove(USER_KEY);
              this.storage.remove(PASSWORD_KEY);
              this.loggedUser.next(null);
            }
          );
        });
      }
    });
  }

  public login(formData): Observable<any> {
    const form = new FormData();
    form.append('email', formData.email);
    form.append('password', formData.password);
    return this.http.post<any>(this.url + 'login', form);
  }

  public apiAuth(): Observable<User> {
    return this.http.get<User>(this.url + 'api/auth').pipe(
      map(data => Object.assign(new User, data)),
      tap(user => this.loggedUser.next(user))
    );
  }

  public logout(): Observable<any> {
    return this.http.get(this.url + 'logout').pipe(
      tap(unused => {
        this.storage.remove(USER_KEY);
        this.storage.remove(PASSWORD_KEY);
        this.loggedUser.next(null);
      })
    );
  }

  get user(): User {
    if (this.loggedUser == null) {
      return null;
    }
    return this.loggedUser.value;
  }

  get password(): string {
    return this.password;
  }

  public isLoggedIn(): boolean {
    return this.loggedUser.value != null;
  }

  public refreshAuthUser() {
    this.apiAuth().subscribe(data => {
      this.storage.set(USER_KEY, JSON.stringify(data));
    });
  }


}
