import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-base-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './base-dialog.component.html',
  styleUrl: './base-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseDialogComponent {
  @Input() title: string = '';
  @Input() matDialogRef?: MatDialogRef<any>;

  onClick() {
    this.matDialogRef?.close();
  }
}
