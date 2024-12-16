import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { BaseButtonComponent } from '../../components/base-button/base-button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ValidationService } from '../../services/validation.service';
import { ErrorMessagesComponent } from '../../components/error-messages/error-messages.component';


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

  constructor(private validationService: ValidationService) {}

  loginSubmit(event: SubmitEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}
