import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { StForegroundNotificationsElementModule } from './st-foreground-notifications.module';

enableProdMode();

platformBrowserDynamic()
    .bootstrapModule(StForegroundNotificationsElementModule, { ngZone: 'noop'})
    .catch(err => console.error(err));
