import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BaseButtonComponent } from '../../components/base-button/base-button.component';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    BaseButtonComponent,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  buttonDisabled: boolean = true;

  constructor() {}

  loginSubmit(event: SubmitEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.buttonDisabled = true;
    this.buttonDisabled = false;
  }
}