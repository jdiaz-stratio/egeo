import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {StRadioComponent, StRadioModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, StRadioModule ],
    entryComponents: [StRadioComponent]
})
export class StRadioElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, StRadioComponent, 'st-radio');
    }
}
