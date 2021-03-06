import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { StColorPickerElementModule } from './st-color-picker.module';

enableProdMode();

platformBrowserDynamic()
    .bootstrapModule(StColorPickerElementModule, { ngZone: 'noop'})
    .catch(err => console.error(err));
