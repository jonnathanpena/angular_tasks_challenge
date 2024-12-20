import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth-service.service";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { RoutesEnum } from "../interfaces/routes-enum";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      map((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          this.router.navigate([`/${RoutesEnum.LOGIN}`]);
          return false;
        }
        return true;
      })
    );
  }
}
