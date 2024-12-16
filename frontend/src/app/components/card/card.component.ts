import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, NgIf, NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input({ required: true }) cardTitle: string = '';
  @Input() cardSubtitle?: string;
  @Input() extraClassName: string = '';

  constructor() {}
}
