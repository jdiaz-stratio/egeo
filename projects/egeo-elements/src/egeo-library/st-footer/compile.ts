import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { StFooterElementModule } from './st-footer.module';

enableProdMode();

platformBrowserDynamic()
    .bootstrapModule(StFooterElementModule, { ngZone: 'noop'})
    .catch(err => console.error(err));
