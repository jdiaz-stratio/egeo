import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { StSidebarElementModule } from './st-sidebar.module';

enableProdMode();

platformBrowserDynamic()
    .bootstrapModule(StSidebarElementModule, { ngZone: 'noop'})
    .catch(err => console.error(err));
