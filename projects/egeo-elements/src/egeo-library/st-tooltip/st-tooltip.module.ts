import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {StTooltipComponent, StTooltipModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, StTooltipModule],
    entryComponents: [StTooltipComponent]
})
export class StTooltipElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, StTooltipComponent, 'st-tooltip');
    }
}
