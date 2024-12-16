import { FormControl, ValidationErrors } from "@angular/forms";
import { ValidationStrategy } from "../interfaces/validation-strategy";

export class EmailValidator implements ValidationStrategy {
  validate(control: FormControl): ValidationErrors | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(control.value) ? null : { email: true };
  }
}
