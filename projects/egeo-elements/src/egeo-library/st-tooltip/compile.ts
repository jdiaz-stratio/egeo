import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { StTooltipElementModule } from './st-tooltip.module';

enableProdMode();

platformBrowserDynamic()
    .bootstrapModule(StTooltipElementModule, { ngZone: 'noop'})
    .catch(err => console.error(err));
