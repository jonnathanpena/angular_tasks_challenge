import { Component, inject, OnDestroy } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { BaseButtonComponent } from "../../components/base-button/base-button.component";
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth-service.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UpsertDialogComponent } from '../../modules/upsert-dialog/upsert-dialog.component';
import { FormActionsEnum } from '../../interfaces/form-actions-enum';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    BaseButtonComponent,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  readonly dialog = inject(MatDialog);
  isLoggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthService
  ) {
    this.isLoggedIn$ = this.authService.isAuthenticated();
  }

  onCreateATask() {
    const dialogRef = this.dialog.open(UpsertDialogComponent, {
      data: {
        action: FormActionsEnum.CREATE,
        matDialogRef: MatDialogRef<UpsertDialogComponent>
      }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
