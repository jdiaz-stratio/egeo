import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {StSidebarComponent, StSidebarModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, StSidebarModule],
    entryComponents: [StSidebarComponent]
})
export class StSidebarElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, StSidebarComponent, 'st-sidebar');
    }
}
