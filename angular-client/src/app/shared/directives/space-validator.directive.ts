import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector:
    // eslint-disable-next-line @angular-eslint/directive-selector
    '[noWhiteSpace][formControlName], [noWhiteSpace][formControl], [noWhiteSpace][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: NoWhiteSpaceDirective, multi: true },
  ],
})
export class NoWhiteSpaceDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    if (
      control.value &&
      control.value.trim &&
      control.value.trim().length === 0
    ) {
      setTimeout(() => control.setValue(''));
    } else if (control.value && control.value[0] === ' ') {
      setTimeout(() => control.setValue(control.value.trim()));
    }
    return null;
  }
}
