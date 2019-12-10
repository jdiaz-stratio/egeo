import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {StInputElementModule} from './egeo-library/st-input/st-input.module';

enableProdMode();

platformBrowserDynamic()
    .bootstrapModule(StInputElementModule)
    .catch(err => console.error(err));
