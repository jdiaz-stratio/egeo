import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {StTextareaComponent, StTextareaModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, StTextareaModule],
    entryComponents: [StTextareaComponent]
})
export class StTextAreaElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, StTextareaComponent, 'st-textarea');
    }
}
