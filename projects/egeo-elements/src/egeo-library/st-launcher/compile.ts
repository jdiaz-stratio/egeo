import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { StLauncherElementModule } from './st-launcher.module';

enableProdMode();

platformBrowserDynamic()
    .bootstrapModule(StLauncherElementModule, { ngZone: 'noop'})
    .catch(err => console.error(err));
