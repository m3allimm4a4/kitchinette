import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../shared/models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject<User | null>(null);

  public getUser$(): Observable<User | null> {
    return this.user$.asObservable();
  }

  public getUser(): User | null {
    return this.user$.value;
  }
}
