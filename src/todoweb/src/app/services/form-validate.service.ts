import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidateService {

  constructor() { }
  validateAllFormFields(formGroup: FormGroup): boolean {
    let isValid = true;
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        isValid = isValid && !control.invalid;
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        isValid = isValid && this.validateAllFormFields(control);
      }
    });
    return isValid;
  }

  validateFormFields(formGroup: FormGroup, fieldsToValidate: string[]): boolean {
    let isValid = true;
    fieldsToValidate.forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        isValid = isValid && !control.invalid;
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        isValid = isValid && this.validateFormFields(control, fieldsToValidate);
      }
    });
    return isValid;
  }
}
