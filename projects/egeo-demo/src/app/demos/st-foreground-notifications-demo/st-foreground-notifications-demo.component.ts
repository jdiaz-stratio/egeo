/*
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */
import {ChangeDetectorRef, Component} from '@angular/core';
import {
   StNotificationDisplayOptions,
   StNotificationIcon,
   StNotificationPosition,
   StNotificationType
} from '../../../../../egeo/src/lib/st-foreground-notifications/st-foreground-notifications.model';
import {Subject} from 'rxjs';
import {StForegroundNotificationsService} from '../../../../../egeo/src/lib/st-foreground-notifications/st-foreground-notifications.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
   selector: 'st-foreground-notifications-demo',
   templateUrl: './st-foreground-notifications-demo.component.html',
   animations: [
      trigger('fade', [
         state('void', style({opacity: 0})),
         state('*', style({opacity: 1})),
         transition(':enter', [animate(300)]),
         transition(':leave', [animate(300)])
      ])
   ],
   styleUrls: ['./st-foreground-notifications-demo.component.scss']
})
export class StForegroundNotificationsDemoComponent {
   public configDoc: any = {
      html: 'demo/st-foreground-notifications-demo/st-foreground-notifications-demo.component.html',
      ts: 'demo/st-foreground-notifications-demo/st-foreground-notifications-demo.component.ts',
      component: 'lib/st-foreground-notifications/st-foreground-notifications.ts'
   };

   public typeOptions: any = [
      {
         label: 'Info (default)',
         value: StNotificationType.INFO
      },
      {
         label: 'Success',
         value: StNotificationType.SUCCESS
      },
      {
         label: 'Warning',
         value: StNotificationType.WARNING
      },
      {
         label: 'Critical',
         value: StNotificationType.CRITICAL
      }
   ];
   public activeType: StNotificationType = StNotificationType.INFO;

   public iconOptions: any = [
      {
         label: 'Default icon',
         value: StNotificationIcon.DEFAULT
      },
      {
         label: 'Custom icon',
         value: 'custom'
      },
      {
         label: 'No icon',
         value: StNotificationIcon.NONE
      }
   ];
   public activeIconOption: StNotificationType | string = StNotificationIcon.DEFAULT;

   public customIconsOptions: any = [
      {
         label: 'Example 1',
         value: 'icon-mute'
      },
      {
         label: 'Example 2',
         value: 'icon-plane'
      },
      {
         label: 'Example 3',
         value: 'icon-cog'
      },
      {
         label: 'Example 4',
         value: 'icon-user-x'
      }
   ];
   public customIconsOption: string = 'icon-mute';

   public positionOptions: any = [
      {
         label: 'top left',
         value: StNotificationPosition.TOP_LEFT
      },
      {
         label: 'top center',
         value: StNotificationPosition.TOP_CENTER
      },
      {
         label: 'top right',
         value: StNotificationPosition.TOP_RIGHT
      },
      {
         label: 'center left',
         value: StNotificationPosition.CENTER_LEFT
      },
      {
         label: 'center center',
         value: StNotificationPosition.CENTER_CENTER
      },
      {
         label: 'center right',
         value: StNotificationPosition.CENTER_RIGHT
      },
      {
         label: 'bottom left',
         value: StNotificationPosition.BOTTOM_LEFT
      },
      {
         label: 'bottom center',
         value: StNotificationPosition.BOTTOM_CENTER
      },
      {
         label: 'bottom right',
         value: StNotificationPosition.BOTTOM_RIGHT
      }
   ];

   public positionReferenceOptions: any = [
      {
         label: 'Content component element',
         value: '.main-content'
      },
      {
         label: 'Main tag element',
         value: '#main'
      },
      {
         label: 'Window',
         value: 'html'
      }
   ];
   public activePositionReference: string = '.main-content';

   public showTimeoutChanged: boolean;
   public showMultipleTimeoutChanged: boolean;
   public showInfoTimeoutChanged: boolean;
   public showSuccessTimeoutChanged: boolean;
   public showWarningTimeoutChanged: boolean;
   public showCriticalTimeoutChanged: boolean;
   public showMarginChanged: boolean;
   public showWidthChanged: boolean;
   public configForm: FormGroup;
   public notificationsConfig: StNotificationDisplayOptions;
   public showCloseControlMessage: boolean = false;

   private componentDestroyed$: Subject<void>;

   constructor(private cd: ChangeDetectorRef, private _notifications: StForegroundNotificationsService, private fb: FormBuilder) {
      this.componentDestroyed$ = new Subject();
      this.notificationsConfig = this._notifications.DEFAULT_CONFIG;
      this.notificationsConfig.message = 'Testing <a href="https://www.google.es">Ir a google</a>';
      this.notificationsConfig.positionReference = '.main-content';
      this.configForm = this.fb.group({
         type: this.fb.control(this.notificationsConfig.notificationType),
         message: this.fb.control(this.notificationsConfig.message),
         icon: this.fb.control(this.notificationsConfig.notificationIcon),
         customIcon: this.fb.control('icon-mute'),
         closeControl: this.fb.control(this.notificationsConfig.closeIcon),
         position: this.fb.control(this.notificationsConfig.position),
         positionReference: this.fb.control('.main-content'),
         timeout: this.fb.control(this.notificationsConfig.timeout),
         multipleTimeout: this.fb.control(null),
         infoTimeout: this.fb.control(null),
         successTimeout: this.fb.control(null),
         warningTimeout: this.fb.control(null),
         criticalTimeout: this.fb.control(null),
         margin: this.fb.control(this.notificationsConfig.margin),
         maxWidth: this.fb.control(this.notificationsConfig.maxWidth),
         showSpecificTimeouts: this.fb.control(false)
      });

      this.configForm.valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((e) => {
            const notificationConfig: StNotificationDisplayOptions = {
               notificationType: this.configForm.get('type').value,
               message: this.configForm.get('message').value,
               notificationIcon: this.configForm.get('icon').value,
               closeIcon: this.configForm.get('closeControl').value,
               position: this.configForm.get('position').value,
               positionReference: this.configForm.get('positionReference').value
            };

            if (this.configForm.get('icon').value === 'custom') {
               notificationConfig.notificationIcon = this.configForm.get('customIcon').value;
            }

            this.notificationsConfig = Object.assign({}, this.notificationsConfig, notificationConfig);
         });
   }

