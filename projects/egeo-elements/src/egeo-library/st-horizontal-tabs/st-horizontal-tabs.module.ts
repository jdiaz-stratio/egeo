import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {StHorizontalTabsComponent, StHorizontalTabsModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, StHorizontalTabsModule],
    entryComponents: [StHorizontalTabsComponent]
})
export class StHorizontalTabsElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, StHorizontalTabsComponent, 'st-horizontal-tabs');
    }
}
