import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appConfirmEqual]'
})

export class ConfirmEqualDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return ConfirmEqual(control);
  }
}

export const ConfirmEqual: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const pas = control.get('password');
  const con = control.get('confirmPassword');

  return pas?.value === con?.value && pas?.value !== null ? null : { passwordEqual: true };
};
