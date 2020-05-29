import { Directive, Input } from '@angular/core';
import { ValidatorFn, AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appNumberValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: NumberValidatorDirective,
    multi: true
  }]
})
export class NumberValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    if (Number(control.value) || !control.value) {
      return null;
    } else {
      return { 'phoneNumberInvalid': true };
    }
  }
}
