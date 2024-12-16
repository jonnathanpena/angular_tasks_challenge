import { FormControl, ValidationErrors } from "@angular/forms";

export interface ValidationStrategy {
  validate(control: FormControl): ValidationErrors | null;
}