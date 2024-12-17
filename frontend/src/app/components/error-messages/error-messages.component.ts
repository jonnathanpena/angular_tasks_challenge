import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { InputValidationErrorKeys } from '../../interfaces/input-validation-error-keys';

@Component({
  selector: 'app-error-messages',
  standalone: true,
  imports: [NgIf, MatError, NgFor],
  templateUrl: './error-messages.component.html',
  styleUrl: './error-messages.component.scss'
})
export class ErrorMessagesComponent {
  @Input() control: AbstractControl<any, any>|null = new FormControl();

  getErrorMessageKeys() {
    return Object.keys(this.control?.errors || {});
  }

  getErrorMessage(errorKey: string) {
    switch (errorKey as InputValidationErrorKeys) {
      case 'required':
        return 'Este campo es requerido';
      case 'email':
        return 'Ingrese un correo electrónico válido';
      case 'script':
        return 'Etiqueta o script no permitido';
      default:
        return 'Error desconocido';
    }
  }
}
