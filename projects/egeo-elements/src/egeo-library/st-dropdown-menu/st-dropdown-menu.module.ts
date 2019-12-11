import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {StDropdownMenuComponent, StDropdownMenuModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, StDropdownMenuModule],
    entryComponents: [StDropdownMenuComponent]
})
export class StDropdownMenuElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, StDropdownMenuComponent, 'st-dropdown-menu');
    }
}
