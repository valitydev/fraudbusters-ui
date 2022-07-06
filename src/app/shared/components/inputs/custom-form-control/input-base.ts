import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { CanUpdateErrorState, ErrorStateMatcher, mixinErrorState } from '@angular/material/core';
import { Constructor } from '@angular/cdk/table';
import { AbstractConstructor } from '@angular/material/core/common-behaviors/constructor';

export class InputBase {
    constructor(
        public _defaultErrorStateMatcher: ErrorStateMatcher,
        public _parentForm: NgForm,
        public _parentFormGroup: FormGroupDirective,
        public ngControl: NgControl
    ) {}
}

type CanUpdateErrorStateCtor = Constructor<CanUpdateErrorState> & AbstractConstructor<CanUpdateErrorState>;

export const INPUT_MIX_IN_BASE: CanUpdateErrorStateCtor & typeof InputBase = mixinErrorState(InputBase);
