import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-base-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
  ],
  templateUrl: './base-dialog.component.html',
  styleUrl: './base-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseDialogComponent {
  @Input() title: string = '';
}
