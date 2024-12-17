import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { LoginFormComponent } from '../../forms/login-form/login-form.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CardComponent,
    LoginFormComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