   public displayNotification(): void {
      this._notifications.addNotification({
         notificationType: this.notificationsConfig.notificationType,
         message: this.notificationsConfig.message,
         notificationIcon: this.notificationsConfig.notificationIcon,
         closeIcon: this.notificationsConfig.closeIcon,
         position: this.notificationsConfig.position,
         positionReference: this.notificationsConfig.positionReference,
         timeout: this.notificationsConfig.timeout,
         multipleTimeout: this.notificationsConfig.multipleTimeout,
         infoTimeout: this.notificationsConfig.infoTimeout,
         successTimeout: this.notificationsConfig.successTimeout,
         warningTimeout: this.notificationsConfig.warningTimeout,
         criticalTimeout: this.notificationsConfig.criticalTimeout,
         margin: this.notificationsConfig.margin,
         maxWidth: this.notificationsConfig.maxWidth
      });

      this.configForm.disable();
   }

   public onCloseControlClick(): void {
      this.showCloseControlMessage = true;

      setTimeout(() => {
         this.showCloseControlMessage = false;
         this.cd.detectChanges();
      }, 2000);
   }

   public enableControls(): void {
      if (!this._notifications.getConsumingQueue()) {
         this.configForm.enable();
         this.cd.detectChanges();
      }
   }

   public onTimeoutKeyPress(event: KeyboardEvent): void {
      if (event.key === 'Enter') {
         const timeout = parseInt(this.configForm.get('timeout').value, 10);
         this.showTimeoutChanged = true;
         this.notificationsConfig = Object.assign({}, this.notificationsConfig, {timeout: timeout});

         setTimeout(() => {
            this.showTimeoutChanged = false;
            this.cd.detectChanges();
         }, 2000);
      }
   }

   public onMultipleTimeoutKeyPress(event: KeyboardEvent): void {
      if (event.key === 'Enter') {
         const timeout = parseInt(this.configForm.get('multipleTimeout').value, 10);
         this.showMultipleTimeoutChanged = true;
         this.notificationsConfig = Object.assign({}, this.notificationsConfig, {multipleTimeout: timeout});

         setTimeout(() => {
            this.showMultipleTimeoutChanged = false;
            this.cd.detectChanges();
         }, 2000);
      }
   }

   public onInfoTimeoutKeyPress(event: KeyboardEvent): void {
      if (event.key === 'Enter') {
         const timeout = parseInt(this.configForm.get('infoTimeout').value, 10);
         this.showInfoTimeoutChanged = true;
         this.notificationsConfig = Object.assign({}, this.notificationsConfig, {infoTimeout: timeout});

         setTimeout(() => {
            this.showInfoTimeoutChanged = false;
            this.cd.detectChanges();
         }, 2000);
      }
   }

   public onSuccessTimeoutKeyPress(event: KeyboardEvent): void {
      if (event.key === 'Enter') {
         const timeout = parseInt(this.configForm.get('successTimeout').value, 10);
         this.showSuccessTimeoutChanged = true;
         this.notificationsConfig = Object.assign({}, this.notificationsConfig, {successTimeout: timeout});

         setTimeout(() => {
            this.showSuccessTimeoutChanged = false;
            this.cd.detectChanges();
         }, 2000);
      }
   }

   public onWarningTimeoutKeyPress(event: KeyboardEvent): void {
      if (event.key === 'Enter') {
         const timeout = parseInt(this.configForm.get('warningTimeout').value, 10);
         this.showWarningTimeoutChanged = true;
         this.notificationsConfig = Object.assign({}, this.notificationsConfig, {warningTimeout: timeout});

         setTimeout(() => {
            this.showWarningTimeoutChanged = false;
            this.cd.detectChanges();
         }, 2000);
      }
   }

   public onCriticalTimeoutKeyPress(event: KeyboardEvent): void {
      if (event.key === 'Enter') {
         const timeout = parseInt(this.configForm.get('criticalTimeout').value, 10);
         this.showCriticalTimeoutChanged = true;
         this.notificationsConfig = Object.assign({}, this.notificationsConfig, {criticalTimeout: timeout});

         setTimeout(() => {
            this.showCriticalTimeoutChanged = false;
            this.cd.detectChanges();
         }, 2000);
      }
   }

   public onMarginKeyPress(event: KeyboardEvent): void {
      if (event.key === 'Enter') {
         const margin = parseInt(this.configForm.get('margin').value, 10);
         this.showMarginChanged = true;
         this.notificationsConfig = Object.assign({}, this.notificationsConfig, {margin});

         setTimeout(() => {
            this.showMarginChanged = false;
            this.cd.detectChanges();
         }, 2000);
      }
   }

   public onWidthKeyPress(event: KeyboardEvent): void {
      if (event.key === 'Enter') {
         this.showWidthChanged = true;
         this.notificationsConfig = Object.assign({}, this.notificationsConfig, {maxWidth: this.configForm.get('maxWidth').value});

         setTimeout(() => {
            this.showWidthChanged = false;
            this.cd.detectChanges();
         }, 2000);
      }
   }

}
