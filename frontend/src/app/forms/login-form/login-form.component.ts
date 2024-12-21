import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { BaseButtonComponent } from '../../components/base-button/base-button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ValidationService } from '../../services/validation.service';
import { ErrorMessagesComponent } from '../../components/error-messages/error-messages.component';
import { AuthService } from '../../services/auth-service.service';
import { take } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../../modules/register-dialog/register-dialog.component';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    BaseButtonComponent,
    ErrorMessagesComponent,
    MatGridListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  readonly dialog = inject(MatDialog);
  isFetching: boolean = false;
  loginFormControl: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      this.validationService.emailValidate,
    ]),
  });

  constructor(
    private validationService: ValidationService,
    private authService: AuthService,
  ) {}

  loginSubmit(event: SubmitEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.isFetching = true;
    this.authService.login(this.loginFormControl.value.email)
      .pipe(take(1))
      .subscribe({
        error: (error) => {
          if (error.response === "User not found") {
            this.openDialog();
          }
          this.isFetching = false;
        },
        complete: () => {
          this.isFetching = false;
        },
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(RegisterDialogComponent);

    dialogRef.afterClosed().subscribe((result?: boolean) => {
      if (result) {
        this.isFetching = true;
        this.authService.createUser(this.loginFormControl.value.email)
          .pipe(take(1))
          .subscribe({
            complete: () => {
              this.isFetching = false;
            },
          });
      }
    });
  }
}
