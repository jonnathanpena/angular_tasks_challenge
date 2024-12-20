import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatToolbarModule,
    MatIconModule,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthService
  ) {
    this.isLoggedIn$ = this.authService.isAuthenticated();
  }

  onClick() {
    this.authService.logout();
  }
}
