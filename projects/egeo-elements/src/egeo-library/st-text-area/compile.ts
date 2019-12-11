import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { StTextAreaElementModule } from './st-text-area.module';

enableProdMode();

platformBrowserDynamic()
    .bootstrapModule(StTextAreaElementModule, { ngZone: 'noop'})
    .catch(err => console.error(err));
