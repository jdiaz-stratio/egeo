import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {StFooterComponent, StFooterModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, StFooterModule],
    entryComponents: [StFooterComponent]
})
export class StFooterElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, StFooterComponent, 'st-footer');
    }
}
