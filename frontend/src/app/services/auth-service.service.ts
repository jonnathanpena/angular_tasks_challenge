import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthResponse } from '../interfaces/auth-response';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { RoutesEnum } from '../interfaces/routes-enum';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private localStorageTokenKey = "token";

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    const token = localStorage.getItem('token');
    this.isAuthenticatedSubject.next(!!token);
  }

  login(email: string) {
    return this.http.get<IAuthResponse>(`https://api-p6pm5yym4a-uc.a.run.app/users/${email}`)
      .pipe(
        tap( response => {
          this.successManager(response);
        }),
        catchError(this.errorManager),
      );
  }

  createUser(email: string) {
    return this.http.post<IAuthResponse>(
      'https://api-p6pm5yym4a-uc.a.run.app/users',
      {
        email,
      }
    ).pipe(
      catchError(this.errorManager),
      map(this.successManager),
    );
  }

  logout(): void {
    localStorage.removeItem(this.localStorageTokenKey);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate([`/${RoutesEnum.LOGIN}`]);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem(this.localStorageTokenKey);
  }

  protected errorManager({error}: HttpErrorResponse) {
    debugger;
    return throwError(() => error);
  }

  protected successManager( response: IAuthResponse) {
    this.router.navigate([`/${RoutesEnum.TASKS}`]);
    localStorage.setItem(this.localStorageTokenKey, response.jwt ?? "");
    this.isAuthenticatedSubject.next(true);

    return response;
  };
}
