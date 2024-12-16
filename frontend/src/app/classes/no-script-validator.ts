import { FormControl, ValidationErrors } from "@angular/forms";
import { ValidationStrategy } from "../interfaces/validation-strategy";

export class NoScriptValidator implements ValidationStrategy {
  validate(control: FormControl): ValidationErrors | null {
    const scriptRegex = [
      /<script.*?>|<\/script>/gi,
      /<b.*?>|<\/b>/gi,
      /<svg.*?>|<\/svg>/gi,
      /<meta.*?>|<\/meta>/gi,
      /<style.*?>|<\/style>/gi,
      /<img.*?>|<\/img>/gi,
      /<a.*?>|<\/a>/gi,
      /<iframe.*?>|<\/iframe>/gi,
      /<object.*?>|<\/object>/gi,
      /<math.*?>|<\/math>/gi,
      /<form.*?>|<\/form>/gi,
      /<img.*?>|<\/img>/gi,
    ];
    const count = scriptRegex.reduce(( accumulator: number, current: RegExp ) => {
      if (current.test(control.value)) {
        return accumulator + 1;
      }

      return accumulator + 0;
    }, 0);

    return count > 0 ? { script: true } : null;
  }
}
