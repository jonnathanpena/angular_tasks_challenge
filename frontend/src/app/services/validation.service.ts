import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { ValidationStrategy } from '../interfaces/validation-strategy';
import { EmailValidator } from '../classes/email-validator';
import { NoScriptValidator } from '../classes/no-script-validator';

@Injectable({ providedIn: 'root' })
export class ValidationService {
  emailValidate(control: FormControl): ValidationErrors | null {
    const strategies: ValidationStrategy[] = [
      new EmailValidator(),
      new NoScriptValidator(),
    ];
    for (const strategy of strategies) {
      const errors = strategy.validate(control);
      if (errors) {
        return errors;
      }
    }
    return null;
  }

  stringValidate(control: FormControl): ValidationErrors | null {
    const strategies: ValidationStrategy[] = [
      new NoScriptValidator(),
    ];
    for (const strategy of strategies) {
      const errors = strategy.validate(control);
      if (errors) {
        return errors;
      }
    }
    return null;
  }
}
