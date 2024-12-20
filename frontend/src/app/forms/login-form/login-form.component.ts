import { Component } from '@angular/core';
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
    this.authService.login(this.loginFormControl.value.email)
      .pipe(take(1))
      .subscribe({
        next: (response) => console.log('response', response),
        error: (error) => {
          console.log('error', error);
        }
      });
  }
}
