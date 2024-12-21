import { Component } from '@angular/core';
import { BaseDialogComponent } from '../../components/base-dialog/base-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-register-dialog',
  standalone: true,
  imports: [
    BaseDialogComponent,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.scss'
})
export class RegisterDialogComponent {

}
