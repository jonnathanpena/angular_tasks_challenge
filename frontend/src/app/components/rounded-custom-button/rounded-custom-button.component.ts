import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-rounded-custom-button',
  standalone: true,
  imports: [MatButton, NgClass],
  templateUrl: './rounded-custom-button.component.html',
  styleUrl: './rounded-custom-button.component.scss'
})
export class RoundedCustomButtonComponent {
  @Input() backgroundColor!: string;
  @Input({ required: true }) buttonText!: string;
  @Input() isDisabled!: boolean;
  @Input() isFullWidth!: boolean;

  constructor() {}
}
