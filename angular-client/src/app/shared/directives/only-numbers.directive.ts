import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector:
    // eslint-disable-next-line @angular-eslint/directive-selector
    '[onlyNumbers][formControlName], [onlyNumbers][formControl], [onlyNumbers][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: OnlyNumbersDirective, multi: true },
  ],
})
export class OnlyNumbersDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    // Reset field em null value. FIREFOX fix for input letters on numbers type
    if (control.value === null) {
      setTimeout(() => control.setValue(undefined));
    }

    return null;
  }
}
