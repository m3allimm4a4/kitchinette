import { afterNextRender, Injectable } from '@angular/core';
import { BehaviorSubject, map, Subscription, timer } from 'rxjs';
import { User } from '../shared/models/user.interface';
import { HttpClient } from '@angular/common/http';
import { AuthReponse } from './models/auth-reponse.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly user$ = new BehaviorSubject<User | null>(null);
  private readonly accessToken$ = new BehaviorSubject<string>('');
  private logOutTimerSubscription = new Subscription();

  constructor(private http: HttpClient) {
    afterNextRender(() => {
      const userString = localStorage.getItem('user');
      const accessToken = localStorage.getItem('accessToken');
      const tokenExpiry = localStorage.getItem('tokenExpiry');
      if (userString && accessToken && tokenExpiry) {
        const user = JSON.parse(userString);
        this.setAuthData(user, accessToken, +tokenExpiry);
      }
    });
  }

  public isUserLoggedIn$() {
    return this.accessToken$.pipe(map(token => !!token));
  }

  public getUser$() {
    return this.user$.asObservable();
  }

  public getUser() {
    return this.user$.value;
  }

  public login(email: string, password: string) {
    return this.http.post<AuthReponse>('/auth/login', { email, password }).pipe(
      map(response => {
        const expiryDate = Date.now() + response.expiresIn;
        this.setAuthData(response.user, response.accessToken, expiryDate);
        return response.user;
      }),
    );
  }

  public logOut() {
    this.user$.next(null);
    this.accessToken$.next('');
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenExpiry');
    this.logOutTimerSubscription.unsubscribe();
  }

  public signUp(user: User) {
    return this.http.post<AuthReponse>('/auth/signup', user).pipe(
      map(response => {
        const expiryDate = Date.now() + response.expiresIn;
        this.setAuthData(response.user, response.accessToken, expiryDate);
        return response.user;
      }),
    );
  }

  private setAuthData(user: User, accessToken: string, expiryDate: number) {
    this.user$.next(user);
    this.accessToken$.next(accessToken);
    this.setLogoutTimer(expiryDate);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('tokenExpiry', expiryDate.toString());
  }

  private setLogoutTimer(expiryDate: number): void {
    const expiresIn = expiryDate - Date.now();
    this.logOutTimerSubscription.unsubscribe();
    this.logOutTimerSubscription = timer(expiresIn).subscribe(() => this.logOut());
  }
}
