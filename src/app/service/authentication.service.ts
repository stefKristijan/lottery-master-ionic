import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { map, tap, filter } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

export const USER_KEY = 'LM_USER';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url: string = environment.remoteUrl;
  private loggedUser = new BehaviorSubject(this.user);

  constructor(
    private storage: Storage,
    private http: HttpClient
  ) {
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
        this.loggedUser.next(new User);
      })
    );
  }

  get user(): User {
    if(this.loggedUser == null){
      return null;
    }
    return this.loggedUser.value;
  }

  public isLoggedIn(): boolean {
    console.log(this.loggedUser);
    return this.loggedUser.value != null;

  }

}
