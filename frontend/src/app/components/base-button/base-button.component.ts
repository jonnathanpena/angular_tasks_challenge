import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ButtonTypeEnum } from '../../interfaces/button-type-enum';
import { ButtonStylesClasses } from '../../classes/button-styles-classes';

@Component({
  selector: 'app-base-button',
  standalone: true,
  imports: [MatButton, NgClass],
  templateUrl: './base-button.component.html',
  styleUrl: './base-button.component.scss'
})
export class BaseButtonComponent {
  @Input() type: ButtonTypeEnum = 'normal';
  @Input() backgroundColor!: string;
  @Input() buttonText!: string;
  @Input() isDisabled!: boolean;
  @Input() isFullWidth!: boolean;
  @Output() onClick = new EventEmitter<void>();
  
  constructor() {}

  onClickEvent() {
    this.onClick.emit();
  }

  setClasses(): ButtonStylesClasses {
    const styleClasses: ButtonStylesClasses = new ButtonStylesClasses();
    
    if(this.isFullWidth) {
      styleClasses.setFullWith();
    }

    switch(this.type) {
      case 'rounded':
        styleClasses.setIsRounded();
        break;
      default:
        break;
    }

    return styleClasses;
  }
}
