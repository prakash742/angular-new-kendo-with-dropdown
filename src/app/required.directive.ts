import { forwardRef, Directive, Attribute, Input } from '@angular/core';

import { Validator, NG_VALIDATORS } from '@angular/forms';

export const requiredValidatorLogic = (required) => (control) => {
  if (!control.value) {
    return { valid: false };
  }

  return control.value.ProductID && control.value.ProductID !== null
    ? null
    : { valid: false };
};

const Required_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => RequiredValidator),
  multi: true,
};

@Directive({
  selector: '[isRequired]',
  providers: [Required_VALIDATOR],
})
export class RequiredValidator implements Validator {
  @Input() public isRequired: boolean;
  private _validator: any;
  constructor() {
    this._validator = requiredValidatorLogic(this.isRequired);
  }
  validate(c) {
    return this._validator(c);
  }
}
