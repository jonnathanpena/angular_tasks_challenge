import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { $localize } from '@angular/localize/init';
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
        return $localize`:Retorno campo requerido|Retorno campo requerido@@required-error-message:Este campo es requerido`;
      case 'email':
        return $localize`:Correo electrónico inválido|Correo electrónico inválido@@email-error-message:Ingrese un correo electrónico válido`;
      case 'script':
        return $localize`:Etiqueta o script no permitido|Etiqueta o script no permitido@@non-script-error-message:Etiqueta o script no permitido`;
      case 'minlength':
        return $localize`:Longitud mínima requerida|Longitud mínima requerida@@min-length-error-message:La longitud mínima requerida es ${this.control?.errors?.['minlength'].requiredLength}`;
      case 'maxlength':
        return $localize`:Longitud máxima requerida|Longitud máxima requerida@@max-length-error-message:La longitud máxima requerida es ${this.control?.errors?.['maxlength'].requiredLength}`;
      default:
        return $localize`:Error desconocido|Error desconocido@@unknow-error-message:Error desconocido`;
    }
  }
}
