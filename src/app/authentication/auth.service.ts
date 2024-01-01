import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from './auth-response.model';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

 

  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    return this.http
      .post<AuthResponse>(environment.signUp_url + environment.api_key, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((response) => {
          this.handleUser(
            response.email,
            response.localId,
            response.idToken,
            response.expiresIn
          );
        }),
        catchError(this.handleError)
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(environment.signIn_url + environment.api_key, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((response) => {
          this.handleUser(
            response.email,
            response.localId,
            response.idToken,
            response.expiresIn
          );
        }),
        catchError(this.handleError)
      );
  }
  logout() {
    this.user.next(null);
    localStorage.removeItem('user');
  }
  autoLogin() {
    if (localStorage.getItem('user') == null) return;

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpirationDate)
    );
    if (loadedUser.token) this.user.next(loadedUser);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err);
    let message = 'Error Happened : ';
    if (err.error.error) {
      switch (err.error.error.message) {
        case 'EMAIL_EXISTS':
          message += 'Already using this an email !';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          message += 'Tried too many attemps, try later !';
          break;
        case 'INVALID_LOGIN_CREDENTIALS':
          message += 'Email or Password is Invalid !';
          break;
      }
    }
    return throwError(() => message);
  }
  private handleUser(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: string
  ) {
    const expriationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expriationDate);
    this.user.next(user);

    localStorage.setItem('user', JSON.stringify(user));
  }
}
